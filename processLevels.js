var fs = require('fs');

var data = [];

fs.readdir('levels/', function(err, list) {
    if (err) process.exit(1);

    list.sort().forEach(function(file) {
        if (file === 'template.js.txt') return;

        var file = 'levels/' + file;

        var contents = fs.readFileSync(file);
        var parsed = JSON.parse(contents);

        var height = parsed.height;
        var width = parsed.width;
        var levelData = parsed.layers[0].data;

        var minLevelData = new ArrayBuffer(levelData.length);
        var ldView = new Uint8Array(minLevelData);
        for (var i = 0; i < levelData.length; i++) {
            ldView[i] = levelData[i];
        }

        data.push({
            height: height,
            width: width,
            content: (new Buffer(String.fromCharCode.apply(null, ldView))).toString('base64')
        });

    });

    var template = fs.readFileSync('levels/template.js.txt').toString();
    fs.writeFileSync('script/leveldata.js', template.replace('%s', JSON.stringify(data)));
});
