import * as buzz from 'buzz';

import {set, get} from './storage';


const loops = new Map();
let playingLoop = null;

let muted = get('muted');

function loadLoop(name, uri) {
    if (loops.has(name)) {
        return;
    }

    const loop = new buzz.sound(uri, {
        formats: ['mp3'],
        preload: true,
        autoload: true,
        loop: true,
    });
    loops.set(name, loop);

    if (muted) {
        loop.toggleMute();
    }
}

loadLoop('title', 'audio/title');
loadLoop('hero', 'audio/hero');

export const all = Promise.all(Array.from(loops.values()).map(loop => {
    return new Promise(resolve => loop.bind('canplay', resolve));
}));

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

window.addEventListener('beforeunload', () => {
    set('muted', muted);
});


export function toggleMute() {
    muted = !muted;
    for (let loop of loops.values()) {
        loop.toggleMute();
    }
};

export function isMuted() {
    return muted;
};
