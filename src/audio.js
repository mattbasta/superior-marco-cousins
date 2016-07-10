import 'buzz';


const loops = new Map();
let playingLoop = null;

function loadLoop(name, uri) {
    if (loops.has(name)) {
        return;
    }

    const loop = new window.buzz.sound(uri, {
        formats: ['mp3'],
        preload: true,
        autoload: true,
        loop: true,
    });
    loops.set(name, loop);
}


export function init() {
    loadLoop('title', 'audio/title');
    loadLoop('hero', 'audio/hero');
};

export function playLoop(name) {
    if (playingLoop === name) {
        return;
    }

    if (playingLoop === null) {
        playingLoop = name;
        const loop = loops.get(name);
        loop.play();
        loop.setVolume(0);
        loop.fadeTo(10, 1000);
        return;
    }

    loops.get(playingLoop).fadeOut(2000, () => {
        playingLoop = name;
        const loop = loops.get(name);
        loop.play();
        loop.setVolume(0);
        loop.fadeTo(20, 2000);
    });
};

export function stop() {
    if (playingLoop === null) {
        return;
    }
    loops.get(playingLoop).stop();
    playingLoop = null;
};
