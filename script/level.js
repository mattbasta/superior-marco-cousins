define('level',
    ['audio', 'level.menu', 'level.platform', 'level.title'],
    function(audio, Lmenu, Lplatform, Ltitle) {

    var levels = [
        Ltitle.get('bastacorp', 2500, 'bastacorp'),
        Lmenu.get('menu', 'title'),
        Lplatform.get()
    ];
    var current = 0;

    levels[0].init();

    return {
        getCurrent: function() {
            return levels[current];
        },
        next: function() {
            audio.stop();
            current += 1;
            if (current === levels.length) {
                current = 0;
            }
            levels[current].init();
        }
    };

});
