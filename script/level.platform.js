define('level.platform', ['keys'], function(keys) {

    function LevelPlatform(width, height) {
        var levelBuf = new ArrayBuffer((width * height) << 2);
        var levelView = new Uint16Array(levelBuf);
    }

    LevelPlatform.prototype.draw = function(ctx) {};
    LevelPlatform.prototype.init = function() {
    };
    LevelPlatform.prototype.tick = function(delta, levelComplete) {
        this.ttl -= delta;
        if (this.ttl <= 0) {
            levelComplete();
        }
    };

    return {
        get: function(width, height) {
            return new LevelPlatform(width, height);
        }
    }

});
