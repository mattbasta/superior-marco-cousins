import {EventTarget} from 'events';


const up = new EventTarget();
const down = new EventTarget();

let downArrow = false;
let leftArrow = false;
let rightArrow = false;
let upArrow = false;

function keypress(e, wasSet) {
    if (!e.metaKey && !e.altKey) {
        e.preventDefault();
    }
    switch(e.keyCode) {
        case 37: // Left
        case 65: // A
            leftArrow = wasSet;
            break;
        case 38: // Up
        case 87: // W
            upArrow = wasSet;
            break;
        case 39: // Right
        case 68: // D
            rightArrow = wasSet;
            break;
        case 40: // Down
        case 83: // S
            downArrow = wasSet;
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

export default function init() {
    document.body.addEventListener('onkeydown', e => {
        keypress(e, true);
    });
    document.body.addEventListener('onkeyup', e => {
        keypress(e, false);
    });
}
