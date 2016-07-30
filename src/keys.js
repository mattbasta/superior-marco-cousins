import {EventTarget} from './events';


export const up = new EventTarget();
export const down = new EventTarget();

exports.downArrow = false;
exports.leftArrow = false;
exports.rightArrow = false;
exports.upArrow = false;

function keypress(e, wasSet) {
    if (!e.metaKey && !e.altKey) {
        e.preventDefault();
    }
    switch(e.keyCode) {
        case 37: // Left
        case 65: // A
            exports.leftArrow = wasSet;
            break;
        case 38: // Up
        case 87: // W
            exports.upArrow = wasSet;
            break;
        case 39: // Right
        case 68: // D
            exports.rightArrow = wasSet;
            break;
        case 40: // Down
        case 83: // S
            exports.downArrow = wasSet;
            break;
    }
    if (wasSet) {
        down.fire(e.keyCode, e);
        down.fire('any', e);
    } else {
        up.fire(e.keyCode, e);
        up.fire('any', e);
    }
}

export function init() {
    window.addEventListener('keydown', e => {
        keypress(e, true);
    });
    window.addEventListener('keyup', e => {
        keypress(e, false);
    });
}
