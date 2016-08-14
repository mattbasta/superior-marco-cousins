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
    window.addEventListener('resize', resizeListener);

    entitiesDrawable = images.get('entities');

};

export function drawUI() {
    const melonCountTop = height - 16;
    entitiesDrawable.draw(img =>
        ctx.drawImage(
            img,
            0, 0,
            8, 8,
            10, melonCountTop - settings.tile_size + 8,
            settings.tile_size, settings.tile_size
        )
    );

    ctx.font = `${settings.tile_size}px VT323`;

    const melonCountLeft = 20 + settings.tile_size;
    const melonCountText = `x${entities.registry[0].melonCount}`;

    ctx.fillStyle = 'black';
    ctx.fillText(melonCountText, melonCountLeft + 2, melonCountTop + 2);
    ctx.fillStyle = 'white';
    ctx.fillText(melonCountText, melonCountLeft, melonCountTop);
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
