import 'dart:html';

import 'entities.dart' as entities;
import 'images.dart' as images;
import 'levels.dart' as levels;
import 'settings.dart' as settings;


var _can;
var _ctx;

var _width;
var _height;

var entitiesDrawable;

const PAUSE_TEXT = 'HESITATION';


void init() {
    _can = document.querySelector('canvas');
    _ctx = _can.getContext('2d');

    _width = _can.width;
    _height = _can.height;

    onResize(null);
    window.onResize.listen(onResize);

    entitiesDrawable = images.get('entities');

}

void onResize(Event e) {
    _can.width = _width = document.body.clientWidth;
    _can.height = _height = document.body.clientHeight;
}

void drawUI() {
    entitiesDrawable.draw((img) {
        _ctx.drawImageScaledFromSource(
            img,
            0, 0,
            8, 8,
            10, _height - 8 - settings.tile_size,
            settings.tile_size, settings.tile_size
        );
    });

    _ctx.font = settings.tile_size.toString() + 'px VT323';
    _ctx.fillStyle = 'black';
    _ctx.fillText(
        'x' + entities.registry[0].melonCount.toString(),
        12 + settings.tile_size + 10,
        _ctx.canvas.height - 23
    );
    _ctx.fillStyle = 'white';
    _ctx.fillText(
        'x' + entities.registry[0].melonCount.toString(),
        10 + settings.tile_size + 10,
        _ctx.canvas.height - 25
    );
}

void drawPaused() {
    var modifierWidth = _ctx.measureText(PAUSE_TEXT);

    _ctx.font = '60px VT323';
    _ctx.fillStyle = 'black';
    _ctx.fillText(PAUSE_TEXT, _width / 2 - modifierWidth.width / 2 + 4, _height / 2 - 30 + 4);
    _ctx.fillStyle = 'white';
    _ctx.fillText(PAUSE_TEXT, _width / 2 - modifierWidth.width / 2, _height / 2 - 30);
}

void draw() {
    _ctx.imageSmoothingEnabled = false;
    levels.getCurrent().draw(_ctx, drawUI);
}
