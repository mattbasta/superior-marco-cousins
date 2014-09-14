define('level.title', ['sound', 'images'], function(sound, images) {

    function LevelTitle(src, duration, sound) {
        this.sound = sound;
        this.duration = duration;
        this.ttl = duration;
        var me = this;
        this.img = null;
        images.waitFor(src).done(function(img) {
            me.img = img;
        });
    }

    LevelTitle.prototype.draw = function(ctx) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!this.img) return;

        var hw = this.img.width / 2;
        var hh = this.img.height / 2;
        ctx.drawImage(
            this.img,
            ctx.canvas.width / 2 - hw,
            ctx.canvas.height / 2 - hh
        );
    };
    LevelTitle.prototype.init = function() {
        if (this.sound) {
            sound.play(this.sound);
        }
        this.ttl = this.duration;
    };
    LevelTitle.prototype.tick = function(delta, levelComplete) {
        this.ttl -= delta;
        if (this.ttl <= 0) {
            levelComplete();
        }
    };

    return {
        get: function(src, duration, sound) {
            return new LevelTitle(src, duration, sound);
        }
    }

});
