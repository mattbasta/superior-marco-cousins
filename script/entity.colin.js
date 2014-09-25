define('entity.colin', ['images', 'physics', 'settings', 'sound'], function(images, physics, settings, sound) {

    var SPRITE_TILE = 8;
    var COLIN_JUMP_FORCE = 20;
    var COLIN_JUMP_TIMER_MIN = 2000;
    var COLIN_JUMP_TIMER_MAX = 4000;

    function ColinEntity(startX, startY) {
        this.image = null;
        var me = this;
        images.waitFor('entities').done(function(img) {
            me.image = img;
        });

        this.x = startX;
        this.y = startY;
        this.width = 1;
        this.height = 1;

        this.velX = 0;
        this.velY = 0;

        this.isInContactWithFloor = false;
        this.jumpTimer = 0;
        this.jumpDuration = COLIN_JUMP_TIMER_MIN;

        this.standers = [];
        this.standingOn = null;
    }

    ColinEntity.prototype.bounce = 0.4;
    ColinEntity.prototype.canBePushed = false;
    ColinEntity.prototype.canBeStoodOn = true;
    ColinEntity.prototype.canPush = true;
    ColinEntity.prototype.canStandOn = true;
    ColinEntity.prototype.jumps = false; // Not in the "traditional" sense.
    ColinEntity.prototype.type = 'colin';

    ColinEntity.prototype.calculateJumpTime = function() {
        this.jumpDuration = Math.random() * (COLIN_JUMP_TIMER_MAX - COLIN_JUMP_TIMER_MIN) + COLIN_JUMP_TIMER_MIN | 0;
    };

    ColinEntity.prototype.draw = function(ctx, level, offsetX, offsetY) {
        if (!this.image) {
            return;
        }

        var x = this.isInContactWithFloor ? Math.floor(Date.now() / 350) % 2 : 2;
        var locX = this.x * settings.tile_size;

        if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;

        ctx.drawImage(
            this.image,
            x * SPRITE_TILE, SPRITE_TILE,
            SPRITE_TILE, SPRITE_TILE,
            locX + offsetX, (level.height - this.y - this.height) * settings.tile_size + offsetY,
            settings.tile_size, settings.tile_size
        );
    };
    ColinEntity.prototype.tick = function(delta, level, registry, i) {
        physics.tick(this, delta, level, registry);

        this.jumpTimer += delta;
        if (this.jumpTimer > this.jumpDuration) {
            this.jumpTimer = 0;
            physics.doJump(this, COLIN_JUMP_FORCE);
            this.calculateJumpTime();
        }

        var player = registry[0];

        if (this.x > player.x + player.width) return;
        if (this.x + this.width < player.x) return;
        if (this.y > player.y + player.height) return;
        if (this.y + this.height < player.y) return;

        // registry.splice(i, 1);
        // player.melonCount++;
        // sound.play('melonCollect');
    };

    return {
        get: function(x, y) {
            return new ColinEntity(x, y);
        }
    };
});
