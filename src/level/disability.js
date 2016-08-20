import * as audio from '../audio';
import * as images from '../images';
import {Level} from './generic';
import * as keys from '../keys';
import * as sound from '../sound';


const DENIED_TEXT = 'APPLICATION DENIED';
const MAX_LEN = 10;


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

            // Handle Enter
            if (e.keyCode === 13) {
                if (!this.enteredText) {
                    sound.play('badkeypress');
                    return;
                }
                this.entered = 1500;
                sound.play('keypress');
                return;
            }
            // Handle backspace
            if (e.keyCode === 8) {
                if (!this.enteredText) {
                    sound.play('badkeypress');
                    return;
                }
                this.enteredText = this.enteredText.substring(0, this.enteredText.length - 1);
                sound.play('keypress');
                return;
            }

            if (e.key && (e.key === 'Shift' || e.key === 'Meta' || e.key === 'Alt')) {
                return;
            }

            // Handle everything else
            if (this.enteredText.length < MAX_LEN && e.key && e.key.length === 1) {
                this.enteredText += e.key;
                sound.play('keypress');
            } else {
                sound.play('badkeypress');
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

            const startY = ctx.canvas.height / 2 + headerHeight / 2 - 15;
            ctx.font = '30px VT323';

            if (this.entered > -1) {
                ctx.fillStyle = '#f00';
                const measured = ctx.measureText(DENIED_TEXT);
                ctx.fillText(
                    DENIED_TEXT,
                    ctx.canvas.width / 2 - measured.width / 2, startY
                );
                return;
            }


            ctx.fillStyle = '#fff';
            const measured = ctx.measureText(this.enteredText);
            const startX = ctx.canvas.width / 2 - measured.width / 2;
            ctx.fillText(this.enteredText, startX, startY);

            if (this.enteredText.length === MAX_LEN) {
                return;
            }
            if (Math.floor(Date.now() / 750) % 2) {
                ctx.fillStyle = '#fff';
                const cursorX = startX + measured.width + 1;
                ctx.fillRect(cursorX, startY - 22, 15, 25);
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

    get canType() {
        return true;
    }

}
