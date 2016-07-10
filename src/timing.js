import * as drawing from 'drawing';
import * as keys from 'keys';
import * as levels from 'levels';
import * as sound from 'sound';


let started = false;
let paused = false;

let previous = 0;

function loop(ts) {
    const now = Date.now();
    const delta = now - previous;

    if (!paused) {
        levels.getCurrent().tick(delta, levels.next);
        drawing.draw();
    }

    requestAnimationFrame(loop);
    previous = now;
}

export function start() {
    if (started) {
        return;
    }
    previous = Date.now();
    requestAnimationFrame(loop);
    started = true;

    keys.up.on(80, e => {
        if (!paused && !levels.getCurrent().canPause()) {
            return;
        }
        paused = !paused;
        sound.play('select');

        if (paused) {
            drawing.drawPaused();
        }
    });
};
