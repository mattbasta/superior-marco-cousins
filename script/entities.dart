import 'dart:html';

import 'entity.colin.dart';
import 'entity.generic.dart';
import 'entity.melon.dart';
import 'level.generic.dart';
import 'player.dart';


var registry = [];

void init() {
    registry.add(new Player());
}

void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY) {
    for (var i = 0; i < registry.length; i++) {
        registry[i].draw(ctx, level, offsetX, offsetY);
    }
}

void tick(int delta, Level level) {
    for (var i = registry.length - 1; i >= 0; i--) {
        bool result = registry[i].tick(delta, level);
        if (!result) {
            registry.removeAt(i);
        }
    }
}

Entity getEntity(int id, int x, int y) {
    switch (id) {
        case 0: // Melon
            return new MelonEntity(x, y);
        case 5: // Colin
            return new ColinEntity(x, y);
    }
    return null;
}

void add(int id, int x, int y) {
    registry.add(getEntity(id, x, y));
}

void reset() {
    if (registry.length == 1) {
        return;
    }
    registry.removeRange(1, registry.length - 1);
    (registry[0] as Player).reset();
}
