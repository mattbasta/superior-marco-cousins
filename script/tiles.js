define('tiles', [], function() {
    var tiles = {
        TILE_BRICK: 1,
        TILE_ROCK: 2,
        TILE_ROCK_LOOSE: 3,
        TILE_CARVED_STONE: 4,
        TILE_CRACKED_STONE: 5,

        TILE_DIRT: 6,
        TILE_GRASS: 7,
        TILE_WATER: 10,
        TILE_TRUNK: 11,
        TILE_LEAF: 12,
        TILE_GLASS: 16,
        TILE_LOG: 17,
        TILE_LADDER: 18,
        TILE_DOOR_CLOSED: 19,
        TILE_DOOR_OPEN: 20,

        TILE_CHAIR_LEFT: 21,
        TILE_CHAIR_RIGHT: 22,

        TILE_SIGN_RIGHT: 23,
        TILE_SIGN_RIGHT_UP: 24,
        TILE_SIGN_LEFT: 25,
        TILE_SIGN_STOP: 26,
        TILE_SIGN_RIGHT_DOWN: 27,
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
        [tiles.TILE_BRICK, 0],
        [tiles.TILE_ROCK, 1],
        [tiles.TILE_ROCK_LOOSE, 2],
        [tiles.TILE_CARVED_STONE, 3],
        [tiles.TILE_CRACKED_STONE, 4],
        [tiles.TILE_DIRT, 5],
        [tiles.TILE_GRASS, 6],
        [tiles.TILE_WATER, 9],
        [tiles.TILE_TRUNK, 10],
        [tiles.TILE_LEAF, 11],
        [tiles.TILE_GLASS, 15],
        [tiles.TILE_LOG, 16],
        [tiles.TILE_LADDER, 17],
        [tiles.TILE_DOOR_CLOSED, 18],
        [tiles.TILE_DOOR_OPEN, 19],

        [tiles.TILE_CHAIR_LEFT, 20],
        [tiles.TILE_CHAIR_RIGHT, 21],
        [tiles.TILE_SIGN_RIGHT, 22],
        [tiles.TILE_SIGN_RIGHT_UP, 23],
        [tiles.TILE_SIGN_LEFT, 24],
        [tiles.TILE_SIGN_STOP, 25],
        [tiles.TILE_SIGN_RIGHT_DOWN, 26],
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
        tiles.TILE_ROCK,
        tiles.TILE_ROCK_LOOSE,
        tiles.TILE_CARVED_STONE,
        tiles.TILE_CRACKED_STONE,
        tiles.TILE_DIRT,
        tiles.TILE_GRASS,
        tiles.TILE_BRICK,
        tiles.TILE_GLASS,
    ]);

    // Half solid is solid at half-height.
    tiles.HALF_SOLID = new Set([
        tiles.TILE_CHAIR_LEFT,
        tiles.TILE_CHAIR_RIGHT,
    ]);

    // Cloud can only be passed through going up.
    tiles.CLOUD = new Set([
        tiles.TILE_LEAF,
        tiles.TILE_LOG,
    ]);

    return tiles;
});
