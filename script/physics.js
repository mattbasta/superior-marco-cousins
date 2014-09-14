define('physics', [], function() {

    var DELTA_RATIO = 20 / 1000;

    var GRAVITY = 50;

    function downardsHitTesting(entity, level) {
        for (var x = Math.max(entity.x | 0, 0); x < Math.min(Math.ceil(entity.x + entity.width), level.width - 1); x++) {
            if (level.levView[level.getLevelIndex(x, Math.ceil(entity.y), level.width)] !== 0) {
                entity.velY = 0;
                entity.y = Math.ceil(entity.y);
                entity.isInContactWithFloor = true;
                break;
            }
        }
    }

    function tick(entity, delta, level) {
        entity.x += entity.velX * DELTA_RATIO;
        entity.y += entity.velY * DELTA_RATIO;

        if (entity.velY && entity.isInContactWithFloor) {
            entity.isInContactWithFloor = false;
        }

        if (!entity.isInContactWithFloor) {
            entity.velY -= GRAVITY * DELTA_RATIO;
        }

        if (entity.velY < 0) {
            downardsHitTesting(entity, level);
        }
    }

    return {
        tick: tick
    };
});
