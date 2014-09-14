define('level.menu', ['audio', 'images', 'keys'], function(audio, images, keys) {

    function LevelMenu(src, audio) {
        this.audio = audio;
        var me = this;
        this.img = null;
        images.waitFor(src).done(function(img) {
            me.img = img;
        });

        this.ended = false;
    }

    LevelMenu.prototype.draw = function(ctx) {
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
    LevelMenu.prototype.init = function() {
        this.ended = false;
        if (this.audio) {
            audio.playLoop(this.audio);
        }

        var me = this;
        keys.up.one('any', function() {
            me.ended = true;
        });
    };
    LevelMenu.prototype.tick = function(delta, levelComplete) {
        if (this.ended) {
            levelComplete();
        }
    };

    return {
        get: function(src, audio) {
            return new LevelMenu(src, audio);
        }
    }

});
