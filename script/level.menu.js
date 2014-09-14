define('level.menu', ['audio', 'images', 'keys'], function(audio, images, keys) {

    function LevelMenu(src, audio) {
        this.audio = audio;
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

        this.ended = false;
    }

    LevelMenu.prototype.draw = function(ctx) {};
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
