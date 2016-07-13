import * as drawutils from 'drawutils';


const BODY_SIZE = 17; // px


export function getBody(color) {
    const half = BODY_SIZE / 2;

    const body = drawutils.getBuffer(BODY_SIZE, BODY_SIZE);
    body.fillStyle = color;

    let dist;
    for (let y = 0; y < BODY_SIZE; y++) {
        for (let x = 0; x < BODY_SIZE; x++) {
            if (Math.sqrt(Math.pow(x - half, 2) + Math.pow(y - half, 2)) <= half) {
                body.fillRect(x, y, 1, 1);
            }
        }
    }

    return body.canvas;
}

let sun = null;
let moon = null;

void init() {
    sun = getBody('#fff');
    moon = getBody('#ccc');
}
