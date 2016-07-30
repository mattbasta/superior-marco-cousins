import * as base64 from '../base64';
import * as celestialbodies from '../celestialbodies';
import * as drawutils from '../drawutils';
import * as entities from '../entities';
import * as images from '../images';
import {Level} from './generic';
import * as levelLib from '../levels';
import * as settings from '../settings';
import * as sound from '../sound';
import * as tiles from '../tiles';


const DAY_LENGTH = 5 * 60 * 1000;  // 5 minutes
const COMPLETED_TTL = 3000;

const TILES_PER_ROW = settings.sprite_tile_row;
const TILES_RATIO = settings.tile_size / settings.sprite_tile_size;
const TILES_RATIO_INV = settings.sprite_tile_size / settings.tile_size;


function getTimeColor(time) {
    // One day-night cycle for every full oscillation of cosine
    let tod = Math.cos(time / DAY_LENGTH * 2 * Math.PI);
    // Normalize the result to [0,1]
    tod += 1;
    tod /= 2;

    const hue = 150 * tod - 100;  // [-100,50]
    const sat = 70 * tod + 20;  // [20,100]
    const lig = 33 * tod + 35;  // [35,68]
    return `hsl(${hue},${sat}%,${lig}%)`;
}


export class LevelPlatform extends Level {

    constructor(width, height, data, defaultEntities) {
        super();
        this.width = width;
        this.height = height;
        this.defaultEntities = defaultEntities;

        this.coolShades = images.get('coolshades');

        this.data = new Uint16Array(width * height);
        if (data !== null) {
            const convertedData = base64.base64DecToArr(data);
            for (let i = 0; i < convertedData.length - 1; i++) {
                this.data[i] = convertedData[i];
            }
        }

        this.tilemap = new drawutils.TileMap(
            width * settings.sprite_tile_size,
            height * settings.sprite_tile_size,
            images.get('tiles')
        );

        this.tilemap.render(img => {
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const tile = this.data[this.getLevelIndex(x, y)];
                    if (tile === tiles.TILE_AIR) continue;

                    const tileImg = tiles.IMAGES[tile];

                    this.tilemap.drawImage(
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
            }
        });

    }

    getLevelIndex(x, y) {
        return (this.height - y - 1) * this.width + x;
    }

    reset() {
        this.time = 0;

        this.leftEdge = 0;
        this.bottomEdge = 0;

        this.messageImg = null;
        this.messageImgTTL = 0;
        this.messageImgNext = null;

        this.levelCompletedTTL = -1;

        this.completed = false;
        entities.reset();

        this.defaultEntities.forEach((dE) => {
            entities.add(dE['id'], dE['x'], dE['y']);
        });
    }

    tick(delta, nextLevel) {

        if (this.completed) {
            nextLevel();
        }

        this.time += delta;

        entities.tick(delta, this);

        if (this.messageImgTTL !== 0) {
            this.messageImgTTL -= delta;
            if (this.messageImgTTL <= 0) {
                this.completed = true;
                this.messageImgNext();
            }
        }

        if (this.levelCompletedTTL !== -1) {
            this.levelCompletedTTL -= delta;
            if (this.levelCompletedTTL <= 0) {
                this.completed = true;
            }
        }
    }

    draw(ctx, drawUI) {
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

        const myHeight = this.tilemap.height;
        const theirHeight = ctx.canvas.height;

        // Calculate the new best offsets for the viewport
        const player = entities.registry[0];
        const bestX = (player.x + player.width / 2) - (ctx.canvas.width / settings.tile_size / 2);
        const bestY = (player.y + player.height / 2) - (ctx.canvas.height / settings.tile_size / 2);

        this.leftEdge = (this.leftEdge * 6 + bestX) / 7;
        this.bottomEdge = (this.bottomEdge * 6 + bestY) / 7;

        this.leftEdge = Math.max(Math.min(this.leftEdge, this.width - ctx.canvas.width / settings.tile_size), 0);
        this.bottomEdge = Math.max(Math.min(this.bottomEdge, this.height - 1 - ctx.canvas.height / settings.tile_size), 0);

        const terrainY = myHeight - theirHeight / TILES_RATIO - this.bottomEdge * settings.sprite_tile_size;
        this.tilemap.drawMapScaled(
            ctx,
            this.leftEdge * settings.sprite_tile_size,
            terrainY,
            TILES_RATIO
        );

        const offsetX = -1 * this.leftEdge * settings.tile_size;
        const offsetY = ctx.canvas.height - myHeight * TILES_RATIO + this.bottomEdge * settings.tile_size;
        entities.draw(ctx, this, offsetX, offsetY);

        if (this.levelCompletedTTL !== -1) {
            this.coolShades.draw((shades) => {
                const playerY = (this.height - player.y - player.height) * settings.tile_size + offsetY;
                ctx.drawImage(
                    shades,
                    0, 0,
                    shades.width, shades.height,
                    player.x * settings.tile_size + offsetX,
                    playerY - Math.max(0, (this.levelCompletedTTL - 750) / (COMPLETED_TTL - 750)) * ctx.canvas.height,
                    settings.tile_size, settings.tile_size
                );
            });
        }

        if (this.messageImg !== null) {
            this.messageImg.draw(img => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                const width = ctx.canvas.width * 0.4;
                const height = width / img.width * img.height;
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

        drawUI();
    }

    drownedInPool() {
        sound.play('drownInPool');
        this.messageImg = images.get('drowninpool');
        this.messageImgTTL = 1250;
        this.messageImgNext = () => levelLib.goTo(1);
    }

    fellInHole() {
        sound.play('fellInHole');
        this.messageImg = images.get('fellInHole');
        this.messageImgTTL = 1250;
        this.messageImgNext = () => levelLib.goToDisability();
    }

    sitByPool() {
        if (this.levelCompletedTTL !== -1) {
            return;
        }
        this.messageImg = images.get('relaxbypool');
        this.messageImgTTL = COMPLETED_TTL;
        this.levelCompletedTTL = COMPLETED_TTL;
        this.messageImgNext = () => levelLib.next();
    }

    complete() {
        this.completed = true;
    }


    get canPause() {
        return true;
    };

}
