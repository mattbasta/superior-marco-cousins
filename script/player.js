define('player', ['images', 'keys', 'physics', 'settings'], function(images, keys, physics, settings) {

    var DIR_LEFT = 0;
    var DIR_RIGHT = 1;

    var SPRITE_TILE = 8;

    function Player() {
        this.height = 1;
        this.width = 1;

        this.jumpForce = 20;

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

        this.walking = false;
        this.isInContactWithFloor = false; // Player starts in the air.

        this.direction = DIR_RIGHT;
    };

    Player.prototype.draw = function(ctx, level, offsetY) {
        if (!this.img) {
            return;
        }

        var x = 4; // Default pose
        var now = Date.now();
        // If the player is walking, make them wiggle between states 5 and 6
        if (this.walking) {
            x += (now / 200 | 0) % 2 + 2;
        }

        ctx.drawImage(
            this.img,
            x * SPRITE_TILE, this.direction * SPRITE_TILE,
            SPRITE_TILE, SPRITE_TILE,
            this.x * settings.tile_size, (level.height - this.y - this.height) * settings.tile_size + offsetY,
            settings.tile_size, settings.tile_size
        );
    };

    Player.prototype.tick = function(delta, level) {
        if (keys.upArrow && this.isInContactWithFloor) {
            this.velY += this.jumpForce;
            this.isInContactWithFloor = false;
        }

        if (keys.leftArrow) {
            this.direction = DIR_LEFT;
            this.velX = -10;
            this.walking = true;
        } else if (keys.rightArrow) {
            this.direction = DIR_RIGHT;
            this.velX = 10;
            this.walking = true;
        } else {
            this.velX *= 0.8;
            this.walking = false;
        }

        physics.tick(this, delta, level);
    };

    return {
        get: function() {
            return new Player();
        }
    };
});
