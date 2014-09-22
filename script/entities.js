define('entities', ['entity.melon', 'player'], function(Emelon, player) {

    var registry = [
        player.get()
    ];

    function draw(ctx, level, offsetX, offsetY) {
        for (var i = 0; i < registry.length; i++) {
            registry[i].draw(ctx, level, offsetX, offsetY);
        }
    }

    function tick(delta, level) {
        for (var i = 0; i < registry.length; i++) {
            registry[i].tick(delta, level);
        }
    }

    function get(id, x, y) {
        switch (id) {
            case 0: // Melon
                return Emelon.get(x, y);
        }
        return null;
    }

    return {
        draw: draw,
        registry: registry,
        reset: function() {
            registry.splice(1, registry.length - 1);
            registry[0].reset();
        },
        tick: tick,
        get: get,
        add: function(id, x, y) {
            registry.push(get(id, x, y));
        }
    };
});
