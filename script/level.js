define('level', ['level.menu', 'level.platform', 'level.title'], function(Lmenu, Lplatform, Ltitle) {

    var levels = [
        Ltitle.get('bastacorp', 2500, 'bastacorp'),
        Lmenu.get('bastacorp', 'title'),
        Lplatform.get()
    ];
    var current = 0;

    levels[0].init();

    return {
        getCurrent: function() {
            return levels[current];
        },
        next: function() {
            current += 1;
            if (current === levels.length) {
                current = 0;
            }
            levels[current].init();
        }
    };

});
