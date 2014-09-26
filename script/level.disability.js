define('level.disability', ['audio', 'images', 'keys', 'sound'], function(audio, images, keys, sound) {

    var DENIED_TEXT = 'APPLICATION DENIED';

    function LevelDisability() {
        var me = this;
        this.img = null;
        images.waitFor('disabilityBenefits').done(function(img) {
            me.img = img;
        });

        this.enteredText = '';
        this.active = false;
        this.entered = -1;

        var me = this;
        keys.up.on('any', function(e) {
            if (!me.active || me.entered > 0) return;

            e.preventDefault();

            sound.play('keypress');
            // Handle Enter
            if (e.keyCode === 13) {
                if (!me.enteredText) return;
                me.entered = 1500;
                return;
            }
            // Handle backspace
            if (e.keyCode === 8) {
                if (!me.enteredText) return;
                me.enteredText = me.enteredText.substr(0, me.enteredText.length - 1);
                return;
            }
            // Handle everything else
            if (me.enteredText.length < 10) {
                me.enteredText += String.fromCharCode(e.keyCode);
            }
        });
    }

    LevelDisability.prototype.draw = function(ctx) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!this.img) return;

        var headerWidth = ctx.canvas.width * 0.4;
        var headerHeight = headerWidth / this.img.width * this.img.height;
        ctx.drawImage(
            this.img,
            0, 0,
            this.img.width, this.img.height,
            ctx.canvas.width / 2 - headerWidth / 2,
            ctx.canvas.height / 2 - headerHeight / 2,
            headerWidth, headerHeight
        );

        var measured;

        if (this.entered > -1) {
            ctx.fillStyle = '#f00';
            measured = ctx.measureText(DENIED_TEXT);
            ctx.fillText(
                DENIED_TEXT,
                ctx.canvas.width / 2 - measured.width / 2,
                ctx.canvas.height / 2 + headerHeight / 2 - 15
            );
            return;
        }

        if (this.enteredText) {
            ctx.fillStyle = '#fff';
            measured = ctx.measureText(this.enteredText);
            ctx.fillText(
                this.enteredText,
                ctx.canvas.width / 2 - measured.width / 2,
                ctx.canvas.height / 2 + headerHeight / 2 - 15
            );
        }
    };
    LevelDisability.prototype.init = function() {
        audio.playLoop('hero');
        this.active = true;
        this.entered = -1;
        this.enteredText = '';
    };
    LevelDisability.prototype.tick = function(delta, levelComplete) {
        if (!this.active) {
            levelComplete();
        }
        if (this.entered !== -1) {
            this.entered -= delta;
            if (this.entered < 0) {
                this.active = false;
            }
        }
    };

    return {
        get: function() {
            return new LevelDisability();
        }
    }

});
