import * as entities from './entities';
import * as images from './images';
import * as levels from './levels';
import * as settings from './settings';


let can;
let ctx;

let width;
let height;

let entitiesDrawable;

const PAUSE_TEXT = 'HESITATION';


export function init() {
    can = document.querySelector('canvas');
    ctx = can.getContext('2d');

    width = can.width;
    height = can.height;

    const resizeListener = () => {
        can.width = width = Math.ceil(document.body.clientWidth / 2);
        can.height = height = Math.ceil(document.body.clientHeight / 2);
    };

    resizeListener();
    document.body.addEventListener('resize', resizeListener);

    entitiesDrawable = images.get('entities');

};

export function drawUI() {
    entitiesDrawable.draw(img => {
        ctx.drawImageScaledFromSource(
            img,
            0, 0,
            8, 8,
            10, height - 8 - settings.tile_size,
            settings.tile_size, settings.tile_size
        );
    });

    ctx.font = settings.tile_size.toString() + 'px VT323';
    ctx.fillStyle = 'black';
    ctx.fillText(
        'x' + entities.registry[0].melonCount.toString(),
        12 + settings.tile_size + 10,
        ctx.canvas.height - 23
    );
    ctx.fillStyle = 'white';
    ctx.fillText(
        'x' + entities.registry[0].melonCount.toString(),
        10 + settings.tile_size + 10,
        ctx.canvas.height - 25
    );
};

export function drawPaused() {
    const modifierWidth = ctx.measureText(PAUSE_TEXT);

    ctx.font = '60px VT323';
    ctx.fillStyle = 'black';
    ctx.fillText(PAUSE_TEXT, width / 2 - modifierWidth.width / 2 + 4, height / 2 - 30 + 4);
    ctx.fillStyle = 'white';
    ctx.fillText(PAUSE_TEXT, width / 2 - modifierWidth.width / 2, height / 2 - 30);
};

export function draw() {
    ctx.imageSmoothingEnabled = false;
    levels.getCurrent().draw(ctx, drawUI);
};
