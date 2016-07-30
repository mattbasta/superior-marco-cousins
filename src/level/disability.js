import * as audio from '../audio';
import * as images from '../images';
import {Level} from './generic';
import * as keys from '../keys';
import * as sound from '../sound';


const DENIED_TEXT = 'APPLICATION DENIED';


export class LevelDisability extends Level {

    constructor() {
        super();
        this.enteredText = '';
        this.active = false;
        this.entered = -1;

        this.image = images.get('disabilityBenefits');

        keys.up.on('any', e => {
            if (!this.active || this.entered > 0) return;
            if (e.metaKey || e.altKey) return;

            e.preventDefault();

            sound.play('keypress');
            // Handle Enter
            if (e.keyCode === 13) {
                if (this.enteredText == '') return;
                this.entered = 1500;
                return;
            }
            // Handle backspace
            if (e.keyCode === 8) {
                if (this.enteredText == '') return;
                this.enteredText = this.enteredText.substring(0, this.enteredText.length - 1);
                return;
            }
            // Handle everything else
            if (this.enteredText.length < 10) {
                this.enteredText += String.fromCharCode(e.keyCode);
            }
        });
    }

    reset() {
        audio.playLoop('hero');
        this.active = true;
        this.entered = -1;
        this.enteredText = '';
    }

    draw(ctx, drawUI) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.image.draw(img => {
            const headerWidth = ctx.canvas.width * 0.4;
            const headerHeight = headerWidth / img.width * img.height;
            ctx.drawImage(
                img,
                0, 0,
                img.width, img.height,
                ctx.canvas.width / 2 - headerWidth / 2,
                ctx.canvas.height / 2 - headerHeight / 2,
                headerWidth, headerHeight
            );

            let measured;

            if (this.entered > -1) {
                ctx.fillStyle = '#f00';
                measured = ctx.measureText(DENIED_TEXT);
                ctx.fillText(
                    DENIED_TEXT,
                    ctx.canvas.width / 2 - measured.width / 2,
                    ctx.canvas.height / 2 + headerHeight / 2 - 15
                );
                return;
            }

            if (this.enteredText !== '') {
                ctx.fillStyle = '#fff';
                measured = ctx.measureText(this.enteredText);
                ctx.fillText(
                    this.enteredText,
                    ctx.canvas.width / 2 - measured.width / 2,
                    ctx.canvas.height / 2 + headerHeight / 2 - 15
                );
            }
        });

    }

    tick(delta, nextLevel) {
        if (!this.active) {
            nextLevel();
        }
        if (this.entered !== -1) {
            this.entered -= delta;
            if (this.entered < 0) {
                this.active = false;
            }
        }
    }

}
