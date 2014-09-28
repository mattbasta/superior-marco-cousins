import 'dart:html';

import 'entity.generic.dart';
import 'images.dart' as images;
import 'settings.dart' as settings;
import 'sound.dart' as sound;


const SPRITE_TILE = 8;

class MelonEntity extends Entity {

    images.Drawable image;
    bool bouncing = false;

    MelonEntity(int x, int y): super() {
        this.x = x;
        this.y = y;

        this.image = images.get('entities');
    }

    void reset() {
        this.bouncing = false;
    }

    void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY) {
        this.image.draw((img) {
            var x = ((new DateTime.now().millisecondsSinceEpoch) / 250).floor() % 3;
            var locX = this.x * settings.tile_size;

            if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;

            ctx.drawImageScaledFromSource(
                img,
                x * SPRITE_TILE, 0,
                SPRITE_TILE, SPRITE_TILE,
                locX + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size
            );
        });
    }

    void tick(int delta, Level level, List registry, int i) {
        if (this.bouncing) {
            physics.tick(this, delta, level, registry);
            this.velX *= 0.95;
            if (this.isInContactWithFloor && this.velX + this.velY < 1) {
                this.bouncing = false;
                this.x = Math.round(this.x);
            }
        } else {
            var player = registry[0];

            if (this.x > player.x + player.width) return;
            if (this.x + this.width < player.x) return;
            if (this.y > player.y + player.height) return;
            if (this.y + this.height < player.y) return;

            registry.splice(i, 1);
            player.melonCount++;
            sound.play('melonCollect');
        }
    }

}
