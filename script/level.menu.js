define('level.menu', ['audio', 'images'], function(audio, images) {

    function LevelMenu(src, sound) {
        this.sound = sound;
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

    LevelMenu.prototype.draw = function(ctx) {};
    LevelMenu.prototype.init = function() {
        if (this.sound) {
            audio.play(this.sound);
        }
    };
    LevelMenu.prototype.tick = function(delta, levelComplete) {};

    return {
        get: function(src, sound) {
            return new LevelMenu(src, sound);
        }
    }

});
