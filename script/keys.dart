import 'dart:html';

import 'events.dart' as events;


var up = new events.EventTarget();
var down = new events.EventTarget();

var downArrow = false;
var leftArrow = false;
var rightArrow = false;
var upArrow = false;

void _keypress(KeyEvent e, bool wasSet) {
    if (!e.metaKey && !e.altKey) e.preventDefault();
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

void init() {
    document.body.onKeyDown.listen((e) {
        _keypress(e, true);
    });
    document.body.onKeyUp.listen((e) {
        _keypress(e, false);
    });
}
