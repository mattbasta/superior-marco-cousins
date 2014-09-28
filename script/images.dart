import 'dart:async';
import 'dart:html';


Future<ImageElement> loadImage(String src) {
    var comp = new Completer();

    var img = new ImageElement();
    img.src = src;
    img.onLoad.listen((e) {
        comp.complete(img);
    });

    return comp.future;
}

Map images = {
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

Future<List> waitFor(Iterable<String> names) {
    return Future.wait(names.map((name) => images[name]));
}

var all = Future.wait(images.values);

class Drawable {

    Future<ImageElement> future;
    ImageElement fetched;

    Drawable(String name) {
        this.future = images[name];
        this.future.then((img) {
            this.fetched = img;
        });
    }

    void draw(Function drawer) {
        if (this.fetched != null) {
            drawer(this.fetched);
        }
    }
}

Drawable get(String name) {
    return new Drawable(name);
}
