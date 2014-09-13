define('level', ['level.platform', 'level.title'], function(Lplatform, Ltitle) {

    var levels = [
        Ltitle.get('bastacorp', 2500, 'bastacorp')
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
