import 'dart:html';
import 'dart:math' as Math;

import 'entities.dart' as entities;
import 'level.generic.dart';
import 'settings.dart' as settings;
import 'tiles.dart' as tiles;


const DELTA_RATIO = 20 / 1000;

const GRAVITY = 50;
const MAX_SPEED = 50.0;


abstract class Entity {

    double x;
    double y;
    double velX = 0.0;
    double velY = 0.0;

    bool canDoubleJump = false;
    bool didDoubleJump = false;
    int jumpEnergy;

    int height = 1;
    int width = 1;

    bool bouncing = false;
    bool isInContactWithFloor = false;


    double bounce() => 0.0;
    bool canBePushed() => false;
    bool canBeStoodOn() => false;
    bool canPush() => false;
    bool canStandOn() => false;
    bool complexJumps() => false;

    String type();

    Set<Entity> standers;
    Entity standingOn = null;

    Entity() {
        this.standers = new Set<Entity>();
        this.reset();
    }

    void reset();

    void draw(CanvasRenderingContext2D ctx, Level level, int offsetX, int offsetY);

    bool tick(int delta, Level level);


    void hitGround(double y) {
        if (this.bounce() != 0.0 && this.velY < -1 && this.standers.length == 0) {
            this.velY = -1 * this.bounce() * this.velY;
        } else {
            this.velY = 0.0;
        }
        this.y = y;
        this.isInContactWithFloor = true;

        if (this.complexJumps()) {
            this.canDoubleJump = false;
            this.didDoubleJump = false;
            this.jumpEnergy = settings.jump_energy;
        }
    }

    void testCollisionDown(Level level, double origY) {
        int index;
        int tile;

        if (this.y < 0) {
            return;
        }

        int start = Math.max(this.x.floor(), 0);
        int end = Math.min((this.x + this.width).ceil(), level.width);

        bool crossedOne = this.y.floor() != origY.floor();
        bool testForHalf = this.y.ceil() - this.y > 0.5;

        // Test for solid blocks
        if (crossedOne) {
            for (var x = start; x < end; x++) {
                index = level.getLevelIndex(x, this.y.ceil());
                tile = level.data[index];
                if (tiles.SOLID.contains(tile) || tiles.CLOUD.contains(tile)) {
                    this.hitGround(this.y.ceil().toDouble());
                    return;
                }
            }
            if (!testForHalf) {
                this.isInContactWithFloor = false;
            }
        }
        // Test for half-solid blocks
        if (testForHalf) {
            for (var x = start; x < end; x++) {
                index = level.getLevelIndex(x, this.y.ceil());
                tile = level.data[index];
                if (tiles.HALF_SOLID.contains(tile)) {
                    if (tile == tiles.TILE_CHAIR_LEFT || tile == tiles.TILE_CHAIR_RIGHT) {
                        this.sitOnChair();
                    }

                    this.hitGround(this.y.ceil() - 0.5);
                    return;
                }
            }
            this.isInContactWithFloor = false;
        }
    }

    int nearestLadder(Level level) {
        int index;
        int tile;
        for (var y = Math.max((this.y + 1).floor(), 0);
             y < Math.min((this.y + this.height).ceil(), level.height - 1);
             y++) {

            int x = (this.x + 0.5).floor();
            index = level.getLevelIndex(x, y);
            tile = level.data[index];
            if (tile == tiles.TILE_LADDER) {
                return x;
            }
        }
        return -1;
    }

    bool testHitUp(Level level) {
        int height = this.height;
        this.standers.forEach((e) {
            height = Math.max(height, e.height + this.height);
        });

        int index;
        int tile;
        for (var x = Math.max(this.x.floor(), 0);
             x < Math.min((this.x + this.width).ceil(), level.width - 1);
             x++) {

            index = level.getLevelIndex(x, this.y.floor() + height + 1);
            tile = level.data[index];
            if (tiles.SOLID.contains(tile)) {
                return true;
            }
        }
        return false;
    }

    void testCollisionUp(Level level) {
        if (this.testHitUp(level)) {
            this.headBump();
        }
    }

