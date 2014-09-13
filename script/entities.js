define('entities', [], function() {

    var registry = [];

    function process(entity, delta) {}

    function tick(delta) {
        for (var i = 0; i < registry.length; i++) {
            process(registry[i], delta);
        }
    }

    return {
        registry: registry,
        tick: tick
    };
});
