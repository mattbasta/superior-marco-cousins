define('drawing', ['level'], function(level) {

    var can = document.querySelector('canvas');
    var ctx = can.getContext('2d');

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
        }
    };
});
