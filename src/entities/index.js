import {BeetleEntity} from './beetle';
import {ColinEntity} from './colin';
import {MelonEntity} from './melon';
import {Player} from '../player';


const registry = [];

export function init() {
    registry.push(new Player());
};

export function draw(ctx, level, offsetX, offsetY) {
    for (let i = 0; i < registry.length; i++) {
        registry[i].draw(ctx, level, offsetX, offsetY);
    }
};

export function tick(delta, level) {
    for (let i = registry.length - 1; i >= 0; i--) {
        const result = registry[i].tick(delta, level);
        if (!result) {
            registry.slice(i, 1);
        }
    }
};

export function getEntity(id, x, y) {
    switch (id) {
        case 0: // Melon
            return new MelonEntity(x, y);
        case 5: // Colin
            return new ColinEntity(x, y);
        case 15: // Beetle
            return new BeetleEntity(x, y);
        default:
            throw new Error(`Unrecognized entity ${id}`);
    }
};

export function add(id, x, y) {
    registry.add(getEntity(id, x, y));
};

export function reset() {
    if (registry.length === 1) {
        return;
    }
    registry.slice(1, registry.length);
    registry[0].reset();
};
