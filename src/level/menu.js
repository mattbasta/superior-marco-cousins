import * as audio from '../audio';
import * as images from '../images';
import * as keys from '../keys';
import {Level} from './generic';
import * as sound from '../sound';


export class LevelMenu extends Level {

    constructor(src, audioName = null) {
        super();
        this.image = images.get(src);
        this.audioName = audioName;
        this.ended = false;
    }

    reset() {
        if (this.audioName !== null) {
            audio.playLoop(this.audioName);
        }
        this.ended = false;

        keys.down.one('any', () => sound.play('select'));
        keys.up.one('any', () => {
            this.ended = true;
        });
    }

    draw(ctx, drawUI) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.image.draw(img => {
            const hw = img.width / 4;
            const hh = img.height / 4;
            ctx.drawImage(
                img,
                0, 0,
                img.width, img.height,
                ctx.canvas.width / 2 - hw,
                ctx.canvas.height / 2 - hh,
                img.width / 2, img.height / 2
            );
        });
    }

    tick(delta, nextLevel) {
        if (this.ended) {
            nextLevel();
        }
    }

}
