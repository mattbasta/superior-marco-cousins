library entities.beetle;

import 'dart:html';

import 'entity.generic.dart';
import 'images.dart' as images;
import 'level.generic.dart';
import 'settings.dart' as settings;
import 'tiles.dart' as tiles;


const SPRITE_TILE = 8;

const DIR_LEFT = 0;
const DIR_RIGHT = 1;

const BEETLE_SPEED = 4.0;

class BeetleEntity extends Entity {

    images.Drawable image;

    int direction;

    double bounce() => 0.3;
    bool canBePushed() => false;
    bool canBeStoodOn() => true;
    bool canPush() => true;
    bool canStandOn() => true;
    String type() => 'beetle';

    BeetleEntity(int x, int y): super() {
        this.x = x.toDouble();
        this.y = y.toDouble();

        this.height = 0.625;

        this.image = images.get('entities');
    }

    void reset() {
        this.direction = DIR_RIGHT;
    }

    void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY) {
        this.image.draw((img) {
            var x = (new DateTime.now().millisecondsSinceEpoch / 350).floor() % 2;
            if (this.direction == DIR_LEFT) {
                x += 2;
            }
            var locX = this.x * settings.tile_size;

            if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;

            ctx.drawImageScaledFromSource(
                img,
                x * SPRITE_TILE, 3 * SPRITE_TILE + 3,
                SPRITE_TILE, SPRITE_TILE * this.height,
                locX + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size * this.height
            );
        });
    }

    bool tick(int delta, Level level) {

        double prospectiveVel;
        if (this.direction == DIR_LEFT) {
            prospectiveVel = -1 * BEETLE_SPEED;
        } else if (this.direction == DIR_RIGHT) {
            prospectiveVel = BEETLE_SPEED;
        }

        double newX = this.x + prospectiveVel / delta * DELTA_RATIO;
        if (this.isInContactWithFloor && newX.floor() != this.x.floor()) {
            for (int x = newX.floor(); x <= (newX.floor() + this.width).ceil(); x++) {
                int index = level.getLevelIndex(x, this.y.ceil());
                if (!tiles.canStand(level.data[index])) {
                    this.hitWall(this.x);
                    break;
                }
            }
        }

        this.velX = prospectiveVel;

        this.calcPhysics(delta, level);

        return this.y > -1;

    }

    void hitWall(double stoppedX) {
        super.hitWall(stoppedX);
        this.direction = (this.direction == DIR_LEFT) ? DIR_RIGHT : DIR_LEFT;
    }

}
