define('tiles', [], function() {
    var tiles = {
        TILE_AIR: 0,
        TILE_DIRT: 1,
        TILE_GRASS: 2,
        TILE_LEAF: 3,
        TILE_TRUNK: 4,
        TILE_BRICK: 5,
        TILE_WATER: 6,
        TILE_LOG: 7,
        TILE_LADDER: 8,
        TILE_DOOR_CLOSED: 9,
        TILE_DOOR_OPEN: 10,

        TILE_CHAIR_LEFT: 11,
        TILE_CHAIR_RIGHT: 12,
    };

    // TODO: remove when Chrome 38 comes out
    if (!window.Map) {
        function Map(items) {
            var result = {};
            for (var i = 0; i < items.length; i++) {
                result[items[i][0]] = items[i][1];
            }

            this.get = function(x) {
                return result[x];
            };
        }
    }

    tiles.IMAGES = new Map([
        [tiles.TILE_DIRT, 91],
        [tiles.TILE_GRASS, 88],
        [tiles.TILE_LEAF, 85],
        [tiles.TILE_TRUNK, 274],
        [tiles.TILE_BRICK, 104],
        [tiles.TILE_WATER, 196],
        [tiles.TILE_LOG, 0],
        [tiles.TILE_LADDER, 0],
        [tiles.TILE_DOOR_CLOSED, 0],
        [tiles.TILE_DOOR_OPEN, 0],

        [tiles.TILE_CHAIR_LEFT, 373],
        [tiles.TILE_CHAIR_RIGHT, 374],
    ]);

    // TODO: remove when Chrome 38 comes out
    if (!window.Set) {
        function Set(items) {
            var result = [];
            for (var i = 0; i < items.length; i++) {
                result[items[i]] = true;
            }

            this.has = function(x) {
                return !!result[x];
            };
        }
    }

    // Solid cannot be passed through.
    tiles.SOLID = new Set([
        tiles.TILE_DIRT,
        tiles.TILE_GRASS,
        tiles.TILE_LEAF,
        tiles.TILE_TRUNK,
        tiles.TILE_BRICK,
    ]);

    // Half solid is solid at half-height.
    tiles.HALF_SOLID = new Set([
        tiles.TILE_CHAIR_LEFT,
        tiles.TILE_CHAIR_RIGHT,
    ]);

    // Cloud can only be passed through going up.
    tiles.CLOUD = new Set([
        tiles.TILE_LOG,
    ]);

    return tiles;
});
