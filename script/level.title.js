define('level.title', ['audio', 'images'], function(audio, images) {

    function LevelTitle(src, duration, sound) {
        this.sound = sound;
        this.duration = duration;
        this.ttl = duration;
        var me = this;
        images.waitFor(src).done(function(img) {
            var hw = img.width / 2;
            var hh = img.height / 2;
            me.draw = function(ctx) {
                ctx.drawImage(
                    img,
                    ctx.canvas.width / 2 - hw,
                    ctx.canvas.height / 2 - hh
                );
            };
        });
    }

    LevelTitle.prototype.draw = function(ctx) {};
    LevelTitle.prototype.init = function() {
        if (this.sound) {
            audio.play(this.sound);
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
