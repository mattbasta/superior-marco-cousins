import 'dart:html';

import 'level.generic.dart';


abstract class Entity {

    double x;
    double y;
    double velX;
    double velY;

    int height = 1;
    int width = 1;

    void reset();

    void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY);

    void tick(int delta, Level level, List registry);

}
