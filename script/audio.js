define('audio', ['jsfx'], function(jsfx) {

    var waves = {
        bastacorp: ["saw",0.0000,0.1930,0.0000,0.2680,0.0000,0.0040,110.0000,878.0000,2400.0000,-0.9000,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,-0.2960,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000],
    };

    var samples = jsfx.createWaves(waves);

    return {
        play: function(name) {
            samples[name].play();
        }
    };
});
