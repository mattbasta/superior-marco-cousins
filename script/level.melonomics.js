define('level.melonomics', ['audio', 'entities', 'images', 'keys', 'sound'], function(audio, entities, images, keys, sound) {

    var taxes = [
        {
            name: 'Melon Tax',
            applies: function() {return true;},
            mod: function(s) {return s - 2;},
        },
        {
            name: 'Seed Tax',
            applies: function(s) {return s > 0;},
            mod: function(s) {
                return s * 0.8 | 0;
            },
        },
        {
            name: 'Melon Inflation',
            applies: function(s) {return true;},
            mod: function(s) {
                return s - (Math.abs(s) * 0.2 + 1 | 0);
            },
        },
        {
            name: 'Inter-Melon Commerce Tax',
            applies: function(s) {return s > 10;},
            mod: function(s) {
                return s - 1;
            },
        },
        {
            name: 'Even Tax',
            applies: function(s) {return s % 2 === 0;},
            mod: function(s) {
                return s - 1;
            },
        },
    ];

    function LevelMelonomics() {
        var me = this;
        this.img = null;
        images.waitFor('melonfinance').done(function(img) {
            me.img = img;
        });

        this.ticks = 0;
    }

    LevelMelonomics.prototype.draw = function(ctx) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!this.img) return;

        var headerWidth = ctx.canvas.width * 0.4;
        ctx.drawImage(
            this.img,
            0, 0,
            this.img.width, this.img.height,
            ctx.canvas.width / 2 - headerWidth / 2,
            ctx.canvas.height * 0.1,
            headerWidth,
            headerWidth / this.img.width * this.img.height
        );

        var melons = this.startMelons;

        var me = this;
        var items = this.ticks / 300 | 0;

        var y = ctx.canvas.height * 0.1 + headerWidth / this.img.width * this.img.height + 50;
        ctx.font = '40px VT323';
        ctx.fillStyle = 'white';

        if (items) {
            items--;
            ctx.fillText('Net Melons', ctx.canvas.width * 0.3, y);
            ctx.fillText(melons, ctx.canvas.width * 0.65, y);
            y += 42;
        }

        taxes.forEach(function(tax) {
            if (!tax.applies(melons)) return;
            if (!items) return;
            items--;
            var afterTax = tax.mod(melons);
            var diff = afterTax - melons;
            ctx.fillText(tax.name, ctx.canvas.width * 0.3, y);
            ctx.fillText(diff.toString(), ctx.canvas.width * 0.65, y);
            y += 42;
            melons = afterTax;
        });

        if (items) {
            y += 40;
            items--;
            ctx.fillText('Gross Melons', ctx.canvas.width * 0.3, y);
            ctx.fillText(melons, ctx.canvas.width * 0.65, y);
        }

        if (items) {
            items--;
            y += 40;
            ctx.fillText('PRESS TO CONTINUE', ctx.canvas.width * 0.3, y);
        }

    };
    LevelMelonomics.prototype.init = function() {
        audio.playLoop('hero');
        this.ticks = 0;
        var melons = this.startMelons = entities.registry[0].melonCount;
        taxes.forEach(function(tax) {
            if (!tax.applies(melons)) return;
            melons = tax.mod(melons);
        });
        this.finalMelons = melons;

        var me = this;
        keys.down.one('any', function() {
            sound.play('select');
        });
        keys.up.one('any', function() {
            me.ended = true;
        });
    };
    LevelMelonomics.prototype.tick = function(delta, levelComplete) {
        this.ticks += delta;
        if (this.ended) {
            levelComplete();
            entities.registry[0].melonCount = this.finalMelons;
        }
    };

    return {
        get: function() {
            return new LevelMelonomics();
        }
    }

});
