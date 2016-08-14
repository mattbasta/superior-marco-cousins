import * as entities from '../entities';
import * as settings from '../settings';
import * as tiles from '../tiles';


export const DELTA_RATIO = 0.3;

const GRAVITY = 50;
const MAX_SPEED = 50.0;


export class Entity {

    constructor() {
        this.standers = new Set();
        this.standingOn = null;

        this.velX = 0.0;
        this.velY = 0.0;

        this.canDoubleJump = false;
        this.didDoubleJump = false;

        this.height = 1.0;
        this.width = 1.0;

        this.bouncing = false;
        this.isInContactWithFloor = false;

        this.reset();
    }

    get bounce() { return 0.0; }
    get canBePushed() { return false; }
    get canBeStoodOn() { return false; }
    get canPush() { return false; }
    get canStandOn() { return false; }
    get complexJumps() { return false; }

    hitGround(y) {
        if (this.bounce !== 0.0 && this.velY < -1 && !this.standers.size) {
            this.velY = -1 * this.bounce * this.velY;
        } else {
            this.velY = 0.0;
        }
        this.y = y;
        this.isInContactWithFloor = true;

        if (this.complexJumps) {
            this.canDoubleJump = false;
            this.didDoubleJump = false;
            this.jumpEnergy = settings.jump_energy;
        }
    }

    testCollisionDown(level, origY) {
        let index;
        let tile;

        if (this.y < 0 || Math.ceil(this.y) > level.height - 1) {
            return;
        }

        const start = Math.max(Math.floor(this.x), 0);
        const end = Math.min(Math.ceil(this.x + this.width), level.width);

        const crossedOne = Math.floor(this.y) !== Math.floor(origY);
        const testForHalf = Math.ceil(this.y) - this.y > 0.5;

        // Test for solid blocks
        if (crossedOne) {
            for (let x = start; x < end; x++) {
                index = level.getLevelIndex(x, Math.ceil(this.y));
                tile = level.data[index];
                if (tiles.canStand(tile)) {
                    this.hitGround(Math.ceil(this.y));
                    return;
                }
            }
            if (!testForHalf) {
                this.isInContactWithFloor = false;
            }
        }
        // Test for half-solid blocks
        if (testForHalf) {
            for (let x = start; x < end; x++) {
                index = level.getLevelIndex(x, Math.ceil(this.y));
                tile = level.data[index];
                if (tiles.HALF_SOLID.has(tile)) {
                    if (tile == tiles.TILE_CHAIR_LEFT || tile == tiles.TILE_CHAIR_RIGHT) {
                        this.sitOnChair();
                    }

                    this.hitGround(Math.ceil(this.y) - 0.5);
                    return;
                }
            }
            this.isInContactWithFloor = false;
        }
    }

    nearestLadder(level) {
        for (let y = Math.max(Math.floor(this.y + 1), 0);
             y < Math.min(Math.ceil(this.y + this.height), level.height - 1);
             y++) {

            const x = Math.floor(this.x + 0.5);
            const index = level.getLevelIndex(x, y);
            const tile = level.data[index];
            if (tile === tiles.TILE_LADDER) {
                return x;
            }
        }
        return -1;
    }

    testHitUp(level) {
        let height = this.height;
        this.standers.forEach(e => {
            height = Math.max(height, e.height + this.height);
        });

        const y = Math.floor(this.y + height) + 1;
        if (y >= level.height) {
            return false;
        }

        for (let x = Math.max(Math.floor(this.x), 0);
             x < Math.min(Math.ceil(this.x + this.width), level.width - 1);
             x++) {

            const index = level.getLevelIndex(x, y);
            const tile = level.data[index];
            if (tiles.SOLID.has(tile)) {
                return true;
            }
        }
        return false;
    }

    testCollisionUp(level) {
        if (this.testHitUp(level)) {
            this.headBump();
        }
    }

    testCollisionSide(level) {
        for (let y = Math.max(Math.floor(this.y) + 1, 0);
             y < Math.min(Math.ceil(this.y + this.height + 1), level.height - 1);
             y++) {

            if (this.velX < 1) {
                // On left
                const index = level.getLevelIndex(Math.ceil(this.x) - 1, y);
                const tile = level.data[index];
                if (tiles.SOLID.has(tile)) {
                    this.hitWall(Math.ceil(this.x));
                    return;
                }
            } else if (this.velX > 1) {
                // On right
                const index = level.getLevelIndex(Math.floor(this.x + this.width), y);
                const tile = level.data[index];
                if (tiles.SOLID.has(tile)) {
                    this.hitWall(Math.floor(this.x));
                    return;
                }
            }
        }
    }

