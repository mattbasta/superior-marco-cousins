import * as images from '../images';
import {Level} from './generic';
import * as sound from '../sound';


export class LevelTitle extends Level {

    constructor(src, duration, soundName) {
        super();
        this.image = images.get(src);
        this.duration = duration;
        this.soundName = soundName;
    }

    reset() {
        if (this.soundName != null) {
            sound.play(this.soundName);
        }

        this.ttl = this.duration;
    }

    draw(ctx, drawUI) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.image.draw(img => {
            var hw = img.width / 4;
            var hh = img.height / 4;
            ctx.drawImageScaledFromSource(
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
        this.ttl -= delta;
        if (this.ttl <= 0) {
            nextLevel();
        }
    }

}
