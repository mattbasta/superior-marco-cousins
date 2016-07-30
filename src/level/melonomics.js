import * as audio from '../audio';
import * as entities from '../entities';
import * as images from '../images';
import {Level} from './generic';
import * as keys from '../keys';
import * as sound from '../sound';


class MelonomicsTax {
    constructor(name, applies, mod) {
        this.name = name;
        this.applies = applies;
        this.mod = mod;
    }
}

const TAXES = [
    new MelonomicsTax('Melon Tax', v => true, v => v - 2),
    new MelonomicsTax('Seed Tax', v => v > 0, v => Math.floor(v * 0.8)),
    new MelonomicsTax('Melon Inflation', v => true, v => v - Math.floor(Math.abs(v) * 0.2 + 1)),
    new MelonomicsTax('Inter-Melon Commerce Tax', v => v > 10, v => v - 1),
    new MelonomicsTax('Even Tax', v => v % 2 == 0, v => v - 1),
];


export class LevelMelonomics extends Level {

    constructor() {
        super();
        this.image = images.get('melonfinance');
    }

    reset() {
        audio.playLoop('hero');
        this.ticks = 0;
        this.ended = false;
        let melons = this.startMelons = entities.registry[0].melonCount;
        TAXES.forEach(tax => {
            if (!tax.applies(melons)) return;
            melons = tax.mod(melons);
        });
        this.finalMelons = melons;

        keys.down.one('any', () => sound.play('select'));
        keys.up.one('any', () => {
            this.ended = true;
        });
    }

    draw(ctx, drawUI) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.image.draw(img => {
            const headerWidth = ctx.canvas.width * 0.4 / 2;
            ctx.drawImage(
                img,
                0, 0,
                img.width, img.height,
                ctx.canvas.width / 2 - headerWidth / 2,
                ctx.canvas.height * 0.1,
                headerWidth,
                headerWidth / img.width * img.height
            );

            let melons = this.startMelons;

            let items = Math.floor(this.ticks / 300);

            let y = ctx.canvas.height * 0.1 + headerWidth / img.width * img.height + 50;
            ctx.font = '20px VT323';
            ctx.fillStyle = 'white';

            if (items !== 0) {
                items--;
                ctx.fillText('Net Melons', ctx.canvas.width * 0.3, y);
                ctx.fillText(melons.toString(), ctx.canvas.width * 0.65, y);
                y += 21;
            }

            TAXES.forEach(tax => {
                if (!tax.applies(melons)) return;
                if (items == 0) return;
                items--;
                const afterTax = tax.mod(melons);
                const diff = afterTax - melons;
                ctx.fillText(tax.name, ctx.canvas.width * 0.3, y);
                ctx.fillText(diff.toString(), ctx.canvas.width * 0.65, y);
                y += 21;
                melons = afterTax;
            });

            if (items !== 0) {
                y += 20;
                items--;
                ctx.fillText('Gross Melons', ctx.canvas.width * 0.3, y);
                ctx.fillText(melons.toString(), ctx.canvas.width * 0.65, y);
            }

            if (items !== 0) {
                items--;
                y += 20;
                ctx.fillText('PRESS TO CONTINUE', ctx.canvas.width * 0.3, y);
            }
        });

    }

    tick(delta, nextLevel) {
        this.ticks += delta;
        if (this.ended) {
            nextLevel();
            entities.registry[0].melonCount = this.finalMelons;
        }
    }

}
