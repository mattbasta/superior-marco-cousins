import 'dart:html';
import 'dart:math' as Math;
import 'dart:typed_data';

import 'base64.dart' as base64;
import 'celestialbodies.dart' as celestialbodies;
import 'drawutils.dart' as drawutils;
import 'entities.dart' as entities;
import 'images.dart' as images;
import 'level.generic.dart';
import 'levels.dart' as levelLib;
import 'settings.dart' as settings;
import 'sound.dart' as sound;
import 'tiles.dart' as tiles;


const DAY_LENGTH = 5 * 60 * 1000;  // 5 minutes
const COMPLETED_TTL = 3000;

var TILES_PER_ROW = settings.sprite_tile_row;
var TILES_RATIO = settings.tile_size / settings.sprite_tile_size;
var TILES_RATIO_INV = settings.sprite_tile_size / settings.tile_size;


String getTimeColor(int time) {

    // One day-night cycle for every full oscillation of cosine
    var tod = Math.cos(time / DAY_LENGTH * 2 * Math.PI);
    // Normalize the result to [0,1]
    tod += 1;
    tod /= 2;

    var hue = 150 * tod - 100;  // [-100,50]
    var sat = 70 * tod + 20;  // [20,100]
    var lig = 33 * tod + 35;  // [35,68]
    return 'hsl(' + hue.toString() + ',' + sat.toString() + '%,' + lig.toString() + '%)';
}


class LevelPlatform extends Level {

    int width;
    int height;

    List defaultEntities;

    int time;
    num leftEdge;
    num bottomEdge;

    String messageImg;
    int messageImgTTL;
    Function messageImgNext;

    int levelCompletedTTL;
    bool completed;

    CanvasRenderingContext2D ctx;
    Uint16List data;


    LevelPlatform(int width, int height, Object data, List defaultEntities) {
        this.width = width;
        this.height = height;
        this.defaultEntities = defaultEntities;

        this.ctx = drawutils.getBuffer(width * settings.sprite_tile_size, height * settings.sprite_tile_size);

        this.data = new Uint16List(width * height);
        if (data != null) {
            var convertedData = base64.base64DecToArr(data);
            for (var i = 0; i < convertedData.length - 1; i++) {
                this.data[i] = convertedData[i];
            }
        }

        images.get('tiles').drawEventually((img) {
            var tile;
            var tileImg;
            var platform = -1;
            var lastPlatform = 5;
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    tile = this.data[this.getLevelIndex(x, y)];
                    if (tile == tiles.TILE_AIR) continue;

                    tileImg = tiles.IMAGES[tile];

                    ctx.drawImageScaledFromSource(
                        img,
                        tileImg % TILES_PER_ROW * settings.sprite_tile_size,
                        (tileImg / TILES_PER_ROW).floor() * settings.sprite_tile_size,
                        settings.sprite_tile_size,
                        settings.sprite_tile_size,
                        x * settings.sprite_tile_size,
                        (height - y) * settings.sprite_tile_size,
                        settings.sprite_tile_size,
                        settings.sprite_tile_size
                    );
                }

                if (x % 6 == 0) {
                    platform = -1;
                } else if (x % 6 == 1) {
                    platform = ((new Math.Random().nextDouble() * 2 - 1) * 6).floor() + lastPlatform;
                    platform = Math.max(platform, 5);
                    lastPlatform = platform;
                }
            }
        });
    }

    int getLevelIndex(int x, int y) {
        return (this.height - y - 1) * this.width + x;
    }

    void reset() {
        this.time = 0;

        this.leftEdge = 0;
        this.bottomEdge = 0;

        this.messageImg = null;
        this.messageImgTTL = 0;
        this.messageImgNext = null;

        this.levelCompletedTTL = -1;

        this.completed = false;
        entities.reset();

        this.defaultEntities.forEach((dE) {
            entities.add(dE['id'], dE['x'], dE['y']);
        });
    }

    void tick(int delta, Function nextLevel) {

        if (this.completed) {
            nextLevel();
        }

        this.time += delta;

        entities.tick(delta, this);

        if (this.messageImgTTL != 0) {
            this.messageImgTTL -= delta;
            if (this.messageImgTTL <= 0) {
                this.completed = true;
                this.messageImgNext();
            }
        }

        if (this.levelCompletedTTL != -1) {
            this.levelCompletedTTL -= delta;
            if (this.levelCompletedTTL <= 0) {
                this.completed = true;
            }
        }
    }

    void draw(CanvasRenderingContext2D ctx, Function drawUI) {
        // Clear the frame with the sky color.
        ctx.fillStyle = getTimeColor(this.time);
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw the sun/moon
        ctx.drawImageScaledFromSource(
            celestialbodies.sun,
            0, 0,
            celestialbodies.sun.width, celestialbodies.sun.height,
            30, -1 * (ctx.canvas.height / 2) * Math.cos(this.time / DAY_LENGTH * 2 * Math.PI) + ctx.canvas.height,
            60, 60
        );
        ctx.drawImageScaledFromSource(
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
        ctx.drawImageScaledFromSource(
            this.ctx.canvas,
            this.leftEdge * settings.sprite_tile_size, terrainY,
            ctx.canvas.width / TILES_RATIO, (ctx.canvas.height + 1) / TILES_RATIO,
            0, 0,
            ctx.canvas.width, ctx.canvas.height + TILES_RATIO_INV
        );

        var offsetX = -1 * this.leftEdge * settings.tile_size;
        var offsetY = ctx.canvas.height - myHeight * TILES_RATIO + this.bottomEdge * settings.tile_size;
        entities.draw(ctx, this, offsetX, offsetY);

        if (this.levelCompletedTTL != -1) {
            var me = this;
            images.get('coolshades').draw((shades) {
                var playerY = (me.height - player.y - player.height) * settings.tile_size + offsetY;
                ctx.drawImageScaledFromSource(
                    shades,
                    0, 0,
                    shades.width, shades.height,
                    player.x * settings.tile_size + offsetX,
                    playerY - Math.max(0, (me.levelCompletedTTL - 750) / (COMPLETED_TTL - 750)) * ctx.canvas.height,
                    settings.tile_size, settings.tile_size
                );
            });
        }

        if (this.messageImg != null) {
            images.get(this.messageImg).draw((img) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                var width = ctx.canvas.width * 0.4;
                var height = width / img.width * img.height;
                ctx.drawImageScaledFromSource(
                    img,
                    0, 0,
                    img.width, img.height,
                    ctx.canvas.width / 2 - width / 2,
                    ctx.canvas.height / 2 - height / 2,
                    width, height
                );
            });
        }

        drawUI();
    }

    void drownedInPool() {
        sound.play('drownInPool');
        this.messageImg = 'drowninpool';
        this.messageImgTTL = 1250;
        this.messageImgNext = () {
            levelLib.goTo(1);
        };
    }

    void fellInHole() {
        sound.play('fellInHole');
        this.messageImg = 'fellInHole';
        this.messageImgTTL = 1250;
        this.messageImgNext = () {
            levelLib.goToDisability();
        };
    }

    void sitByPool() {
        if (this.levelCompletedTTL != -1) {
            return;
        }
        this.messageImg = 'relaxbypool';
        this.messageImgTTL = COMPLETED_TTL;
        this.levelCompletedTTL = COMPLETED_TTL;
        this.messageImgNext = () {
            levelLib.next();
        };
    }

    void complete() {
        this.completed = true;
    }
}
