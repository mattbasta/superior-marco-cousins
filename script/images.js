define('images', ['promise'], function(promise) {
    'use strict';

    function loadImage(src) {
        return promise(function(resolve, reject) {
            var img = new Image();
            img.src = src;
            img.onload = function() {
                resolve(img);
            };
            img.onerror = reject;
        });
    }

    var images = {
        'bastacorp': loadImage('img/bastacorp.jpg'),
        'blueman': loadImage('img/blueman.png'),
        'greenman': loadImage('img/greenman.png'),
        'tiles': loadImage('img/tiles.png')
    };

    return {
        waitFor: function() {
            var deps = Array.prototype.slice.call(arguments, 0);
            return promise.when.apply(null, deps.map(function(dep) {
                return images[dep];
            }));
        },
        isLoaded: function(image) {
            return images[image].state() !== 'pending';
        },
        all: promise.when(Object.keys(images).map(function(x) {
            return images[x];
        }))
    };

});
