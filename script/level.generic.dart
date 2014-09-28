import 'dart:html';


abstract class Level {

    int height;
    int width;

    void draw(CanvasRenderingContext2D ctx, Function drawUI);

    void reset();

    void tick(int delta, Function nextLevel);

}
