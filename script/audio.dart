import 'dart:js';


Map<String, JsObject> loops = {};
String playingLoop = null;

void _loadLoop(String name, String uri) {
    if (loops.containsKey(name)) {
        return;
    }

    var loop = new JsObject(
        context['buzz']['sound'],
        [
            uri,
            new JsObject.jsify({'formats': ['mp3'], 'preload': true, 'autoload': true, 'loop': true}),
        ]
    );
    loops[name] = loop;
}

void init() {
    _loadLoop('title', 'audio/title');
    _loadLoop('hero', 'audio/hero');
}

void playLoop(String name) {
    if (playingLoop == name) {
        return;
    }

    if (playingLoop == null) {
        loops[name]..callMethod('play')
                   ..callMethod('setVolume', [0])
                   ..callMethod('fadeTo', [10, 1000]);
        playingLoop = name;
        return;
    }

    loops[playingLoop].callMethod('fadeOut', [2000, () {
        playingLoop = name;
        loops[name]..callMethod('play')
                   ..callMethod('setVolume', [0])
                   ..callMethod('fadeTo', [20, 2000]);
    }]);
}

void stop() {
    if (playingLoop == null) {
        return;
    }
    loops[playingLoop].callMethod('stop');
    playingLoop = null;
}
