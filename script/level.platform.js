define('level.platform',
    ['drawutils', 'entities', 'images', 'keys', 'settings', 'sound', 'tiles'],
    function(drawutils, entities, images, keys, settings, sound, tiles) {


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
            var tileImg;
            var platform = -1;
            var lastPlatform = 5;
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    tile = tiles.TILE_AIR;

                    if (x > width - 10) {
                        if (y === 4) {
                            if (x === width - 9) tile = tiles.TILE_CHAIR_LEFT;
                            else if (x === width - 8) tile = tiles.TILE_CHAIR_RIGHT;
                        } else if (y < 4 && x > width - 8 && x < width - 1) tile = tiles.TILE_WATER;
                        else if (y === 3 || y < 3 && x >= width - 8) tile = tiles.TILE_BRICK;
                        else if (y < 3) tile = tiles.TILE_DIRT;
                    } else if (y < 3) tile = tiles.TILE_DIRT;
                    else if (y === 3) tile = tiles.TILE_GRASS;
                    else if (y === platform) tile = tiles.TILE_BRICK;
                    else if (x % 10 === 0 && y < 6) tile = tiles.TILE_BRICK;
                    else continue;

                    levelView[getLevelIndex(x, y, width)] = tile;

                    if (tile === tiles.TILE_AIR) continue;

                    tileImg = tiles.IMAGES.get(tile);

                    ctx.drawImage(
                        img,
                        tileImg % TILES_PER_ROW * settings.sprite_tile_size,
                        Math.floor(tileImg / TILES_PER_ROW) * settings.sprite_tile_size,
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

    }

    LevelPlatform.prototype.getLevelIndex = getLevelIndex;

    LevelPlatform.prototype.draw = function(ctx) {
        // Clear the frame with the sky color.
        ctx.fillStyle = getTimeColor(this.time);
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var myHeight = this.ctx.canvas.height;
        var theirHeight = ctx.canvas.height;

        // Calculate the new best offsets for the viewport
        var player = entities.registry[0];
        var bestX = (player.x + player.width / 2) - (ctx.canvas.width / settings.tile_size / 2);
        var bestY = (player.y + player.height / 2) - (ctx.canvas.height / settings.tile_size / 2);

        this.leftEdge = (this.leftEdge * 6 + bestX) / 7;
        this.bottomEdge = (this.bottomEdge * 6 + bestY) / 7;

        this.leftEdge = Math.max(Math.min(this.leftEdge, this.width - ctx.canvas.width / settings.tile_size), 0);
        this.bottomEdge = Math.max(Math.min(this.bottomEdge, this.height - 1 - ctx.canvas.height / settings.tile_size), 0);

        ctx.drawImage(
            this.ctx.canvas,
            this.leftEdge * settings.sprite_tile_size, myHeight - theirHeight / TILES_RATIO - this.bottomEdge * settings.sprite_tile_size | 0,
            ctx.canvas.width / TILES_RATIO | 0, (ctx.canvas.height + 1) / TILES_RATIO | 0,
            0, 0,
            ctx.canvas.width, ctx.canvas.height
        );

        entities.draw(
            ctx,
            this,
            -1 * this.leftEdge * settings.tile_size,
            ctx.canvas.height - (this.ctx.canvas.height) * TILES_RATIO + this.bottomEdge * settings.tile_size
        );
    };
    LevelPlatform.prototype.init = function() {
        this.time = 0;

        this.leftEdge = 0;
        this.bottomEdge = 0;

        this.completed = false;
        entities.reset();
    };
    LevelPlatform.prototype.tick = function(delta, levelComplete) {
        if (this.completed) {
            levelComplete();
        }

        this.time += delta;

        entities.tick(delta, this);

    };


    LevelPlatform.prototype.drownedInPool = function() {
        sound.play('drownInPool');
    };


    LevelPlatform.prototype.complete = function() {
        this.completed = true;
    };

    return {
        get: function(width, height) {
            return new LevelPlatform(width, height);
        }
    }

});
