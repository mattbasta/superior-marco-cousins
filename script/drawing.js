define('drawing', ['level'], function(level) {

    var can = document.querySelector('canvas');
    var ctx = can.getContext('2d');

    var PAUSE_TEXT = 'HESITATION';

    // Handle canvas sizing.
    var width = can.width;
    var height = can.height;

    function onresize() {
        can.width = width = document.body.clientWidth;
        can.height = height = document.body.clientHeight;
    }
    onresize();
    window.addEventListener('resize', onresize);

    return {
        draw: function() {
            ctx.imageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            level.getCurrent().draw(ctx);
        },
        drawPaused: function() {
            var modifierWidth = ctx.measureText(PAUSE_TEXT);

            ctx.font = '60px VT323';
            ctx.fillStyle = 'black';
            ctx.fillText(PAUSE_TEXT, ctx.canvas.width / 2 - modifierWidth.width / 2 + 4, ctx.canvas.height / 2 - 30 + 4);
            ctx.fillStyle = 'white';
            ctx.fillText(PAUSE_TEXT, ctx.canvas.width / 2 - modifierWidth.width / 2, ctx.canvas.height / 2 - 30);
        }
    };
});
