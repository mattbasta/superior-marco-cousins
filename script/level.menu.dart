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
            var hw = img.width / 2;
            var hh = img.height / 2;
            ctx.drawImage(
                img,
                ctx.canvas.width / 2 - hw,
                ctx.canvas.height / 2 - hh
            );
        });
    }

    void tick(int delta, Function nextLevel) {
        if (this.ended) {
            nextLevel();
        }
    }

}
