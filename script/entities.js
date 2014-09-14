define('entities', ['player'], function(player) {

    var registry = [
        player.get()
    ];

    function draw(ctx, level, offsetY) {
        for (var i = 0; i < registry.length; i++) {
            registry[i].draw(ctx, level, offsetY);
        }
    }

    function tick(delta, level) {
        for (var i = 0; i < registry.length; i++) {
            registry[i].tick(delta, level);
        }
    }

    return {
        draw: draw,
        registry: registry,
        reset: function() {
            registry.splice(1, registry.length - 1);
        },
        tick: tick
    };
});
