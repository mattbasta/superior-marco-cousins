define('main', ['images', 'timing'], function(images, timing) {
    images.all.done(function() {
        timing.start();
    });
});
