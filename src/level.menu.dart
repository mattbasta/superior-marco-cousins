library levels.menu;

import 'dart:html';

import 'audio.dart' as audio;
import 'images.dart' as images;
import 'keys.dart' as keys;
import 'level.generic.dart';
import 'sound.dart' as sound;


class LevelMenu extends Level {

    images.Drawable image;
    int duration;
    String audioName;

    bool ended;

    LevelMenu(String src, {String audioName: null}) {
        this.image = images.get(src);
        this.audioName = audioName;
    }

    void reset() {
        if (this.audioName != null) {
            audio.playLoop(this.audioName);
        }
        this.ended = false;

        keys.down.one('any', (e) {sound.play('select');});
        keys.up.one('any', (e) {this.ended = true;});
    }

    void draw(CanvasRenderingContext2D ctx, Function drawUI) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.image.draw((img) {
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

    void tick(int delta, Function nextLevel) {
        if (this.ended) {
            nextLevel();
        }
    }

}