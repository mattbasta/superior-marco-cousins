define('level.platform',
    ['drawutils', 'entities', 'images', 'keys', 'settings'],
    function(drawutils, entities, images, keys, settings) {

    var TILE_DIRT = 91;
    var TILE_GRASS = 88;
    var TILE_LEAF = 85;
    var TILE_TRUNK = 274;
    var TILE_BRICK = 104;
    var TILE_WATER = 0;
    var TILE_LOG = 0;
    var TILE_LADDER = 0;
    var TILE_DOOR_CLOSED = 0;
    var TILE_DOOR_OPEN = 0;

    var TILES_PER_ROW = settings.sprite_tile_row;
    var TILES_RATIO = settings.tile_size / settings.sprite_tile_size;
    var DAY_LENGTH = 5 * 60 * 1000;  // 5 minutes

    function getTimeColor(time) {

        // One day-night cycle for every full oscillation of cosine
        var tod = Math.cos(time / DAY_LENGTH * 2 * Math.PI);
        // Normalize the result to [0,1]
        tod += 1;
        tod /= 2;

        var hue = 150 * tod - 100;  // [-100,50]
        var sat = 70 * tod + 20;  // [20,100]
        var lig = 33 * tod + 35;  // [35,68]

        hue += 255;
        hue %= 256;
        return 'hsl(' + hue + ',' + sat + '%,' + lig + '%)';
    }

    function getLevelIndex(x, y, width) {
        return y * width + x;
    }

    function LevelPlatform(width, height) {
        this.width = width;
        this.height = height;

        var levelBuf = this.levBuffer = new ArrayBuffer((width * height) << 2);
        var levelView = this.levView = new Uint16Array(levelBuf);

        var ctx = this.ctx = drawutils.getBuffer(width * settings.sprite_tile_size, height * settings.sprite_tile_size);

        images.waitFor('tiles').done(function(img) {
            var tile;
            var platform = -1;
            var lastPlatform = 5;
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    if (y < 3) tile = TILE_DIRT;
                    else if (y === 3) tile = TILE_GRASS;
                    else if (y === platform) tile = TILE_BRICK;
                    else continue;

                    levelView[getLevelIndex(x, y, width)] = tile;

                    ctx.drawImage(
                        img,
                        tile % TILES_PER_ROW * settings.sprite_tile_size,
                        Math.floor(tile / TILES_PER_ROW) * settings.sprite_tile_size,
                        settings.sprite_tile_size,
                        settings.sprite_tile_size,
                        x * settings.sprite_tile_size,
                        (height - y) * settings.sprite_tile_size,
                        settings.sprite_tile_size,
                        settings.sprite_tile_size
                    );
                }

                if (x % 6 === 0) {
                    platform = -1;
                } else if (x % 6 === 1) {
                    platform = ((Math.random() * 2 - 1) * 6 | 0) + lastPlatform;
                    platform = Math.max(platform, 5);
                    lastPlatform = platform;
                }
            }
        });

        this.time = 0;
        this.timeThreshold = 0;
        this.timeColor = 'hsl(46, 100%, 68%)';

        this.leftEdge = 0;

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

        var myHeight = this.ctx.canvas.height;
        var theirHeight = ctx.canvas.height;

        ctx.drawImage(
            this.ctx.canvas,
            this.leftEdge * settings.sprite_tile_size, myHeight - theirHeight / TILES_RATIO | 0,
            ctx.canvas.width / TILES_RATIO | 0, ctx.canvas.height / TILES_RATIO | 0,
            0, 0,
            ctx.canvas.width, ctx.canvas.height
        );

        entities.draw(ctx, this, ctx.canvas.height - this.ctx.canvas.height * TILES_RATIO);
    };
    LevelPlatform.prototype.init = function() {
        entities.reset();
    };
    LevelPlatform.prototype.tick = function(delta, levelComplete) {
        this.ttl -= delta;
        if (this.ttl <= 0) {
            levelComplete();
        }

        this.time += delta;

        entities.tick(delta, this);

    };

    return {
        get: function(width, height) {
            return new LevelPlatform(width, height);
        }
    }

});
