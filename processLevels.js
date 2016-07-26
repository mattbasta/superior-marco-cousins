var fs = require('fs');

var data = [];


function getLevelData(levelData) {
    var minLevelData = new ArrayBuffer(levelData.length);
    var ldView = new Uint8Array(minLevelData);
    for (var i = 0; i < levelData.length; i++) {
        ldView[i] = levelData[i];
    }
    return (new Buffer(String.fromCharCode.apply(null, ldView))).toString('base64');
}

function getEntityData(objectLayer) {
    return objectLayer.objects.map(function(obj) {
        return {
            id: obj.gid - 101,
            x: Math.round(obj.x / 8),
            y: objectLayer.height - Math.round(obj.y / 8),
        };
    });
}


fs.readdir('levels/', function(err, list) {
    if (err) process.exit(1);

    list.sort().forEach(function(file) {
        if (file === 'template.js.txt') return;

        var file = 'levels/' + file;

        var contents = fs.readFileSync(file);
        var parsed = JSON.parse(contents);

        var height = parsed.height + 1;
        var width = parsed.width;

        data.push({
            height: height,
            width: width,
            content: getLevelData(parsed.layers[0].data),
            entities: getEntityData(parsed.layers[1])
        });

    });

    var template = fs.readFileSync('levels/template.js.txt').toString();
    fs.writeFileSync('src/leveldata.js', template.replace('%s', JSON.stringify(data)));
});
