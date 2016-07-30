export const TILE_AIR = 0;
export const TILE_BRICK = 1;
export const TILE_ROCK = 2;
export const TILE_ROCK_LOOSE = 3;
export const TILE_CARVED_STONE = 4;
export const TILE_CRACKED_STONE = 5;

export const TILE_DIRT = 6;
export const TILE_GRASS = 7;
export const TILE_WATER = 10;
export const TILE_TRUNK = 11;
export const TILE_LEAF = 12;
export const TILE_GLASS = 16;
export const TILE_LOG = 17;
export const TILE_LADDER = 18;
export const TILE_DOOR_CLOSED = 19;
export const TILE_DOOR_OPEN = 20;

export const TILE_CHAIR_LEFT = 21;
export const TILE_CHAIR_RIGHT = 22;

export const TILE_SIGN_RIGHT = 23;
export const TILE_SIGN_RIGHT_UP = 24;
export const TILE_SIGN_LEFT = 25;
export const TILE_SIGN_STOP = 26;
export const TILE_SIGN_RIGHT_DOWN = 27;
export const TILE_SIGN_Q = 28;

export const IMAGES = {
    [TILE_BRICK]: 0,
    [TILE_ROCK]: 1,
    [TILE_ROCK_LOOSE]: 2,
    [TILE_CARVED_STONE]: 3,
    [TILE_CRACKED_STONE]: 4,
    [TILE_DIRT]: 5,
    [TILE_GRASS]: 6,
    [TILE_WATER]: 9,
    [TILE_TRUNK]: 10,
    [TILE_LEAF]: 11,
    [TILE_GLASS]: 15,
    [TILE_LOG]: 16,
    [TILE_LADDER]: 17,
    [TILE_DOOR_CLOSED]: 18,
    [TILE_DOOR_OPEN]: 19,

    [TILE_CHAIR_LEFT]: 20,
    [TILE_CHAIR_RIGHT]: 21,
    [TILE_SIGN_RIGHT]: 22,
    [TILE_SIGN_RIGHT_UP]: 23,
    [TILE_SIGN_LEFT]: 24,
    [TILE_SIGN_STOP]: 25,
    [TILE_SIGN_RIGHT_DOWN]: 26,
    [TILE_SIGN_Q]: 27,
};

// Solid cannot be passed through.
export const SOLID = new Set([
    TILE_ROCK,
    TILE_ROCK_LOOSE,
    TILE_CARVED_STONE,
    TILE_CRACKED_STONE,
    TILE_DIRT,
    TILE_GRASS,
    TILE_BRICK,
    TILE_GLASS,
]);

// Half solid is solid at half-height.
export const HALF_SOLID = new Set([
    TILE_CHAIR_LEFT,
    TILE_CHAIR_RIGHT,
]);

// Cloud can only be passed through going up.
export const CLOUD = new Set([
    TILE_LEAF,
    TILE_LOG,
]);


export function canStand(tile) {
    return SOLID.has(tile) || CLOUD.has(tile);
};
