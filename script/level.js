define('level',
    ['audio', 'level.menu', 'level.platform', 'level.title'],
    function(audio, Lmenu, Lplatform, Ltitle) {

    var levels = [
        Ltitle.get('bastacorp', 750, 'bastacorp'),
        Lmenu.get('menu', 'title'),
        Lplatform.get(128, 32)
    ];
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
        next: function() {
            current += 1;
            if (current === levels.length) {
                current = 0;
            }
            goTo(current);
        }
    };

});
