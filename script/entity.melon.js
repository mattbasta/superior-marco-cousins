define('entity.melon', ['images', 'settings'], function(images, settings) {

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
    MelonEntity.prototype.tick = function(delta, level, registry) {
        //
    };

    return {
        get: function(x, y) {
            return new MelonEntity(x, y);
        }
    };
});