    void testCollisionSide(Level level) {
        int index;
        int tile;
        for (var y = Math.max(this.y.floor() + 1, 0);
             y < Math.min((this.y + this.height + 1).ceil(), level.height - 1);
             y++) {

            if (this.velX < 1) {
                // On left
                index = level.getLevelIndex(this.x.ceil() - 1, y);
                tile = level.data[index];
                if (tiles.SOLID.contains(tile)) {
                    if (this.bounce() != 0.0) {
                        this.velX = -1 * this.bounce() * this.velX;
                    } else {
                        this.velX = 0.0;
                    }
                    this.x = this.x.ceil().toDouble();
                    return;
                }
            } else if (this.velX > 1) {
                // On right
                index = level.getLevelIndex((this.x + this.width).floor(), y);
                tile = level.data[index];
                if (tiles.SOLID.contains(tile)) {
                    if (this.bounce() != 0.0) {
                        this.velX = -1 * this.bounce() * this.velX;
                    } else {
                        this.velX = 0.0;
                    }
                    this.x = this.x.floor().toDouble();
                    return;
                }
            }
        }
    }

    void hitTestEntities(Function cb) {
        entities.registry.where((e) => e != this)
                         .where((e) {
            return !(this.x >= e.x + e.width ||
                     this.y >= e.y + e.height ||
                     this.x + this.width <= e.x ||
                     this.y + this.height <= e.y);
        }).forEach(cb);
    }

    void updateUpwardsChain() {
        if (this.standers.isNotEmpty) {
            double newY = this.y + this.height;
            this.standers.forEach((e) {
                e.y = newY;
                e.updateUpwardsChain();
            });
        }
    }

    void testFallingDown() {
        if (this.standingOn != null) {
            // If the entity is standing on someone, check the state of
            // that.
            var estStandingY = this.y - this.standingOn.height;
            if (estStandingY > this.standingOn.y ||
                       this.x + this.width < this.standingOn.x ||
                       this.x > this.standingOn.x + this.standingOn.width) {
                // If we're no longer standing on the other entity, un-stand
                // us from it.
                this.standingOn.standers.remove(this);
                this.standingOn = null;
            } else if (estStandingY < this.standingOn.y) {
                // If the entity would be falling through the entity it is
                // on, terminate the fall.
                this.hitGround(this.standingOn.y + this.standingOn.height);
            }

        }
        if (this.canStandOn() && this.standingOn == null) {
            // If we can stand on someone (and we're not already), check
            // who we can stand on.
            this.hitTestEntities((e) {
                if (!e.canBeStoodOn()) return;
                if (e.standingOn == this) return;
                e.standers.add(this);
                this.standingOn = e;
                this.hitGround(e.y + e.height);
                if (e.velY) {
                    this.velY += e.velY;
                }
            });
        }
    }

    void jump(double velY) {
        this.velY += velY;
        if (this.standingOn != null) {
            this.standingOn.standers.remove(this);
            this.standingOn = null;
        }
    }

    void calcPhysics(int delta, Level level) {
        double origY = this.y;
        double origX = this.x;

        this.x += this.velX * DELTA_RATIO;
        if (this.velX != 0.0) {
            this.testCollisionSide(level);
            if (this.canBePushed() || this.canPush()) {
                this.hitTestEntities((ent) {
                    if (ent.canPush() && this.canBePushed()) {
                        this.x = origX;
                    } else if (ent.canBePushed() && this.canPush()) {
                        // TODO: Play with this.
                        ent.velX = ent.velX * DELTA_RATIO;
                    }

                });
            }
        }

        this.y += this.velY * DELTA_RATIO;
        if (this.velY < 0) {
            this.testCollisionDown(level, origY);
            this.testFallingDown();

        } else if (this.velY > 0) {
            this.testCollisionUp(level);
            this.updateUpwardsChain();
        } else {
            this.testFallingDown();
        }

        this.x = Math.max(this.x, 0);
        this.x = Math.min(this.x, level.width - 1);

        if (this.velY != 0.0 && this.isInContactWithFloor) {
            this.isInContactWithFloor = false;
        }

        this.velY -= GRAVITY * DELTA_RATIO;
        if (this.velY > MAX_SPEED) this.velY = MAX_SPEED;
        if (-1 * this.velY > MAX_SPEED) this.velY = -1 * MAX_SPEED;
        else if (-1 * this.velY > MAX_SPEED) this.velY = -1 * MAX_SPEED;
    }

    void sitOnChair() {
        // noop
    }

    void headBump() {
        this.velY = 0.0;
        this.y = (this.y.floor() - this.height + 1).toDouble();
        this.jumpEnergy = 0;
    }

}
