import 'dart:html';

import 'images.dart' as images;
import 'level.generic.dart';
import 'sound.dart' as sound;


class LevelTitle extends Level {

    images.Drawable image;
    int duration;
    String soundName;

    int ttl;

    LevelTitle(String src, int duration, {String soundName: null}) {
        this.image = images.get(src);
        this.duration = duration;
        this.soundName = soundName;
    }

    void reset() {
        if (this.soundName != null) {
            sound.play(this.soundName);
        }

        this.ttl = this.duration;
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
        this.ttl -= delta;
        if (this.ttl <= 0) {
            nextLevel();
        }
    }

}
