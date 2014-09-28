import 'dart:html';

import 'drawing.dart' as drawing;
import 'keys.dart' as keys;
import 'levels.dart' as levels;
import 'sound.dart' as sound;


var started = false;
var paused = false;

var previous = 0;

void _loop(num ts) {
    var now = new DateTime.now().millisecondsSinceEpoch;
    var delta = now - previous;

    if (!paused) {
        levels.getCurrent().tick(delta, levels.next);
        drawing.draw();
    }

    window.animationFrame.then(_loop);
    previous = now;
}

void start() {
    if (started) {
        return;
    }
    previous = new DateTime.now().millisecondsSinceEpoch;
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
