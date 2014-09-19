define('player', ['images', 'keys', 'physics', 'settings', 'sound'], function(images, keys, physics, settings, sound) {

    var DIR_LEFT = 0;
    var DIR_RIGHT = 1;

    var SPRITE_TILE = 8;

    function Player() {
        this.height = 1;
        this.width = 1;

        this.reset();

        var me = this;
        this.img = null;
        images.waitFor('blueman').done(function(img) {
            me.img = img;
        });
    }

    Player.prototype.reset = function() {
        this.x = 1;
        this.y = 5;

        this.velX = 0;
        this.velY = 0;

        this.jumpEnergy = settings.jump_energy;

        this.ducking = false;
        this.walking = false;
        this.isInContactWithFloor = false; // Player starts in the air.
        this.canDoubleJump = false;
        this.didDoubleJump = false;

        this.didSitInChair = false;

        this.direction = DIR_RIGHT;
    };

    Player.prototype.draw = function(ctx, level, offsetX, offsetY) {
        if (!this.img) {
            return;
        }

        var x = 4; // Default pose
        var now = Date.now();
        // If the player is walking, make them wiggle between states 5 and 6
        if (this.walking) {
            x += (now / 200 | 0) % 2 + 2;
        } else if (this.ducking) {
            x = 2;
        }
        if (this.velY < -10 && !this.ducking) {
            x = 0;
        }

        ctx.drawImage(
            this.img,
            x * SPRITE_TILE, this.direction * SPRITE_TILE,
            SPRITE_TILE, SPRITE_TILE,
            this.x * settings.tile_size + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
            settings.tile_size, settings.tile_size
        );
    };

    Player.prototype.tick = function(delta, level) {
        if (this.y < -1) {
            return;
        }
        if (this.didSitInChair) {
            level.sitByPool();
            return;
        }

        if (keys.upArrow && this.isInContactWithFloor) {
            this.velY += settings.jump_force * (this.ducking ? 0.75 : 1);
            this.isInContactWithFloor = false;
            this.jumpEnergy--;
            sound.play('jump');
            this.canDoubleJump = false;
        } else if (keys.upArrow && this.velY > 0 && !this.didDoubleJump && this.canDoubleJump) {
            this.velY += settings.jump_force_double;
            sound.play('doubleJump');
            this.didDoubleJump = true;
        } else if (!keys.upArrow && this.velY > 0) {
            this.canDoubleJump = true;
        } else if (keys.upArrow && this.jumpEnergy) {
            this.velY += settings.jump_energy_force * (delta / settings.jump_energy_force_ticks);

            this.jumpEnergy -= delta;
            this.jumpEnergy = Math.max(this.jumpEnergy, 0);
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
                if (Math.abs(this.velX) > 0.001) {
                    this.velX *= 0.65;
                } else {
                    this.velX = 0;
                }
                this.walking = false;
            }
        }

        physics.tick(this, delta, level);

        if (this.x > level.width - 10 && this.y < -1) {
            level.drownedInPool();
        }
    };

    Player.prototype.headBump = function() {
        sound.play('headBump');
    };

    Player.prototype.sitOnChair = function() {
        if (keys.downArrow) {
            sound.play('select');
            this.didSitInChair = true;
        }
    };

    return {
        get: function() {
            return new Player();
        }
    };
});
