define('timing', ['drawing', 'entities', 'level'], function(drawing, entities, level) {

    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    var started;
    var lastDate = Date.now();

    function loop() {
        var now = Date.now();
        var delta = now - lastDate;

        drawing.draw();
        level.getCurrent().tick(delta, level.next);

        raf(loop);
        lastDate = now;
    }

    return {
        start: function() {
            if (started) return;
            raf(loop);
        }
    };
});
