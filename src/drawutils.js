import * as images from './images';


export class TileMap {
    constructor(width, height, drawable, {tileSize = 256}) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;

        this.drawable = drawable;

        this.perRow = Math.ceil(width / this.tileSize);

        this.canvases = [];

        const count = Math.floor(height / tileSize).floor() * this.perRow + (width / tileSize);
        for (let i = 0; i < count; i++) {
            canvases.add(getBuffer(this.tileSize, this.tileSize).canvas);
        }
    }

    render(renderer) {
        this.drawable.drawEventually(img => renderer(img));
    }

    drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) {
        var idx = Math.floor(dy / this.tileSize) * this.perRow + Math.floor(dx / this.tileSize);
        var ctx = getBufferFromCanvas(this.canvases[idx]);
        ctx.drawImageScaledFromSource(
            img,
            sx, sy, sw, sh,
            dx % this.tileSize, dy % this.tileSize, dw, dh
        );
    }

    drawMapScaled(ctx, sx, sy, ratio) {
        const height = Math.ceil(ctx.canvas.height / ratio);
        const width = Math.ceil(ctx.canvas.width / ratio);

        const leftMostX = Math.floor(sx / this.tileSize);
        const rightMostX = Math.floor((sx + width) / this.tileSize);
        const topMostY = Math.floor(sy / this.tileSize);
        const bottomMostY = Math.floor((sy + height) / this.tileSize);

        const offsetX = (leftMostX * this.tileSize) - sx;
        const offsetY = (topMostY * this.tileSize) - sy;

        const tsRatio = Math.ceil(this.tileSize * ratio);

        for (let y = topMostY; y <= bottomMostY; y++) {
            for (let x = leftMostX; x <= rightMostX; x++) {
                const idx = y * this.perRow + x;
                if (idx < 0 || idx >= this.canvases.length) continue;
                ctx.drawImageScaledFromSource(
                    this.canvases[idx],
                    0, 0, this.tileSize, this.tileSize,
                    x * tsRatio - sx * ratio, y * tsRatio - sy * ratio,
                    tsRatio, tsRatio
                );
            }
        }

    }

};


export function getBufferFromCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return ctx;
}


export function getBuffer(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return getBufferFromCanvas(canvas);
}
