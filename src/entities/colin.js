import {Entity} from './generic';
import * as images from '../images';
import * as settings from '../settings';


const SPRITE_TILE = 8;
const COLIN_JUMP_FORCE = 20.0;
const COLIN_JUMP_TIMER_MIN = 2000;
const COLIN_JUMP_TIMER_MAX = 4000;


export class ColinEntity extends Entity {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;

        this.image = images.get('entities');
    }

    get bounce() {return 0.4; }
    get canBePushed() {return true; }
    get canBeStoodOn() {return true; }
    get canPush() {return true; }
    get canStandOn() {return true; }
    get type() {return 'colin'; }

    reset() {
        this.jumpTimer = 0;
        this.jumpDuration = COLIN_JUMP_TIMER_MIN;
    }

    draw(ctx, level, offsetX, offsetY) {
        this.image.draw((img) => {
            const x = this.isInContactWithFloor ? Math.floor(Date.now() / 350) % 2 : 2;
            const locX = this.x * settings.tile_size;

            if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;

            ctx.drawImage(
                img,
                x * SPRITE_TILE, SPRITE_TILE,
                SPRITE_TILE, SPRITE_TILE,
                locX + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size
            );
        });
    }

    tick(delta, level) {

        this.calcPhysics(delta, level);

        this.jumpTimer += delta;
        if (this.jumpTimer > this.jumpDuration) {
            this.jumpTimer = 0;
            this.jump(COLIN_JUMP_FORCE);
            this.calculateJumpTime();
        }

        return true;

    }

    calculateJumpTime() {
        this.jumpDuration = Math.floor(Math.random() * (COLIN_JUMP_TIMER_MAX - COLIN_JUMP_TIMER_MIN)) + COLIN_JUMP_TIMER_MIN;
    }

}
