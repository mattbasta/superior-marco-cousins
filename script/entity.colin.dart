import 'dart:html';
import 'dart:math' as Math;

import 'entity.generic.dart';
import 'images.dart' as images;
import 'level.generic.dart';
import 'settings.dart' as settings;


const SPRITE_TILE = 8;
const COLIN_JUMP_FORCE = 20;
const COLIN_JUMP_TIMER_MIN = 2000;
const COLIN_JUMP_TIMER_MAX = 4000;


class ColinEntity extends Entity {

    images.Drawable image;
    int jumpTimer;
    int jumpDuration;

    double bounce() => 0.4;
    bool canBePushed() => true;
    bool canBeStoodOn() => true;
    bool canPush() => true;
    bool canStandOn() => true;
    String type() => 'colin';

    ColinEntity(int x, int y): super() {
        this.x = x.toDouble();
        this.y = y.toDouble();

        this.image = images.get('entities');
    }

    void reset() {
        this.jumpTimer = 0;
        this.jumpDuration = COLIN_JUMP_TIMER_MIN;
    }

    void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY) {
        this.image.draw((img) {
            var x = this.isInContactWithFloor ? (new DateTime.now().millisecondsSinceEpoch / 350).floor() % 2 : 2;
            var locX = this.x * settings.tile_size;

            if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;

            ctx.drawImageScaledFromSource(
                img,
                x * SPRITE_TILE, SPRITE_TILE,
                SPRITE_TILE, SPRITE_TILE,
                locX + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size
            );
        });
    }

    bool tick(int delta, Level level) {

        // physics.tick(this, delta, level, registry);

        this.jumpTimer += delta;
        if (this.jumpTimer > this.jumpDuration) {
            this.jumpTimer = 0;
            //physics.doJump(this, COLIN_JUMP_FORCE);
            this.calculateJumpTime();
        }

        // var player = registry[0];

        // if (this.x > player.x + player.width) return;
        // if (this.x + this.width < player.x) return;
        // if (this.y > player.y + player.height) return;
        // if (this.y + this.height < player.y) return;

        return true;

    }

    void calculateJumpTime() {
        this.jumpDuration = new Math.Random().nextInt(COLIN_JUMP_TIMER_MAX - COLIN_JUMP_TIMER_MIN) + COLIN_JUMP_TIMER_MIN;
    }

}
