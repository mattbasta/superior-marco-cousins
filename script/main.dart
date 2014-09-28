import 'audio.dart' as audio;
import 'celestialbodies.dart' as celestialbodies;
import 'drawing.dart' as drawing;
import 'entities.dart' as entities;
import 'images.dart' as images;
import 'keys.dart' as keys;
import 'levels.dart' as levels;
import 'sound.dart' as sound;
import 'timing.dart' as timing;


void main() {
    audio.init();
    sound.init();

    celestialbodies.init();
    drawing.init();
    entities.init();
    keys.init();
    levels.init();

    images.all.then(([_]) {
        timing.start();
    });
}
