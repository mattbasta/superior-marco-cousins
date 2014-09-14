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
    var DAY_LENGTH = 5 * 60 * 1000;  // 5 minutes

    function getTimeColor(time) {

        // One day-night cycle for every full oscillation of cosine
        var tod = Math.cos(time / DAY_LENGTH * 2 * Math.PI);
        // Normalize the result to [0,1]
        tod += 1;
        tod /= 2;

        var hue = 150 * tod - 100;  // [-100,50]
        var sat = 70 * tod + 30;  // [30,100]
        var lig = 28 * tod + 40;  // [40,68]

        hue += 255;
        hue %= 256;
        return 'hsl(' + hue + ',' + sat + '%,' + lig + '%)';
    }

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

        this.time = 0;
        this.timeThreshold = 0;
        this.timeColor = 'hsl(46, 100%, 68%)';

    }

    LevelPlatform.prototype.draw = function(ctx) {
        // Clear the frame with the sky color.
        var threshold = (this.time / 250 | 0)
        if (threshold !== this.timeThreshold) {
            this.timeThreshold = threshold;
            this.timeColor = getTimeColor(this.time);
        }
        ctx.fillStyle = this.timeColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.drawImage(
            this.ctx.canvas,
            0, this.ctx.canvas.height - ctx.canvas.height,
            ctx.canvas.width, ctx.canvas.height,
            0, 0,
            ctx.canvas.width, ctx.canvas.height
        );
    };
    LevelPlatform.prototype.init = function() {};
    LevelPlatform.prototype.tick = function(delta, levelComplete) {
        this.ttl -= delta;
        if (this.ttl <= 0) {
            levelComplete();
        }

        this.time += delta;

    };

    return {
        get: function(width, height) {
            return new LevelPlatform(width, height);
        }
    }

});
