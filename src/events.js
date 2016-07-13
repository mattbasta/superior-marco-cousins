export class EventTarget {
    constructor() {
        this.listeners = new Map();
        this.oneListeners = new Map();
    }

    fire(name, ...data) {
        if (this.listeners.has(name)) {
            this.listeners.get(name).forEach(listener => {
                listener(...data);
            });
        }
        if (this.oneListeners.has(name)) {
            this.oneListeners.get(name).forEach(listener => {
                listener(...data);
            });
            this.oneListeners.delete(name);
        }
    }

    on(name, listener) {
        if (!this.listeners.has(name)) {
            this.listeners.set(name, new Set());
        }
        this.listeners.get(name).add(listener);
    }

    one(name, listener) {
        if (!this.oneListeners.has(name)) {
            this.oneListeners.set(name, new Set());
        }
        this.oneListeners.get(name).add(listener);
    }

    off(name, listener) {
        if (this.listeners.has(name)) {
            this.listeners.get(name).delete(listener);
            if (this.listeners.get(name).size() === 0) {
                this.listeners.delete(name);
            }
        }
        if (this.oneListeners.has(name)) {
            this.oneListeners.get(name).delete(listener);
            if (this.oneListeners.get(name).size() === 0) {
                this.oneListeners.delete(name);
            }
        }
    }
};
