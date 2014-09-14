define('level.platform', ['drawutils', 'images', 'keys', 'settings'], function(drawutils, images, keys, settings) {

    var TILE_DIRT = 91;
    var TILE_GRASS = 88;
    var TILE_LEAF = 85;
    var TILE_TRUNK = 274;
    var TILE_BRICK = 0;
    var TILE_WATER = 0;
    var TILE_LOG = 0;
    var TILE_LADDER = 0;
    var TILE_DOOR_CLOSED = 0;
    var TILE_DOOR_OPEN = 0;

    var TILES_PER_ROW = settings.sprite_tile_row;

    function LevelPlatform(width, height) {
        var levelBuf = new ArrayBuffer((width * height) << 2);
        var levelView = new Uint16Array(levelBuf);

        var ctx = this.ctx = drawutils.getBuffer(width * settings.tile_size, height * settings.tile_size);

        images.waitFor('tiles').done(function(img) {
            var tile;
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    if (y < 3) tile = TILE_DIRT;
                    else if (y === 3) tile = TILE_GRASS;
                    else continue;

                    ctx.drawImage(
                        img,
                        tile % TILES_PER_ROW * settings.sprite_tile_size,
                        Math.floor(tile / TILES_PER_ROW) * settings.sprite_tile_size,
                        settings.sprite_tile_size,
                        settings.sprite_tile_size,
                        x * settings.tile_size,
                        (height - y) * settings.tile_size,
                        settings.tile_size,
                        settings.tile_size
                    );
                }
            }
        });

    }

    LevelPlatform.prototype.draw = function(ctx) {
        // Clear the frame with the sky color.
        // TODO: Add a day/night cycle?
        ctx.fillStyle = '#FED95E';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.drawImage(this.ctx.canvas, 0, ctx.canvas.height - this.ctx.canvas.height);
    };
    LevelPlatform.prototype.init = function() {};
    LevelPlatform.prototype.tick = function(delta, levelComplete) {
        this.ttl -= delta;
        if (this.ttl <= 0) {
            levelComplete();
        }
    };

    return {
        get: function(width, height) {
            return new LevelPlatform(width, height);
        }
    }

});
