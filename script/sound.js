define('sound', ['jsfx'], function(jsfx) {

    var waves = {
        bastacorp: ["saw",0.0000,0.1930,0.0000,0.2680,0.0000,0.0040,110.0000,878.0000,2400.0000,-0.9000,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,-0.2960,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000],
        select: ["square",2.0000,0.1930,0.0000,0.0020,0.5760,0.2760,20.0000,850.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000],
        jump: ["square",0.0000,0.1530,0.0000,0.1280,0.0000,0.0200,20.0000,339.0000,971.0000,0.4080,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,0.0000,0.0000,0.0000,0.0000,0.8070,0.0000,0.0000,0.0000,0.0000],
        doubleJump: ["square",0.0000,0.1530,0.0000,0.1280,0.0000,0.0200,20.0000,511.0000,971.0000,0.4080,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,0.0000,0.0000,0.0000,0.0000,0.8070,0.0000,0.0000,0.0000,0.0000],
        headBump: ["square",9.0000,0.0450,0.0000,0.0300,0.0000,0.0480,20.0000,150.0000,2400.0000,-0.5780,-0.0740,0.0000,0.0100,0.0003,0.0000,-0.2660,0.0000,0.0590,0.0000,0.0000,0.0000,0.0000,1.0000,-0.0040,0.0000,0.0000,-0.0140],
        drownInPool: ["saw",0.0000,0.1530,0.0000,0.9760,0.0000,0.1540,112.0000,467.0000,594.0000,0.1020,-0.9520,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0120,0.0640,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.1600,0.0000],
    };

    var samples = {};

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var waveform;
    var buffer;
    var fArr;
    var i;
    for (var wave in waves) {
        waveform = jsfx.generate(jsfx.arrayToParams(waves[wave]));
        buffer = audioCtx.createBuffer(1, waveform.length, 44100);
        fArr = buffer.getChannelData(0);
        for (i = 0; i < fArr.length; i++) {
            fArr[i] = waveform[i];
        }
        samples[wave] = audioCtx.createBufferSource()
        samples[wave].buffer = buffer;
        samples[wave].connect(audioCtx.destination);
    }

    return {
        play: function(name) {
            var orig = samples[name];
            var cloned = audioCtx.createBufferSource();
            cloned.buffer = orig.buffer;
            cloned.playbackRate = orig.playbackRate;
            cloned.connect(audioCtx.destination);
            cloned.start(0);
        }
    };
});