    hitTestEntities(cb) {
        for (let ent of entities.registry) {
            if (ent === this) continue;

            if (this.x >= ent.x + ent.width) continue;
            if (this.y >= ent.y + ent.height) continue;
            if (this.x + this.width <= ent.x) continue;
            if (this.y + this.height <= ent.y) continue;

            const result = cb(ent);
            if (result) break;
        }
    }

    updateUpwardsChain() {
        if (!this.standers.size) {
            return;
        }

        const newY = this.y + this.height;
        this.standers.forEach(e => {
            e.y = newY;
            e.isInContactWithFloor = true;
            e.updateUpwardsChain();
        });
    }

    testFallingDown() {
        if (this.standingOn !== null) {
            // If the entity is standing on someone, check the state of
            // that.
            const estStandingY = this.y - this.standingOn.height;
            if (estStandingY > this.standingOn.y ||
                       this.x + this.width < this.standingOn.x ||
                       this.x > this.standingOn.x + this.standingOn.width) {
                // If we're no longer standing on the other entity, un-stand
                // us from it.
                this.stopStanding();
            } else if (estStandingY < this.standingOn.y) {
                // If the entity would be falling through the entity it is
                // on, terminate the fall.
                this.hitGround(this.standingOn.y + this.standingOn.height);
            }

        }
        if (this.canStandOn && this.standingOn === null) {
            // If we can stand on someone (and we're not already), check
            // who we can stand on.
            this.hitTestEntities(e => {
                if (!e.canBeStoodOn) return false;
                if (e.standingOn === this) return false;
                e.standers.add(this);
                this.standingOn = e;
                this.hitGround(e.y + e.height);
                if (e.velY) {
                    this.velY += e.velY;
                }
                return true;
            });
        }
    }

    jump(velY) {
        this.velY += velY;
        this.stopStanding();
    }

    stopStanding() {
        if (this.standingOn !== null) {
            this.standingOn.standers.delete(this);
            this.standingOn = null;
        }
    }

    calcPhysics(delta, level) {
        const origY = this.y;
        const origX = this.x;

        const velX = this.standingOn ?
            this.standingOn.velX + this.velX :
            this.velX;
        this.x += velX / delta * DELTA_RATIO;
        if (velX !== 0.0) {
            this.testCollisionSide(level);
            if (this.canBePushed || this.canPush) {
                this.hitTestEntities((ent) => {
                    if (ent.canPush && this.canBePushed) {
                        this.x = origX;
                        return true;
                    } else if (ent.canBePushed && this.canPush) {
                        const hitX = velX > 0 ? ent.x - this.width : ent.x + this.width;
                        this.hitWall(hitX);
                        return true;
                    }

                    return false;

                });
            }
        }

        this.y += this.velY / delta * DELTA_RATIO;
        if (this.velY < 0) {
            this.testCollisionDown(level, origY);
            this.testFallingDown();

        } else if (this.velY > 0) {
            this.testCollisionUp(level);
            this.updateUpwardsChain();
        } else {
            this.testFallingDown();
        }

        this.x = Math.max(this.x, 0);
        this.x = Math.min(this.x, level.width - 1);

        if (this.velY !== 0.0 && this.isInContactWithFloor) {
            this.isInContactWithFloor = false;
        }

        this.velY -= GRAVITY / delta * DELTA_RATIO;
        if (this.velY > MAX_SPEED) this.velY = MAX_SPEED;
        if (-1 * this.velY > MAX_SPEED) this.velY = -1 * MAX_SPEED;
        else if (-1 * this.velY > MAX_SPEED) this.velY = -1 * MAX_SPEED;
    }

    hitWall(stoppedX) {
        this.velX = 0.0;
        this.x = stoppedX;
    }

    sitOnChair() {
        // noop
    }

    headBump() {
        this.velY = 0.0;
        this.y = Math.floor(this.y) - this.height + 1;
        this.jumpEnergy = 0;
    }

}
