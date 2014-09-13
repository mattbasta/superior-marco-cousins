define('drawing', ['level'], function(level) {

    var can = document.querySelector('canvas');
    var ctx = can.getContext('2d');

    // Handle canvas sizing.
    var width = can.width;
    var height = can.height;

    function draw() {

        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, can.width, can.height);

        level.getCurrent().draw(ctx);

    }


    function onresize() {
        can.width = width = document.body.clientWidth;
        can.height = height = document.body.clientHeight;
    }
    onresize();
    window.addEventListener('resize', onresize);

    return {
        draw: draw
    };
});
