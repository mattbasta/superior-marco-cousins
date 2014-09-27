define('audio', ['buzz'], function(buzz) {
    'use strict';

    var loops = {};
    var muted = false;
    var playingLoop = null;

    function loadLoop(name, url) {
        if (name in loops) return;
        loops[name] = new buzz.sound(
            url,
            {
                formats: ['mp3'],
                preload: true,
                autoload: true,
                loop: true
            }
        );
    }

    loadLoop('title', 'audio/title');
    loadLoop('hero', 'audio/hero');

    window.addEventListener('beforeunload', function() {
        if (muted) {
            window.localStorage.muted = '1';
        } else {
            delete window.localStorage.muted;
        }
    });

    function toggleMute() {
        muted = !muted;
        Object.keys(loops).forEach(function(loop) {
            loops[loop].toggleMute();
        });
    }

    if ('muted' in window.localStorage) {
        toggleMute();
    }

    return {
        loadLoop: loadLoop,
        playLoop: function(name) {
            if (playingLoop == name)
                return;

            if (!playingLoop) {
                loops[name].play().setVolume(0).fadeTo(10, 1000);
                playingLoop = name;
                return;
            }

            loops[playingLoop].fadeOut(2000, function() {
                playingLoop = name;
                // FIXME: Bad things might happen if playLoop is called again
                // within four seconds of it being called once.
                loops[name].play().setVolume(0).fadeTo(20, 2000);
            });
        },
        isMuted: function() {
            return muted;
        },
        toggleMute: toggleMute,
        stop: function() {
            if (!playingLoop) return;
            loops[playingLoop].stop();
            playingLoop = null;
        }
    };
});
