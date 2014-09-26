define('level',
    ['audio', 'level.disability', 'level.melonomics', 'level.menu', 'level.platform', 'level.title', 'leveldata'],
    function(audio, Ldisability, Lmelonomics, Lmenu, Lplatform, Ltitle, leveldata) {

    var levels = [
        Ltitle.get('bastacorp', 750, 'bastacorp'),
        Lmenu.get('menu', 'title'),
    ];

    leveldata.forEach(function(level) {
        levels.push(Lplatform.get(level));
        levels.push(Lmelonomics.get());
    });

    levels.push(Ldisability.get());
    var DISABILITY_LEVEL = levels.length - 1;

    var current = 0;

    levels[0].init();

    function goTo(lev) {
        current = lev;
        audio.stop();
        levels[current].init();
    }

    return {
        getCurrent: function() {
            return levels[current];
        },
        goTo: goTo,
        goToDisability: function() {
            goTo(DISABILITY_LEVEL)
        },
        next: function() {
            current += 1;
            if (current === levels.length) {
                current = 0;
            }
            goTo(current);
        }
    };

});
