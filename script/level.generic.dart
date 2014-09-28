import 'dart:html';


abstract class Level {

    void draw(CanvasRenderingContext2D ctx, Function drawUI);

    void reset();

    void tick(int delta, Function nextLevel);

}
