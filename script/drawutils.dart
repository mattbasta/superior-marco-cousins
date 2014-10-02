import 'dart:html';

import 'images.dart' as images;


class TileMap {

    images.Drawable drawable;

    int width, height;
    int tileSize = 256;
    int perRow;

    List<CanvasElement> canvases;

    TileMap(int width, int height, images.Drawable drawable, {int tileSize: 256}) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;

        this.drawable = drawable;

        this.perRow = (width / this.tileSize).ceil();

        canvases = new List<CanvasElement>();

        var count = (height / tileSize).floor() * this.perRow + (width / tileSize).floor();
        for (var i = 0; i < count; i++) {
            canvases.add(getBuffer(this.tileSize, this.tileSize).canvas);
        }
    }

    void render(Function renderer) {
        this.drawable.drawEventually((img) {
            renderer(img);
        });
    }

    void drawImage(ImageElement img, int sx, int sy, int sw, int sh, int dx, int dy, int dw, int dh) {
        var idx = (dy / this.tileSize).floor() * this.perRow + (dx / this.tileSize).floor();
        var ctx = getBufferFromCanvas(this.canvases[idx]);
        ctx.drawImageScaledFromSource(
            img,
            sx, sy, sw, sh,
            dx % this.tileSize, dy % this.tileSize, dw, dh
        );
    }

    void drawMapScaled(CanvasRenderingContext2D ctx, int sx, int sy, double ratio) {
        int height = (ctx.canvas.height / ratio).ceil();
        int width = (ctx.canvas.width / ratio).ceil();

        int leftMostX = (sx / this.tileSize).floor();
        int rightMostX = ((sx + width) / this.tileSize).floor();
        int topMostY = (sy / this.tileSize).floor();
        int bottomMostY = ((sy + height) / this.tileSize).floor();

        int offsetX = (leftMostX * this.tileSize) - sx;
        int offsetY = (topMostY * this.tileSize) - sy;

        int tsRatio = (this.tileSize * ratio).ceil();

        for (int y = topMostY; y <= bottomMostY; y++) {
            for (int x = leftMostX; x <= rightMostX; x++) {
                int idx = y * this.perRow + x;
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

}


CanvasRenderingContext2D getBufferFromCanvas(CanvasElement canvas) {
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return ctx;
}


CanvasRenderingContext2D getBuffer(int width, int height) {
    var canvas = new CanvasElement();
    canvas.width = width;
    canvas.height = height;
    return getBufferFromCanvas(canvas);
}
