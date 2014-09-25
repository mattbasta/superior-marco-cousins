define('timing', ['drawing', 'entities', 'keys', 'level', 'sound'], function(drawing, entities, keys, level, sound) {

    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    var started;
    var lastDate = Date.now();

    var paused = false;

    keys.down.on(80, function() {
        paused = !paused;
        sound.play('select');
        if (paused) {
            drawing.drawPaused();
        }
    });

    function loop() {
        var now = Date.now();
        var delta = now - lastDate;

        if (!paused) {
            level.getCurrent().tick(delta, level.next, level);
            drawing.draw();
        }

        raf(loop);
        lastDate = now;
    }

    return {
        start: function() {
            if (started) return;
            raf(loop);
            started = true;
        }
    };
});
