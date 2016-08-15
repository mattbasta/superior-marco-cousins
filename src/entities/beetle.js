import {DELTA_RATIO, Entity} from './generic';
import * as images from '../images';
import * as settings from '../settings';
import * as tiles from '../tiles';


const SPRITE_TILE = 8;

const DIR_LEFT = 0;
const DIR_RIGHT = 1;

const BEETLE_SPEED = 2.0;
const BEETLE_PANIC_SPEED = 6.5;


export class BeetleEntity extends Entity {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;

        this.height = 0.625;

        this.image = images.get('entities');
    }

    get bounce() { return 0.3; }
    get canBePushed() { return false; }
    get canBeStoodOn() { return true; }
    get canPush() { return true; }
    get canStandOn() { return true; }
    get type() { return 'beetle'; }

    reset() {
        this.direction = DIR_RIGHT;
    }

    draw(ctx, level, offsetX, offsetY) {
        const speed = this.standers.size ? BEETLE_PANIC_SPEED : BEETLE_SPEED;
        this.image.draw((img) => {
            let x = Math.floor(Date.now() / 350) % 2;
            if (this.direction === DIR_LEFT) {
                x += 2;
            }
            const locX = this.x * settings.tile_size;

            if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;

            ctx.drawImage(
                img,
                x * SPRITE_TILE, 3 * SPRITE_TILE + 3,
                SPRITE_TILE, SPRITE_TILE * this.height,
                locX + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size * this.height
            );
        });
    }

    tick(delta, level) {
        const speed = this.standers.size ? BEETLE_PANIC_SPEED : BEETLE_SPEED;

        let prospectiveVel;
        if (this.standingOn) {
            prospectiveVel = 0;
        } else if (this.direction === DIR_LEFT) {
            prospectiveVel = -1 * speed;
        } else if (this.direction === DIR_RIGHT) {
            prospectiveVel = speed;
        }

        const newX = this.x + prospectiveVel / delta * DELTA_RATIO;
        if (
            this.isInContactWithFloor &&
            Math.floor(newX) !== Math.floor(this.x) &&
            !this.standers.size
        ) {
            for (let x = Math.floor(newX); x <= Math.ceil(Math.floor(newX) + this.width); x++) {
                const index = level.getLevelIndex(x, Math.ceil(this.y));
                if (!tiles.canStand(level.data[index])) {
                    this.hitWall(this.x);
                    break;
                }
            }
        }

        this.velX = prospectiveVel;

        this.calcPhysics(delta, level);

        return this.y > -1;

    }

    hitWall(stoppedX) {
        super.hitWall(stoppedX);
        this.direction = (this.direction === DIR_LEFT) ? DIR_RIGHT : DIR_LEFT;
    }

};
