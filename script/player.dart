import 'dart:html';
import 'dart:math' as Math;

import 'entities.dart' as entities;
import 'entity.generic.dart';
import 'entity.melon.dart';
import 'images.dart' as images;
import 'keys.dart' as keys;
import 'level.generic.dart';
import 'settings.dart' as settings;
import 'sound.dart' as sound;


const DIR_LEFT = 0;
const DIR_RIGHT = 1;
const SPRITE_TILE = 8;

class Player extends Entity {

    images.Drawable image;

    bool ducking = false;
    bool walking = false;
    bool didSitInChair = false;
    bool shouldThrowMelon = false;

    int direction;
    int melonCount = 0;

    bool canBePushed() => true;
    bool canBeStoodOn() => true;
    bool canPush() => true;
    bool canStandOn() => true;
    String type() => 'player';
    bool complexJumps() => true;

    Player() : super() {
        image = images.get('blueman');

        keys.down.on(81, (e) { // Q
            this.shouldThrowMelon = true;
        });
    }

    void reset() {
        this.x = 1.0;
        this.y = 5.0;
        this.ducking = false;
        this.walking = false;
        this.didSitInChair = false;
        this.shouldThrowMelon = false;

        this.direction = DIR_RIGHT;
    }

    void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY) {
        this.image.draw((img) {
            var x = 4; // Default pose
            var now = new DateTime.now().millisecondsSinceEpoch;
            // If the player is walking, make them wiggle between states 5 and 6
            if (this.walking) {
                x += (now / 200).floor() % 2 + 1;
            } else if (this.ducking) {
                x = 2;
            }
            if (this.velY < -10 && !this.ducking) {
                x = 0;
            }

            ctx.drawImageScaledFromSource(
                img,
                x * SPRITE_TILE, this.direction * SPRITE_TILE,
                SPRITE_TILE, SPRITE_TILE,
                this.x * settings.tile_size + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
                settings.tile_size, settings.tile_size
            );
        });
    }

    bool tick(int delta, Level level) {
        if (this.y < -1) {
            return true;
        }
        if (this.didSitInChair) {
            level.sitByPool();
            return true;
        }

        int nearestLadder = this.nearestLadder(level);
        bool onLadder = nearestLadder != -1;
        bool jumpCondition = keys.upArrow && !this.testHitUp(level) && !onLadder;

        if (jumpCondition && this.isInContactWithFloor) {
            this.jump(settings.jump_force * (this.ducking ? 0.75 : 1));
            this.isInContactWithFloor = false;
            this.jumpEnergy--;
            sound.play('jump');
            this.canDoubleJump = false;

        } else if (keys.upArrow && !this.didDoubleJump && this.canDoubleJump) {
            if (this.velY < -5) {
                this.jump(settings.jump_force_double_falling);
            } else {
                this.jump(settings.jump_force_double);
            }
            sound.play('doubleJump');
            this.didDoubleJump = true;

        } else if (!keys.upArrow) {
            this.canDoubleJump = true;

        } else if (jumpCondition && this.jumpEnergy != 0) {
            this.velY += settings.jump_energy_force * (delta / settings.jump_energy_force_ticks);

            this.jumpEnergy -= delta;
            this.jumpEnergy = Math.max(this.jumpEnergy, 0);

        } else if (keys.upArrow && onLadder) {
            this.velY = settings.ladder_velocity;
            this.jumpEnergy = settings.jump_energy;
            this.canDoubleJump = false;
            this.didDoubleJump = false;
            this.x = (nearestLadder.toDouble() + this.x * 5) / 6;

        }

        if (!keys.upArrow && !this.isInContactWithFloor) {
            this.jumpEnergy = 0;
        }

        if (keys.downArrow) {
            this.velX *= 0.6;
            this.walking = false;
            this.ducking = true;
        }

        if (!keys.downArrow || !this.isInContactWithFloor) {
            this.ducking = keys.downArrow;
            if (keys.leftArrow) {
                this.direction = DIR_LEFT;
                this.velX = -8.5;
                this.walking = !keys.downArrow;
            } else if (keys.rightArrow) {
                this.direction = DIR_RIGHT;
                this.velX = 8.5;
                this.walking = !keys.downArrow;
            } else {
                if (this.velX.abs() > 0.001) {
                    this.velX *= 0.65;
                } else {
                    this.velX = 0.0;
                }
                this.walking = false;
            }
        }

        this.calcPhysics(delta, level);

        if (this.x > level.width - 10 && this.y < -1) {
            level.drownedInPool();
        } else if (this.y < -1) {
            level.fellInHole();
        }

        if (this.shouldThrowMelon) {
            this.shouldThrowMelon = false;
            this.throwMelon();
        }

        return true;
    }

    void sitOnChair() {
        if (keys.downArrow) {
            sound.play('select');
            this.didSitInChair = true;
        }
    }

    void headBump() {
        sound.play('headBump');
        super.headBump();
    }

    void throwMelon() {
        if (this.melonCount <= 0) return;
        this.melonCount--;

        sound.play('throwMelon');
        var melon = new MelonEntity(this.x.floor(), this.y.floor());
        melon.bouncing = true;
        melon.velY = this.velY + settings.throw_force_y;
        melon.velX = settings.throw_force_x * (this.direction == DIR_LEFT ? -1 : 1);
        entities.registry.add(melon);
    }

}
