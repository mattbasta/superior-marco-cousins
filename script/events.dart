class EventTarget {
    Map _listeners;
    Map _oneListeners;

    EventTarget() {
        _listeners = new Map();
        _oneListeners = new Map();
    }

    void fire(name, [data]) {
        if (_listeners.containsKey(name)) {
            for (Function listener in _listeners[name]) {
                Function.apply(listener, data);
            }
        }
        if (_oneListeners.containsKey(name)) {
            for (Function listener in _oneListeners[name]) {
                Function.apply(listener, data);
            }
            _oneListeners.remove(name);
        }
    }

    void on(name, Function listener) {
        _listeners.putIfAbsent(name, () => []);
        _listeners[name].add(listener);
    }

    void one(name, Function listener) {
        _oneListeners.putIfAbsent(name, () => []);
        _oneListeners[name].add(listener);
    }

    void off(name, Function listener) {
        if (_listeners.containsKey(name)) {
            _listeners[name].remove(listener);
            if (_listeners[name].isEmpty) {
                _listeners.remove(name);
            }
        }
        if (_oneListeners.containsKey(name)) {
            _oneListeners[name].remove(listener);
            if (_oneListeners[name].isEmpty) {
                _oneListeners.remove(name);
            }
        }
    }

}
