var fs = require('fs');
var path = require('path');

const data = [];


function getLevelData(levelData) {
    const decoded = Buffer.from(levelData, 'base64');
    const bytes = new Uint8Array(decoded);

    const tiles = new Uint32Array(bytes.length / 4);
    for (let i = 0; i < bytes.length; i += 4) {
        tiles[i / 4] = bytes[i];
    }

    return (new Buffer(String.fromCharCode.apply(null, tiles))).toString('base64');
    // return tiles.toString('base64');
}

function getEntityData(objectLayer) {
    return objectLayer.objects.map(({gid, x, y}) => ({
        id: gid - 101,
        x: Math.round(x / 8),
        y: objectLayer.height - Math.round(y / 8),
    }));
}


fs.readdir('levels/', function(err, list) {
    if (err) process.exit(1);

    list.sort().forEach(function(filename) {
        if (filename === 'template.js.txt') return;

        const file = path.resolve('levels', filename);

        const contents = fs.readFileSync(file);
        const parsed = JSON.parse(contents);

        const height = parsed.height + 1;
        const width = parsed.width;

        data.push({
            height: height,
            width: width,
            content: getLevelData(parsed.layers[0].data),
            entities: getEntityData(parsed.layers[1])
        });

        console.log(`Built ${file}`);
    });

    var template = fs.readFileSync('levels/template.js.txt').toString();
    fs.writeFileSync('src/leveldata.js', template.replace('%s', JSON.stringify(data)));
});
