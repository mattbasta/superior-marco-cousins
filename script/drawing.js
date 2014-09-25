define('drawing', ['entities', 'images', 'level', 'settings'], function(entities, images, level, settings) {

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

    var entitiesImg = null;
    images.waitFor('entities').done(function(img) {
        entitiesImg = img;
    });

    var uiMelonSize = settings.tile_size;
    function drawUI() {
        ctx.drawImage(
            entitiesImg,
            0, 0,
            8, 8,
            10, ctx.canvas.height - 8 - uiMelonSize,
            uiMelonSize, uiMelonSize
        );

        ctx.font = (uiMelonSize | 0) + 'px VT323';
        ctx.fillStyle = 'black';
        ctx.fillText(
            'x' + entities.registry[0].melonCount,
            12 + uiMelonSize + 10,
            ctx.canvas.height - 23
        );
        ctx.fillStyle = 'white';
        ctx.fillText(
            'x' + entities.registry[0].melonCount,
            10 + uiMelonSize + 10,
            ctx.canvas.height - 25
        );
    }

    return {
        draw: function() {
            ctx.imageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            level.getCurrent().draw(ctx, drawUI);
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
