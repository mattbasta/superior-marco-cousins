import * as audio from './audio';
import * as celestialbodies from './celestialbodies';
import * as drawing from './drawing';
import * as entities from './entities';
import * as images from './images';
import * as keys from './keys';
import * as levels from './levels';
import * as sound from './sound';
import * as timing from './timing';


audio.init();
keys.init();
sound.init();

celestialbodies.init();
drawing.init();
entities.init();
levels.init();

images.all.then(() => timing.start());
