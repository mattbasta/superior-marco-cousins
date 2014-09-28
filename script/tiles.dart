const int TILE_AIR = 0;
const int TILE_BRICK = 1;
const int TILE_ROCK = 2;
const int TILE_ROCK_LOOSE = 3;
const int TILE_CARVED_STONE = 4;
const int TILE_CRACKED_STONE = 5;

const int TILE_DIRT = 6;
const int TILE_GRASS = 7;
const int TILE_WATER = 10;
const int TILE_TRUNK = 11;
const int TILE_LEAF = 12;
const int TILE_GLASS = 16;
const int TILE_LOG = 17;
const int TILE_LADDER = 18;
const int TILE_DOOR_CLOSED = 19;
const int TILE_DOOR_OPEN = 20;

const int TILE_CHAIR_LEFT = 21;
const int TILE_CHAIR_RIGHT = 22;

const int TILE_SIGN_RIGHT = 23;
const int TILE_SIGN_RIGHT_UP = 24;
const int TILE_SIGN_LEFT = 25;
const int TILE_SIGN_STOP = 26;
const int TILE_SIGN_RIGHT_DOWN = 27;
const int TILE_SIGN_Q = 28;

Map<int, int> IMAGES = {
    TILE_BRICK: 0,
    TILE_ROCK: 1,
    TILE_ROCK_LOOSE: 2,
    TILE_CARVED_STONE: 3,
    TILE_CRACKED_STONE: 4,
    TILE_DIRT: 5,
    TILE_GRASS: 6,
    TILE_WATER: 9,
    TILE_TRUNK: 10,
    TILE_LEAF: 11,
    TILE_GLASS: 15,
    TILE_LOG: 16,
    TILE_LADDER: 17,
    TILE_DOOR_CLOSED: 18,
    TILE_DOOR_OPEN: 19,

    TILE_CHAIR_LEFT: 20,
    TILE_CHAIR_RIGHT: 21,
    TILE_SIGN_RIGHT: 22,
    TILE_SIGN_RIGHT_UP: 23,
    TILE_SIGN_LEFT: 24,
    TILE_SIGN_STOP: 25,
    TILE_SIGN_RIGHT_DOWN: 26,
    TILE_SIGN_Q: 27,
};

// Solid cannot be passed through.
Set<int> SOLID = new Set.from([
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
Set<int> HALF_SOLID = new Set.from([
    TILE_CHAIR_LEFT,
    TILE_CHAIR_RIGHT,
]);

// Cloud can only be passed through going up.
Set<int> CLOUD = new Set.from([
    TILE_LEAF,
    TILE_LOG,
]);
