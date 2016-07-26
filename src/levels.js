import * as audio from './audio';
import {LevelTitle, LevelMenu, LevelPlatform, LevelMelonomics, LevelDisability} from './level';
import {LEVELS} from './leveldata';


const levels = [];

let DISABILITY_LEVEL = -1;
let CURRENT_LEVEL = 0;


export function init() {
    levels.push(new LevelTitle('bastacorp', 750, 'bastacorp'));
    levels.push(new LevelMenu('menu', 'title'));

    LEVELS.forEach(level => {
        levels.push(new LevelPlatform(level['width'], level['height'], level['content'], level['entities']));
        levels.push(new LevelMelonomics());
    });

    levels.push(new LevelDisability());

    DISABILITY_LEVEL = levels.length - 1;

    levels[0].reset();
};

export function goTo(level) {
    CURRENT_LEVEL = level;
    audio.stop();
    levels[CURRENT_LEVEL].reset();
};

export function getCurrent() {
    return levels[CURRENT_LEVEL];
};

export function goToDisability() {
    goTo(DISABILITY_LEVEL);
};

export function next() {
    CURRENT_LEVEL += 1;
    if (CURRENT_LEVEL === levels.length) {
        CURRENT_LEVEL = 0;
    }
    goTo(CURRENT_LEVEL);
};
