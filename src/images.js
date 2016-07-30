function loadImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
    });
}

const images = {
    'bastacorp': loadImage('img/bastacorp.jpg'),
    'blueman': loadImage('img/blueman.png'),
    'coolshades': loadImage('img/coolshades.png'),
    'disabilityBenefits': loadImage('img/disabilityBenefits.png'),
    'drowninpool': loadImage('img/drowninpool.png'),
    'entities': loadImage('img/entities.png'),
    'fellInHole': loadImage('img/fellinhole.png'),
    'greenman': loadImage('img/greenman.png'),
    'menu': loadImage('img/menu.png'),
    'melonfinance': loadImage('img/melonfinance.png'),
    'relaxbypool': loadImage('img/relaxbypool.png'),
    'tiles': loadImage('img/tiles.png')
};

export const all = Promise.all(Object.keys(images).map(key => images[key]));

class Drawable {
    constructor(name) {
        this.fetched = null;

        this.future = images[name];
        this.future.then(img => {
            this.fetched = img;
        });
    }

    draw(drawer) {
        if (this.fetched !== null) {
            drawer(this.fetched);
        }
    }

    drawEventually(drawer) {
        this.future.then(drawer);
    }
}

export function get(name) {
    return new Drawable(name);
};

export function waitFor(names) {
    return Promise.all(names.map(key => images[key]));
};
