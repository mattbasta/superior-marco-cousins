import 'dart:html';

import 'level.generic.dart';


abstract class Entity {

    double x;
    double y;
    double velX = 0;
    double velY = 0;

    int height = 1;
    int width = 1;

    bool bouncing = false;
    bool isInContactWithFloor = false;

    List<Entity> standers;
    Entity standingOn = null;

    Entity() {
        this.standers = new List<entity>();
        this.reset();
    }

    void reset();

    void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY);

    void tick(int delta, Level level, List registry, int i);

}
