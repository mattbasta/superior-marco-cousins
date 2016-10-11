const VERSION = 1;

export function set(key, val) {
    window.localStorage.setItem(`${VERSION}.${key}`, JSON.stringify(val));
};

export function get(key) {
    return JSON.parse(window.localStorage.getItem(`${VERSION}.${key}`));
};
