import {Entity} from './entities/generic';
import {MelonEntity} from './entities/melon';

import * as entities from './entities';
import * as images from './images';
import * as keys from './keys';
import * as settings from './settings';
import * as sound from './sound';


const DIR_LEFT = 0;
const DIR_RIGHT = 1;
const SPRITE_TILE = 8;


export class Player extends Entity {

    constructor() {
        super();
        this.image = images.get('blueman');

        this.ducking = false;
        this.walking = false;
        this.didSitInChair = false;
        this.shouldThrowMelon = false;

        this.melonCount = 0;

        keys.down.on(81, () => { // Q
            this.shouldThrowMelon = true;
        });
    }

    canBePushed() {
        return true;
    }
    canBeStoodOn() {
        return true;
    }
    canPush() {
        return true;
    }
    canStandOn() {
        return true;
    }
    type() {
        return 'player';
    }
    complexJumps() {
        return true;
    }

    reset() {
        this.x = 1.0;
        this.y = 5.0;
        this.ducking = false;
        this.walking = false;
        this.didSitInChair = false;
        this.shouldThrowMelon = false;

        this.direction = DIR_RIGHT;
    }

    draw(ctx, level, offsetX, offsetY) {
        this.image.draw(img => {
            const now = Date.now();
            let x = 4; // Default pose
            // If the player is walking, make them wiggle between states 5 and 6
            if (this.walking) {
                x += Math.floor(now / 200) % 2 + 1;
            } else if (this.ducking) {
                x = 2;
            }
            if (this.velY < -10 && !this.ducking) {
                x = 0;
            }

            ctx.drawImage(
                img,
                x * SPRITE_TILE, this.direction * SPRITE_TILE,
                SPRITE_TILE, SPRITE_TILE,
                this.x * settings.tile_size + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size
            );
        });
    }

    tick(delta, level) {
        if (this.y < -1) {
            return true;
        }
        if (this.didSitInChair) {
            level.sitByPool();
            return true;
        }

        const nearestLadder = this.nearestLadder(level);
        const onLadder = nearestLadder !== -1;
        const jumpCondition = keys.upArrow && !this.testHitUp(level) && !onLadder;

        if (jumpCondition && this.isInContactWithFloor) {
            this.jump(settings.jump_force * (this.ducking ? 0.75 : 1));
            this.isInContactWithFloor = false;
            this.jumpEnergy--;
            sound.play('jump');
            this.canDoubleJump = false;

        } else if (keys.upArrow && !this.didDoubleJump && this.canDoubleJump) {
            if (this.velY < -5) {
                this.jump(settings.jump_force_double_falling);
            } else {
                this.jump(settings.jump_force_double);
            }
            sound.play('doubleJump');
            this.didDoubleJump = true;

        } else if (!keys.upArrow) {
            this.canDoubleJump = true;

        } else if (jumpCondition && this.jumpEnergy !== 0) {
            this.velY += settings.jump_energy_force * (delta / settings.jump_energy_force_ticks);

            this.jumpEnergy -= delta;
            this.jumpEnergy = Math.max(this.jumpEnergy, 0);

        } else if (keys.upArrow && onLadder) {
            this.velY = settings.ladder_velocity;
            this.jumpEnergy = settings.jump_energy;
            this.canDoubleJump = false;
            this.didDoubleJump = false;
            this.x = (nearestLadder + this.x * 5) / 6;
            if (Math.abs(nearestLadder - this.x) < 0.1) {
                this.x = nearestLadder;
            }

        }

        if (!keys.upArrow && !this.isInContactWithFloor) {
            this.jumpEnergy = 0;
        }

        if (keys.downArrow) {
            this.velX *= 0.6;
            this.walking = false;
            this.ducking = true;
        }

        if (!keys.downArrow || !this.isInContactWithFloor) {
            this.ducking = keys.downArrow;
            if (keys.leftArrow) {
                this.direction = DIR_LEFT;
                this.velX = -8.5;
                this.walking = !keys.downArrow;
            } else if (keys.rightArrow) {
                this.direction = DIR_RIGHT;
                this.velX = 8.5;
                this.walking = !keys.downArrow;
            } else {
                if (Math.abs(this.velX) > 0.001) {
                    this.velX *= 0.65;
                } else {
                    this.velX = 0.0;
                }
                this.walking = false;
            }
        }

        this.calcPhysics(delta, level);

        if (this.x > level.width - 10 && this.y < -1) {
            level.drownedInPool();
        } else if (this.y < -1) {
            level.fellInHole();
        }

        if (this.shouldThrowMelon) {
            this.shouldThrowMelon = false;
            this.throwMelon();
        }

        return true;
    }

    sitOnChair() {
        if (keys.downArrow) {
            sound.play('select');
            this.didSitInChair = true;
        }
    }

    headBump() {
        super.headBump();
        sound.play('headBump');
    }

    throwMelon() {
        if (this.melonCount <= 0) return;
        this.melonCount--;

        sound.play('throwMelon');
        const melon = new MelonEntity(Math.floor(this.x), Math.floor(this.y));
        melon.bouncing = true;
        melon.velY = this.velY + settings.throw_force_y;
        melon.velX = settings.throw_force_x * (this.direction === DIR_LEFT ? -1 : 1);
        entities.registry.push(melon);
    }

};
