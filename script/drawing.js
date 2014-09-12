define('drawing', [], function() {

    var can = document.querySelector('canvas');
    var ctx = can.getContext('2d');

    // Handle canvas sizing.
    var width = can.width;
    var height = can.height;

    function draw() {}


    function onresize() {
        can.width = width = document.body.clientWidth;
        can.height = height = document.body.clientHeight;
    }
    onresize();
    window.addEventListener('resize', onresize);

    return {
        draw: draw
    };
});
