import * as audio from './audio';
import * as drawing from './drawing';
import * as entities from './entities';
import * as images from './images';
import * as keys from './keys';
import * as levels from './levels';
import * as sound from './sound';
import * as timing from './timing';


keys.init();
sound.init();

drawing.init();
entities.init();
levels.init();

Promise.all([
    audio.all,
    images.all,
]).then(() => timing.start());
