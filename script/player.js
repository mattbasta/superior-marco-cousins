define('player', ['images', 'keys', 'settings'], function(images, keys, settings) {

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
            x += (now / 400 | 0) % 2;
        }

        ctx.drawImage(
            this.img,
            x * SPRITE_TILE, this.direction * SPRITE_TILE,
            SPRITE_TILE, SPRITE_TILE,
            this.x * settings.tile_size, (level.height - this.y) * settings.tile_size + offsetY,
            settings.tile_size, settings.tile_size
        );
    };

    Player.prototype.tick = function(delta, level) {
        //
    };

    return {
        get: function() {
            return new Player();
        }
    };
});
