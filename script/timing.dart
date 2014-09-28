import 'dart:html';

import 'drawing.dart' as drawing;
import 'keys.dart' as keys;
import 'levels.dart' as levels;
import 'sound.dart' as sound;


var started = false;
var paused = false;

void _loop(num delta) {
    if (!paused) {
        levels.getCurrent().tick(delta, levels.next);
        drawing.draw();
    }

    window.animationFrame.then(_loop);
}

void start() {
    if (started) {
        return;
    }
    window.animationFrame.then(_loop);
    started = true;

    keys.up.on(80, (e) {
        paused = !paused;
        sound.play('select');

        if (paused) {
            drawing.drawPaused();
        }
    });
}
