define('level.platform',
    ['base64', 'celestialbodies', 'drawutils', 'entities', 'images', 'keys', 'settings', 'sound', 'tiles'],
    function(base64, celestialbodies, drawutils, entities, images, keys, settings, sound, tiles) {


    var TILES_PER_ROW = settings.sprite_tile_row;
    var TILES_RATIO = settings.tile_size / settings.sprite_tile_size;
    var TILES_RATIO_INV = settings.sprite_tile_size / settings.tile_size;
    var DAY_LENGTH = 5 * 60 * 1000;  // 5 minutes
    var COMPLETED_TTL = 3000;

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

    function LevelPlatform(width, height, data, defaultEntities) {
        this.width = width;
        this.height = height;

        this.defaultEntities = defaultEntities;

        var levelBuf = this.levBuffer = new ArrayBuffer((width * height) << 2);
        var levelView = this.levView = new Uint16Array(levelBuf);

        if (data) {
            data = base64.base64DecToArr(data);
            for (var i = 0; i < data.length; i++) {
                levelView[i] = data[i];
            }
        }

        var ctx = this.ctx = drawutils.getBuffer(width * settings.sprite_tile_size, height * settings.sprite_tile_size);

        var me = this;

        images.waitFor('tiles').done(function(img) {
            var tile;
            var tileImg;
            var platform = -1;
            var lastPlatform = 5;
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    tile = levelView[me.getLevelIndex(x, y)];
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

    LevelPlatform.prototype.getLevelIndex = function(x, y) {
        return (this.height - y) * this.width + x;
    };

    LevelPlatform.prototype.draw = function(ctx) {
        // Clear the frame with the sky color.
        ctx.fillStyle = getTimeColor(this.time);
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw the sun/moon
        ctx.drawImage(
            celestialbodies.sun,
            0, 0,
            celestialbodies.sun.width, celestialbodies.sun.height,
            30, -1 * (ctx.canvas.height / 2) * Math.cos(this.time / DAY_LENGTH * 2 * Math.PI) + ctx.canvas.height,
            60, 60
        );
        ctx.drawImage(
            celestialbodies.moon,
            0, 0,
            celestialbodies.moon.width, celestialbodies.moon.height,
            ctx.canvas.width - 60 - 30, (ctx.canvas.height / 2) * Math.cos(this.time / DAY_LENGTH * 2 * Math.PI) + ctx.canvas.height,
            60, 60
        );

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

        var terrainY = myHeight - theirHeight / TILES_RATIO - this.bottomEdge * settings.sprite_tile_size;
        ctx.drawImage(
            this.ctx.canvas,
            this.leftEdge * settings.sprite_tile_size, terrainY,
            ctx.canvas.width / TILES_RATIO | 0, (ctx.canvas.height + 1) / TILES_RATIO | 0,
            0, 0,
            ctx.canvas.width, ctx.canvas.height + TILES_RATIO_INV
        );

        var offsetX = -1 * this.leftEdge * settings.tile_size;
        var offsetY = ctx.canvas.height - myHeight * TILES_RATIO + this.bottomEdge * settings.tile_size;
        entities.draw(ctx, this, offsetX, offsetY);

        if (this.levelCompletedTTL !== -1) {
            var me = this;
            images.waitFor('coolshades').done(function(shades) {
                var playerY = (me.height - player.y - player.height) * settings.tile_size + offsetY;
                ctx.drawImage(
                    shades,
                    0, 0,
                    shades.width, shades.height,
                    player.x * settings.tile_size + offsetX,
                    playerY - Math.max(0, (me.levelCompletedTTL - 750) / (COMPLETED_TTL - 750)) * ctx.canvas.height,
                    settings.tile_size, settings.tile_size
                );
            });
        }

        if (this.messageImg) {
            images.waitFor(this.messageImg).done(function(img) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                var width = ctx.canvas.width * 0.4;
                var height = width / img.width * img.height;
                ctx.drawImage(
                    img,
                    0, 0,
                    img.width, img.height,
                    ctx.canvas.width / 2 - width / 2,
                    ctx.canvas.height / 2 - height / 2,
                    width, height
                );
            });
        }
    };
    LevelPlatform.prototype.init = function() {
        this.time = 0;

        this.leftEdge = 0;
        this.bottomEdge = 0;

        this.messageImg = null;
        this.messageImgTTL = 0;
        this.messageImgNext = null;

        this.levelCompletedTTL = -1;

        this.completed = false;
        entities.reset();

        this.defaultEntities.forEach(function(dE) {
            entities.add(dE.id, dE.x, dE.y);
        });
    };
    LevelPlatform.prototype.tick = function(delta, levelComplete, levelLib) {
        if (this.completed) {
            levelComplete();
        }

        this.time += delta;

        entities.tick(delta, this);

        if (this.messageImgTTL) {
            this.messageImgTTL -= delta;
            if (this.messageImgTTL <= 0) {
                this.completed = true;
                this.messageImgNext(levelLib);
            }
        }

        if (this.levelCompletedTTL !== -1) {
            this.levelCompletedTTL -= delta;
            if (this.levelCompletedTTL <= 0) {
                this.completed = true;
            }
        }

    };


    LevelPlatform.prototype.drownedInPool = function() {
        sound.play('drownInPool');
        this.messageImg = 'drowninpool';
        this.messageImgTTL = 1250;
        this.messageImgNext = function(levelLib) {
            levelLib.goTo(1);
        };
    };


    LevelPlatform.prototype.sitByPool = function() {
        if (this.levelCompletedTTL !== -1) {
            return;
        }
        this.messageImg = 'relaxbypool';
        this.messageImgTTL = COMPLETED_TTL;
        this.levelCompletedTTL = COMPLETED_TTL;
        this.messageImgNext = function(levelLib) {
            levelLib.goTo(1);
        };
    };


    LevelPlatform.prototype.complete = function() {
        this.completed = true;
    };

    return {
        get: function(data) {
            return new LevelPlatform(data.width, data.height, data.content, data.entities);
        }
    }

});
