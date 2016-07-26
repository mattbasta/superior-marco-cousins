library levels.disability;

import 'dart:html';

import 'audio.dart' as audio;
import 'images.dart' as images;
import 'level.generic.dart';
import 'keys.dart' as keys;
import 'sound.dart' as sound;


const String DENIED_TEXT = 'APPLICATION DENIED';


class LevelDisability extends Level {

    images.Drawable image;

    String enteredText = '';
    bool active = false;
    int entered = -1;


    LevelDisability() {
        this.image = images.get('disabilityBenefits');

        keys.up.on('any', (e) {
            if (!this.active || this.entered > 0) return;
            if (e.metaKey || e.altKey) return;

            e.preventDefault();

            sound.play('keypress');
            // Handle Enter
            if (e.keyCode == 13) {
                if (this.enteredText == '') return;
                this.entered = 1500;
                return;
            }
            // Handle backspace
            if (e.keyCode == 8) {
                if (this.enteredText == '') return;
                this.enteredText = this.enteredText.substring(0, this.enteredText.length - 1);
                return;
            }
            // Handle everything else
            if (this.enteredText.length < 10) {
                this.enteredText += new String.fromCharCode(e.keyCode);
            }
        });
    }

    void reset() {
        audio.playLoop('hero');
        this.active = true;
        this.entered = -1;
        this.enteredText = '';
    }

    void draw(CanvasRenderingContext2D ctx, Function drawUI) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.image.draw((img) {
            var headerWidth = ctx.canvas.width * 0.4;
            var headerHeight = headerWidth / img.width * img.height;
            ctx.drawImageScaledFromSource(
                img,
                0, 0,
                img.width, img.height,
                ctx.canvas.width / 2 - headerWidth / 2,
                ctx.canvas.height / 2 - headerHeight / 2,
                headerWidth, headerHeight
            );

            var measured;

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

            if (this.enteredText != '') {
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

    void tick(int delta, Function nextLevel) {
        if (!this.active) {
            nextLevel();
        }
        if (this.entered != -1) {
            this.entered -= delta;
            if (this.entered < 0) {
                this.active = false;
            }
        }
    }

}
