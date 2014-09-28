import 'dart:html';


CanvasRenderingContext2D getBuffer(int width, int height) {
    var canvas = new CanvasElement();
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return ctx;
}
