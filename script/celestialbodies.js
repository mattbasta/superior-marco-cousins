define('celestialbodies', ['drawutils'], function(drawutils) {

    var BODY_SIZE = 17; // px

    function getBody(color) {
        var body = drawutils.getBuffer(BODY_SIZE, BODY_SIZE);
        body.fillStyle = color;
        var dist;
        var half = BODY_SIZE / 2;
        for (var y = 0; y < BODY_SIZE; y++) {
            for (var x = 0; x < BODY_SIZE; x++) {
                if (Math.sqrt(Math.pow(x - half, 2) + Math.pow(y - half, 2)) <= half) {
                    body.fillRect(x, y, 1, 1);
                }
            }
        }
        return body.canvas;
    }

    return {
        sun: getBody('#fff'),
        moon: getBody('#ddd')
    };
});
