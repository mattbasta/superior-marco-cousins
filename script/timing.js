define('timing', ['audio', 'drawing', 'entities', 'keys', 'level', 'sound'], function(audio, drawing, entities, keys, level, sound) {

    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    var started;
    var lastDate = Date.now();

    var paused = false;

    // P for pause.
    keys.down.on(80, function() {
        paused = !paused;
        sound.play('select');
        if (paused) {
            drawing.drawPaused();
        }
    });

    // M for mute.
    keys.down.on(77, audio.toggleMute);

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
