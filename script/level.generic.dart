import 'dart:html';
import 'dart:typed_data';


abstract class Level {

    int height;
    int width;

    CanvasRenderingContext2D ctx;
    Uint16List data;

    void draw(CanvasRenderingContext2D ctx, Function drawUI);

    void reset();

    void tick(int delta, Function nextLevel);

    int getLevelIndex(int x, int y) {
        return 0;
    }

    void sitByPool() {
        // noop
    }

    void drownedInPool() {
        // noop
    }

    void fellInHole() {
        // noop
    }

}
