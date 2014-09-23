define('entity.melon', ['images', 'physics', 'settings', 'sound'], function(images, physics, settings, sound) {

    var SPRITE_TILE = 8;

    function MelonEntity(startX, startY) {
        this.image = null;
        var me = this;
        images.waitFor('entities').done(function(img) {
            me.image = img;
        });

        this.x = startX;
        this.y = startY;
        this.width = 1;
        this.height = 1;
        this.jumps = false;

        this.velX = 0;
        this.velY = 0;

        this.bounc = 0.5;
        this.bouncing = false;
        this.isInContactWithFloor = false;
    }

    MelonEntity.prototype.draw = function(ctx, level, offsetX, offsetY) {
        if (!this.image) {
            return;
        }

        var x = Math.floor(Date.now() / 250) % 3;
        var locX = this.x * settings.tile_size;

        if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;

        ctx.drawImage(
            this.image,
            x * SPRITE_TILE, 0,
            SPRITE_TILE, SPRITE_TILE,
            locX + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
            settings.tile_size, settings.tile_size
        );
    };
    MelonEntity.prototype.tick = function(delta, level, registry, i) {
        if (this.bouncing) {
            physics.tick(this, delta, level);
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
    };

    return {
        get: function(x, y) {
            return new MelonEntity(x, y);
        }
    };
});
