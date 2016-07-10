export class EventTarget {
    constructor() {
        this._listeners = new Map();
        this._oneListeners = new Map();
    }

    fire(name, ...data) {
        if (this._listeners.has(name)) {
            this._listeners.get(name).forEach(listener => {
                listener(...data);
            });
        }
        if (this._oneListeners.has(name)) {
            this._oneListeners.get(name).forEach(listener => {
                listener(...data);
            });
            this._oneListeners.delete(name);
        }
    }

    on(name, listener) {
        if (!this._listeners.has(name)) {
            this._listeners.set(name, new Set());
        }
        this._listeners.get(name).add(listener);
    }

    one(name, listener) {
        if (!this._oneListeners.has(name)) {
            this._oneListeners.set(name, new Set());
        }
        this._oneListeners.get(name).add(listener);
    }

    off(name, listener) {
        if (this._listeners.has(name)) {
            this._listeners.get(name).delete(listener);
            if (this._listeners.get(name).size() === 0) {
                this._listeners.delete(name);
            }
        }
        if (this._oneListeners.has(name)) {
            this._oneListeners.get(name).delete(listener);
            if (this._oneListeners.get(name).size() === 0) {
                this._oneListeners.delete(name);
            }
        }
    }
};
