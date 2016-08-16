import * as entities from '../entities';
import {Entity} from './generic';
import * as images from '../images';
import * as settings from '../settings';
import * as sound from '../sound';


const SPRITE_TILE = 8;

export class MelonEntity extends Entity {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;

        this.image = images.get('entities');
    }

    reset() {
        this.bouncing = false;
    }

    get bounce() {
        return 0.5;
    }

    get type() {
        return 'melon';
    }

    draw(ctx, level, offsetX, offsetY) {
        this.image.draw((img) => {
            const x = Math.floor(Date.now() / 250) % 3;
            const locX = this.x * settings.tile_size;

            if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;

            ctx.drawImage(
                img,
                x * SPRITE_TILE, 0,
                SPRITE_TILE, SPRITE_TILE,
                locX + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size
            );
        });
    }

    tick(delta, level) {
        if (this.bouncing) {
            this.calcPhysics(delta, level);
            this.velX *= 0.95;
            if (this.isInContactWithFloor && this.velX + this.velY < 1) {
                this.bouncing = false;
            }

            return true;

        } else {
            const player = entities.registry[0];

            if (this.x > player.x + player.width) return true;
            if (this.x + this.width < player.x) return true;
            if (this.y > player.y + player.height) return true;
            if (this.y + this.height < player.y) return true;

            sound.play('melonCollect');
            player.melonCount++;
            return false;
        }

    }

};
