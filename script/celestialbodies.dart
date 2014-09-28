import 'dart:html';
import 'dart:math' as Math;

import 'drawutils.dart' as drawutils;


var BODY_SIZE = 17; // px


CanvasElement getBody(String color) {
    var body = drawutils.getBuffer(BODY_SIZE, BODY_SIZE);
    body.fillStyle = color;

    var dist;
    var half = BODY_SIZE / 2;

    for (var y = 0; y < BODY_SIZE; y++) {
        for (var x = 0; x < BODY_SIZE; x++) {
            if (Math.sqrt(Math.pow(x - half, 2) + Math.pow(y - half, 2)) <= half) {
                body.fillRect(x, y, 1, 1);
            }
        }
    }

    return body.canvas;
}

var sun = null;
var moon = null;

void init() {
    sun = getBody('#fff');
    moon: getBody('#ccc');
}
