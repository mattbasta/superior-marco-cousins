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
    };

    tiles.IMAGES = new Map([
        [tiles.TILE_AIR, 0],
        [tiles.TILE_DIRT, 91],
        [tiles.TILE_GRASS, 88],
        [tiles.TILE_LEAF, 85],
        [tiles.TILE_TRUNK, 274],
        [tiles.TILE_BRICK, 104],
        [tiles.TILE_WATER, 0],
        [tiles.TILE_LOG, 0],
        [tiles.TILE_LADDER, 0],
        [tiles.TILE_DOOR_CLOSED, 0],
        [tiles.TILE_DOOR_OPEN, 0],
    ]);

    // Solid cannot be passed through.
    tiles.SOLID = new Set([
        tiles.TILE_DIRT,
        tiles.TILE_GRASS,
        tiles.TILE_LEAF,
        tiles.TILE_TRUNK,
        tiles.TILE_BRICK,
    ]);

    // Cloud can only be passed through going up.
    tiles.CLOUD = new Set([
        tiles.TILE_LOG,
    ]);

    return tiles;
});
