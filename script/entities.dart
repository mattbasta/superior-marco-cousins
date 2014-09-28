import 'dart:html';

import 'entity.generic.dart';
import 'level.generic.dart';
import 'player.dart' as player;


var registry = [];

void init() {
    registry.add(new player.Player());
}

void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY) {
    for (var i = 0; i < registry.length; i++) {
        registry[i].draw(ctx, level, offsetX, offsetY);
    }
}
void tick(int delta, Level level) {
    for (var i = 0; i < registry.length; i++) {
        registry[i].tick(delta, level, registry, i);
    }
}

Entity getEntity(int id, int x, int y) {
    switch (id) {
        //
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
}
