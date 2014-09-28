import 'dart:html';

import 'entity.generic.dart';
import 'images.dart' as images;
import 'level.generic.dart';
import 'settings.dart' as settings;


const DIR_LEFT = 0;
const DIR_RIGHT = 0;
const SPRITE_TILE = 8;

class Player extends Entity {

    images.Drawable image;

    bool ducking = false;
    bool walking = false;

    int direction;

    Player() {
        image = images.get('blueman');
        this.reset();
    }

    void reset() {
        this.x = 1;
        this.y = 5;
        this.velX = 0;
        this.velY = 0;
        this.ducking = false;
        this.walking = false;

        this.direction = DIR_RIGHT;
    }

    void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY) {
        this.image.draw((img) {
            var x = 4; // Default pose
            var now = new DateTime.now().millisecondsSinceEpoch;
            // If the player is walking, make them wiggle between states 5 and 6
            if (this.walking) {
                x += now / 200 % 2 + 2;
            } else if (this.ducking) {
                x = 2;
            }
            if (this.velY < -10 && !this.ducking) {
                x = 0;
            }

            ctx.drawImageScaledFromSource(
                img,
                x * SPRITE_TILE, this.direction * SPRITE_TILE,
                SPRITE_TILE, SPRITE_TILE,
                this.x * settings.tile_size + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size
            );
        });
    }

    void tick(int delta, Level level, List registry) {

    }

}
