import 'dart:html';

import 'audio.dart' as audio;
import 'entities.dart' as entities;
import 'images.dart' as images;
import 'level.generic.dart';
import 'keys.dart' as keys;
import 'player.dart';
import 'sound.dart' as sound;


class _MelonomicsTax {
    String name;
    Function applies;
    Function mod;

    _MelonomicsTax(this.name, this.applies, this.mod);
}

final List<_MelonomicsTax> TAXES = [
    new _MelonomicsTax('Melon Tax', (v) => true, (v) => v - 2),
    new _MelonomicsTax('Seed Tax', (v) => v > 0, (v) => (v * 0.8).floor()),
    new _MelonomicsTax('Melon Inflation', (v) => true, (v) => v - (v.abs() * 0.2 + 1).floor()),
    new _MelonomicsTax('Inter-Melon Commerce Tax', (v) => v > 10, (v) => v - 1),
    new _MelonomicsTax('Even Tax', (v) => v % 2 == 0, (v) => v - 1),
];


class LevelMelonomics extends Level {

    images.Drawable image;
    int ticks;
    int startMelons;
    int finalMelons;
    bool ended;

    LevelMelonomics() {
        this.image = images.get('melonfinance');
    }

    void reset() {
        audio.playLoop('hero');
        this.ticks = 0;
        this.ended = false;
        int melons = this.startMelons = (entities.registry[0] as Player).melonCount;
        TAXES.forEach((tax) {
            if (!tax.applies(melons)) return;
            melons = tax.mod(melons);
        });
        this.finalMelons = melons;

        keys.down.one('any', (e) {sound.play('select');});
        keys.up.one('any', (e) {this.ended = true;});
    }

    void draw(CanvasRenderingContext2D ctx, Function drawUI) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.image.draw((img) {
            var headerWidth = ctx.canvas.width * 0.4;
            ctx.drawImageScaledFromSource(
                img,
                0, 0,
                img.width, img.height,
                ctx.canvas.width / 2 - headerWidth / 2,
                ctx.canvas.height * 0.1,
                headerWidth,
                headerWidth / img.width * img.height
            );

            int melons = this.startMelons;

            int items = (this.ticks / 300).floor();

            num y = ctx.canvas.height * 0.1 + headerWidth / img.width * img.height + 50;
            ctx.font = '40px VT323';
            ctx.fillStyle = 'white';

            if (items != 0) {
                items--;
                ctx.fillText('Net Melons', ctx.canvas.width * 0.3, y);
                ctx.fillText(melons.toString(), ctx.canvas.width * 0.65, y);
                y += 42;
            }

            TAXES.forEach((tax) {
                if (!tax.applies(melons)) return;
                if (items == 0) return;
                items--;
                int afterTax = tax.mod(melons);
                int diff = afterTax - melons;
                ctx.fillText(tax.name, ctx.canvas.width * 0.3, y);
                ctx.fillText(diff.toString(), ctx.canvas.width * 0.65, y);
                y += 42;
                melons = afterTax;
            });

            if (items != 0) {
                y += 40;
                items--;
                ctx.fillText('Gross Melons', ctx.canvas.width * 0.3, y);
                ctx.fillText(melons.toString(), ctx.canvas.width * 0.65, y);
            }

            if (items != 0) {
                items--;
                y += 40;
                ctx.fillText('PRESS TO CONTINUE', ctx.canvas.width * 0.3, y);
            }
        });

    }

    void tick(int delta, Function nextLevel) {
        this.ticks += delta;
        if (this.ended) {
            nextLevel();
            (entities.registry[0] as Player).melonCount = this.finalMelons;
        }
    }

}
