/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _audio = __webpack_require__(2);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _drawing = __webpack_require__(4);
	
	var drawing = _interopRequireWildcard(_drawing);
	
	var _entities = __webpack_require__(5);
	
	var entities = _interopRequireWildcard(_entities);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _keys = __webpack_require__(16);
	
	var keys = _interopRequireWildcard(_keys);
	
	var _levels = __webpack_require__(18);
	
	var levels = _interopRequireWildcard(_levels);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	var _timing = __webpack_require__(30);
	
	var timing = _interopRequireWildcard(_timing);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	keys.init();
	sound.init();
	
	drawing.init();
	entities.init();
	levels.init();
	
	Promise.all([audio.all, images.all]).then(function () {
	    return timing.start();
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.all = undefined;
	exports.playLoop = playLoop;
	exports.stop = stop;
	exports.toggleMute = toggleMute;
	exports.isMuted = isMuted;
	
	var _buzz = __webpack_require__(3);
	
	var buzz = _interopRequireWildcard(_buzz);
	
	var _storage = __webpack_require__(31);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var loops = new Map();
	var playingLoop = null;
	
	var muted = (0, _storage.get)('muted');
	
	function loadLoop(name, uri) {
	    if (loops.has(name)) {
	        return;
	    }
	
	    var loop = new buzz.sound(uri, {
	        formats: ['mp3'],
	        preload: true,
	        autoload: true,
	        loop: true
	    });
	    loops.set(name, loop);
	
	    if (muted) {
	        loop.toggleMute();
	    }
	}
	
	loadLoop('title', 'audio/title');
	loadLoop('hero', 'audio/hero');
	
	var all = exports.all = Promise.all(Array.from(loops.values()).map(function (loop) {
	    return new Promise(function (resolve) {
	        return loop.bind('canplay', resolve);
	    });
	}));
	
	function playLoop(name) {
	    if (playingLoop === name) {
	        return;
	    }
	
	    if (playingLoop === null) {
	        playingLoop = name;
	        var loop = loops.get(name);
	        loop.play();
	        loop.setVolume(0);
	        loop.fadeTo(10, 1000);
	        return;
	    }
	
	    loops.get(playingLoop).fadeOut(2000, function () {
	        playingLoop = name;
	        var loop = loops.get(name);
	        loop.play();
	        loop.setVolume(0);
	        loop.fadeTo(20, 2000);
	    });
	};
	
	function stop() {
	    if (playingLoop === null) {
	        return;
	    }
	    loops.get(playingLoop).stop();
	    playingLoop = null;
	};
	
	window.addEventListener('beforeunload', function () {
	    (0, _storage.set)('muted', muted);
	});
	
	function toggleMute() {
	    muted = !muted;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = loops.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var loop = _step.value;
	
	            loop.toggleMute();
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};
	
	function isMuted() {
	    return muted;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; // ----------------------------------------------------------------------------
	 // Buzz, a Javascript HTML5 Audio library
	 // v1.2.0 - Built 2016-05-22 15:16
	 // Licensed under the MIT license.
	 // http://buzz.jaysalvat.com/
	 // ----------------------------------------------------------------------------
	 // Copyright (C) 2010-2016 Jay Salvat
	 // http://jaysalvat.com/
	 // ----------------------------------------------------------------------------
	
	(function(context, factory) {
	    "use strict";
	    if (typeof module !== "undefined" && module.exports) {
	        module.exports = factory();
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        context.buzz = factory();
	    }
	})(this, function() {
	    "use strict";
	    var AudioContext = window.AudioContext || window.webkitAudioContext;
	    var buzz = {
	        defaults: {
	            autoplay: false,
	            crossOrigin: null,
	            duration: 5e3,
	            formats: [],
	            loop: false,
	            placeholder: "--",
	            preload: "metadata",
	            volume: 80,
	            webAudioApi: false,
	            document: window.document
	        },
	        types: {
	            mp3: "audio/mpeg",
	            ogg: "audio/ogg",
	            wav: "audio/wav",
	            aac: "audio/aac",
	            m4a: "audio/x-m4a"
	        },
	        sounds: [],
	        el: document.createElement("audio"),
	        getAudioContext: function() {
	            if (this.audioCtx === undefined) {
	                try {
	                    this.audioCtx = AudioContext ? new AudioContext() : null;
	                } catch (e) {
	                    this.audioCtx = null;
	                }
	            }
	            return this.audioCtx;
	        },
	        sound: function(src, options) {
	            options = options || {};
	            var doc = options.document || buzz.defaults.document;
	            var pid = 0, events = [], eventsOnce = {}, supported = buzz.isSupported();
	            this.load = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.load();
	                return this;
	            };
	            this.play = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.play();
	                return this;
	            };
	            this.togglePlay = function() {
	                if (!supported) {
	                    return this;
	                }
	                if (this.sound.paused) {
	                    this.sound.play();
	                } else {
	                    this.sound.pause();
	                }
	                return this;
	            };
	            this.pause = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.pause();
	                return this;
	            };
	            this.isPaused = function() {
	                if (!supported) {
	                    return null;
	                }
	                return this.sound.paused;
	            };
	            this.stop = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.setTime(0);
	                this.sound.pause();
	                return this;
	            };
	            this.isEnded = function() {
	                if (!supported) {
	                    return null;
	                }
	                return this.sound.ended;
	            };
	            this.loop = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.loop = "loop";
	                this.bind("ended.buzzloop", function() {
	                    this.currentTime = 0;
	                    this.play();
	                });
	                return this;
	            };
	            this.unloop = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.removeAttribute("loop");
	                this.unbind("ended.buzzloop");
	                return this;
	            };
	            this.mute = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.muted = true;
	                return this;
	            };
	            this.unmute = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.muted = false;
	                return this;
	            };
	            this.toggleMute = function() {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.muted = !this.sound.muted;
	                return this;
	            };
	            this.isMuted = function() {
	                if (!supported) {
	                    return null;
	                }
	                return this.sound.muted;
	            };
	            this.setVolume = function(volume) {
	                if (!supported) {
	                    return this;
	                }
	                if (volume < 0) {
	                    volume = 0;
	                }
	                if (volume > 100) {
	                    volume = 100;
	                }
	                this.volume = volume;
	                this.sound.volume = volume / 100;
	                return this;
	            };
	            this.getVolume = function() {
	                if (!supported) {
	                    return this;
	                }
	                return this.volume;
	            };
	            this.increaseVolume = function(value) {
	                return this.setVolume(this.volume + (value || 1));
	            };
	            this.decreaseVolume = function(value) {
	                return this.setVolume(this.volume - (value || 1));
	            };
	            this.setTime = function(time) {
	                if (!supported) {
	                    return this;
	                }
	                var set = true;
	                this.whenReady(function() {
	                    if (set === true) {
	                        set = false;
	                        this.sound.currentTime = time;
	                    }
	                });
	                return this;
	            };
	            this.getTime = function() {
	                if (!supported) {
	                    return null;
	                }
	                var time = Math.round(this.sound.currentTime * 100) / 100;
	                return isNaN(time) ? buzz.defaults.placeholder : time;
	            };
	            this.setPercent = function(percent) {
	                if (!supported) {
	                    return this;
	                }
	                return this.setTime(buzz.fromPercent(percent, this.sound.duration));
	            };
	            this.getPercent = function() {
	                if (!supported) {
	                    return null;
	                }
	                var percent = Math.round(buzz.toPercent(this.sound.currentTime, this.sound.duration));
	                return isNaN(percent) ? buzz.defaults.placeholder : percent;
	            };
	            this.setSpeed = function(duration) {
	                if (!supported) {
	                    return this;
	                }
	                this.sound.playbackRate = duration;
	                return this;
	            };
	            this.getSpeed = function() {
	                if (!supported) {
	                    return null;
	                }
	                return this.sound.playbackRate;
	            };
	            this.getDuration = function() {
	                if (!supported) {
	                    return null;
	                }
	                var duration = Math.round(this.sound.duration * 100) / 100;
	                return isNaN(duration) ? buzz.defaults.placeholder : duration;
	            };
	            this.getPlayed = function() {
	                if (!supported) {
	                    return null;
	                }
	                return timerangeToArray(this.sound.played);
	            };
	            this.getBuffered = function() {
	                if (!supported) {
	                    return null;
	                }
	                return timerangeToArray(this.sound.buffered);
	            };
	            this.getSeekable = function() {
	                if (!supported) {
	                    return null;
	                }
	                return timerangeToArray(this.sound.seekable);
	            };
	            this.getErrorCode = function() {
	                if (supported && this.sound.error) {
	                    return this.sound.error.code;
	                }
	                return 0;
	            };
	            this.getErrorMessage = function() {
	                if (!supported) {
	                    return null;
	                }
	                switch (this.getErrorCode()) {
	                  case 1:
	                    return "MEDIA_ERR_ABORTED";
	
	                  case 2:
	                    return "MEDIA_ERR_NETWORK";
	
	                  case 3:
	                    return "MEDIA_ERR_DECODE";
	
	                  case 4:
	                    return "MEDIA_ERR_SRC_NOT_SUPPORTED";
	
	                  default:
	                    return null;
	                }
	            };
	            this.getStateCode = function() {
	                if (!supported) {
	                    return null;
	                }
	                return this.sound.readyState;
	            };
	            this.getStateMessage = function() {
	                if (!supported) {
	                    return null;
	                }
	                switch (this.getStateCode()) {
	                  case 0:
	                    return "HAVE_NOTHING";
	
	                  case 1:
	                    return "HAVE_METADATA";
	
	                  case 2:
	                    return "HAVE_CURRENT_DATA";
	
	                  case 3:
	                    return "HAVE_FUTURE_DATA";
	
	                  case 4:
	                    return "HAVE_ENOUGH_DATA";
	
	                  default:
	                    return null;
	                }
	            };
	            this.getNetworkStateCode = function() {
	                if (!supported) {
	                    return null;
	                }
	                return this.sound.networkState;
	            };
	            this.getNetworkStateMessage = function() {
	                if (!supported) {
	                    return null;
	                }
	                switch (this.getNetworkStateCode()) {
	                  case 0:
	                    return "NETWORK_EMPTY";
	
	                  case 1:
	                    return "NETWORK_IDLE";
	
	                  case 2:
	                    return "NETWORK_LOADING";
	
	                  case 3:
	                    return "NETWORK_NO_SOURCE";
	
	                  default:
	                    return null;
	                }
	            };
	            this.set = function(key, value) {
	                if (!supported) {
	                    return this;
	                }
	                this.sound[key] = value;
	                return this;
	            };
	            this.get = function(key) {
	                if (!supported) {
	                    return null;
	                }
	                return key ? this.sound[key] : this.sound;
	            };
	            this.bind = function(types, func) {
	                if (!supported) {
	                    return this;
	                }
	                types = types.split(" ");
	                var self = this, efunc = function(e) {
	                    func.call(self, e);
	                };
	                for (var t = 0; t < types.length; t++) {
	                    var type = types[t], idx = type;
	                    type = idx.split(".")[0];
	                    events.push({
	                        idx: idx,
	                        func: efunc
	                    });
	                    this.sound.addEventListener(type, efunc, true);
	                }
	                return this;
	            };
	            this.unbind = function(types) {
	                if (!supported) {
	                    return this;
	                }
	                types = types.split(" ");
	                for (var t = 0; t < types.length; t++) {
	                    var idx = types[t], type = idx.split(".")[0];
	                    for (var i = 0; i < events.length; i++) {
	                        var namespace = events[i].idx.split(".");
	                        if (events[i].idx === idx || namespace[1] && namespace[1] === idx.replace(".", "")) {
	                            this.sound.removeEventListener(type, events[i].func, true);
	                            events.splice(i, 1);
	                        }
	                    }
	                }
	                return this;
	            };
	            this.bindOnce = function(type, func) {
	                if (!supported) {
	                    return this;
	                }
	                var self = this;
	                eventsOnce[pid++] = false;
	                this.bind(type + "." + pid, function() {
	                    if (!eventsOnce[pid]) {
	                        eventsOnce[pid] = true;
	                        func.call(self);
	                    }
	                    self.unbind(type + "." + pid);
	                });
	                return this;
	            };
	            this.trigger = function(types, detail) {
	                if (!supported) {
	                    return this;
	                }
	                types = types.split(" ");
	                for (var t = 0; t < types.length; t++) {
	                    var idx = types[t];
	                    for (var i = 0; i < events.length; i++) {
	                        var eventType = events[i].idx.split(".");
	                        if (events[i].idx === idx || eventType[0] && eventType[0] === idx.replace(".", "")) {
	                            var evt = doc.createEvent("HTMLEvents");
	                            evt.initEvent(eventType[0], false, true);
	                            evt.originalEvent = detail;
	                            this.sound.dispatchEvent(evt);
	                        }
	                    }
	                }
	                return this;
	            };
	            this.fadeTo = function(to, duration, callback) {
	                if (!supported) {
	                    return this;
	                }
	                if (duration instanceof Function) {
	                    callback = duration;
	                    duration = buzz.defaults.duration;
	                } else {
	                    duration = duration || buzz.defaults.duration;
	                }
	                var from = this.volume, delay = duration / Math.abs(from - to), self = this, fadeToTimeout;
	                this.play();
	                function doFade() {
	                    clearTimeout(fadeToTimeout);
	                    fadeToTimeout = setTimeout(function() {
	                        if (from < to && self.volume < to) {
	                            self.setVolume(self.volume += 1);
	                            doFade();
	                        } else if (from > to && self.volume > to) {
	                            self.setVolume(self.volume -= 1);
	                            doFade();
	                        } else if (callback instanceof Function) {
	                            callback.apply(self);
	                        }
	                    }, delay);
	                }
	                this.whenReady(function() {
	                    doFade();
	                });
	                return this;
	            };
	            this.fadeIn = function(duration, callback) {
	                if (!supported) {
	                    return this;
	                }
	                return this.setVolume(0).fadeTo(100, duration, callback);
	            };
	            this.fadeOut = function(duration, callback) {
	                if (!supported) {
	                    return this;
	                }
	                return this.fadeTo(0, duration, callback);
	            };
	            this.fadeWith = function(sound, duration) {
	                if (!supported) {
	                    return this;
	                }
	                this.fadeOut(duration, function() {
	                    this.stop();
	                });
	                sound.play().fadeIn(duration);
	                return this;
	            };
	            this.whenReady = function(func) {
	                if (!supported) {
	                    return null;
	                }
	                var self = this;
	                if (this.sound.readyState === 0) {
	                    this.bind("canplay.buzzwhenready", function() {
	                        func.call(self);
	                    });
	                } else {
	                    func.call(self);
	                }
	            };
	            this.addSource = function(src) {
	                var self = this, source = doc.createElement("source");
	                source.src = src;
	                if (buzz.types[getExt(src)]) {
	                    source.type = buzz.types[getExt(src)];
	                }
	                this.sound.appendChild(source);
	                source.addEventListener("error", function(e) {
	                    self.trigger("sourceerror", e);
	                });
	                return source;
	            };
	            function timerangeToArray(timeRange) {
	                var array = [], length = timeRange.length - 1;
	                for (var i = 0; i <= length; i++) {
	                    array.push({
	                        start: timeRange.start(i),
	                        end: timeRange.end(i)
	                    });
	                }
	                return array;
	            }
	            function getExt(filename) {
	                return filename.split(".").pop();
	            }
	            if (supported && src) {
	                for (var i in buzz.defaults) {
	                    if (buzz.defaults.hasOwnProperty(i)) {
	                        if (options[i] === undefined) {
	                            options[i] = buzz.defaults[i];
	                        }
	                    }
	                }
	                this.sound = doc.createElement("audio");
	                if (options.crossOrigin !== null) {
	                    this.sound.crossOrigin = options.crossOrigin;
	                }
	                if (options.webAudioApi) {
	                    var audioCtx = buzz.getAudioContext();
	                    if (audioCtx) {
	                        this.source = audioCtx.createMediaElementSource(this.sound);
	                        this.source.connect(audioCtx.destination);
	                    }
	                }
	                if (src instanceof Array) {
	                    for (var j in src) {
	                        if (src.hasOwnProperty(j)) {
	                            this.addSource(src[j]);
	                        }
	                    }
	                } else if (options.formats.length) {
	                    for (var k in options.formats) {
	                        if (options.formats.hasOwnProperty(k)) {
	                            this.addSource(src + "." + options.formats[k]);
	                        }
	                    }
	                } else {
	                    this.addSource(src);
	                }
	                if (options.loop) {
	                    this.loop();
	                }
	                if (options.autoplay) {
	                    this.sound.autoplay = "autoplay";
	                }
	                if (options.preload === true) {
	                    this.sound.preload = "auto";
	                } else if (options.preload === false) {
	                    this.sound.preload = "none";
	                } else {
	                    this.sound.preload = options.preload;
	                }
	                this.setVolume(options.volume);
	                buzz.sounds.push(this);
	            }
	        },
	        group: function(sounds) {
	            sounds = argsToArray(sounds, arguments);
	            this.getSounds = function() {
	                return sounds;
	            };
	            this.add = function(soundArray) {
	                soundArray = argsToArray(soundArray, arguments);
	                for (var a = 0; a < soundArray.length; a++) {
	                    sounds.push(soundArray[a]);
	                }
	            };
	            this.remove = function(soundArray) {
	                soundArray = argsToArray(soundArray, arguments);
	                for (var a = 0; a < soundArray.length; a++) {
	                    for (var i = 0; i < sounds.length; i++) {
	                        if (sounds[i] === soundArray[a]) {
	                            sounds.splice(i, 1);
	                            break;
	                        }
	                    }
	                }
	            };
	            this.load = function() {
	                fn("load");
	                return this;
	            };
	            this.play = function() {
	                fn("play");
	                return this;
	            };
	            this.togglePlay = function() {
	                fn("togglePlay");
	                return this;
	            };
	            this.pause = function(time) {
	                fn("pause", time);
	                return this;
	            };
	            this.stop = function() {
	                fn("stop");
	                return this;
	            };
	            this.mute = function() {
	                fn("mute");
	                return this;
	            };
	            this.unmute = function() {
	                fn("unmute");
	                return this;
	            };
	            this.toggleMute = function() {
	                fn("toggleMute");
	                return this;
	            };
	            this.setVolume = function(volume) {
	                fn("setVolume", volume);
	                return this;
	            };
	            this.increaseVolume = function(value) {
	                fn("increaseVolume", value);
	                return this;
	            };
	            this.decreaseVolume = function(value) {
	                fn("decreaseVolume", value);
	                return this;
	            };
	            this.loop = function() {
	                fn("loop");
	                return this;
	            };
	            this.unloop = function() {
	                fn("unloop");
	                return this;
	            };
	            this.setSpeed = function(speed) {
	                fn("setSpeed", speed);
	                return this;
	            };
	            this.setTime = function(time) {
	                fn("setTime", time);
	                return this;
	            };
	            this.set = function(key, value) {
	                fn("set", key, value);
	                return this;
	            };
	            this.bind = function(type, func) {
	                fn("bind", type, func);
	                return this;
	            };
	            this.unbind = function(type) {
	                fn("unbind", type);
	                return this;
	            };
	            this.bindOnce = function(type, func) {
	                fn("bindOnce", type, func);
	                return this;
	            };
	            this.trigger = function(type) {
	                fn("trigger", type);
	                return this;
	            };
	            this.fade = function(from, to, duration, callback) {
	                fn("fade", from, to, duration, callback);
	                return this;
	            };
	            this.fadeIn = function(duration, callback) {
	                fn("fadeIn", duration, callback);
	                return this;
	            };
	            this.fadeOut = function(duration, callback) {
	                fn("fadeOut", duration, callback);
	                return this;
	            };
	            function fn() {
	                var args = argsToArray(null, arguments), func = args.shift();
	                for (var i = 0; i < sounds.length; i++) {
	                    sounds[i][func].apply(sounds[i], args);
	                }
	            }
	            function argsToArray(array, args) {
	                return array instanceof Array ? array : Array.prototype.slice.call(args);
	            }
	        },
	        all: function() {
	            return new buzz.group(buzz.sounds);
	        },
	        isSupported: function() {
	            return !!buzz.el.canPlayType;
	        },
	        isOGGSupported: function() {
	            return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/ogg; codecs="vorbis"');
	        },
	        isWAVSupported: function() {
	            return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/wav; codecs="1"');
	        },
	        isMP3Supported: function() {
	            return !!buzz.el.canPlayType && buzz.el.canPlayType("audio/mpeg;");
	        },
	        isAACSupported: function() {
	            return !!buzz.el.canPlayType && (buzz.el.canPlayType("audio/x-m4a;") || buzz.el.canPlayType("audio/aac;"));
	        },
	        toTimer: function(time, withHours) {
	            var h, m, s;
	            h = Math.floor(time / 3600);
	            h = isNaN(h) ? "--" : h >= 10 ? h : "0" + h;
	            m = withHours ? Math.floor(time / 60 % 60) : Math.floor(time / 60);
	            m = isNaN(m) ? "--" : m >= 10 ? m : "0" + m;
	            s = Math.floor(time % 60);
	            s = isNaN(s) ? "--" : s >= 10 ? s : "0" + s;
	            return withHours ? h + ":" + m + ":" + s : m + ":" + s;
	        },
	        fromTimer: function(time) {
	            var splits = time.toString().split(":");
	            if (splits && splits.length === 3) {
	                time = parseInt(splits[0], 10) * 3600 + parseInt(splits[1], 10) * 60 + parseInt(splits[2], 10);
	            }
	            if (splits && splits.length === 2) {
	                time = parseInt(splits[0], 10) * 60 + parseInt(splits[1], 10);
	            }
	            return time;
	        },
	        toPercent: function(value, total, decimal) {
	            var r = Math.pow(10, decimal || 0);
	            return Math.round(value * 100 / total * r) / r;
	        },
	        fromPercent: function(percent, total, decimal) {
	            var r = Math.pow(10, decimal || 0);
	            return Math.round(total / 100 * percent * r) / r;
	        }
	    };
	    return buzz;
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = init;
	exports.drawUI = drawUI;
	exports.drawPaused = drawPaused;
	exports.draw = draw;
	
	var _entities = __webpack_require__(5);
	
	var entities = _interopRequireWildcard(_entities);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _levels = __webpack_require__(18);
	
	var levels = _interopRequireWildcard(_levels);
	
	var _settings = __webpack_require__(8);
	
	var settings = _interopRequireWildcard(_settings);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var can = void 0;
	var ctx = void 0;
	
	var width = void 0;
	var height = void 0;
	
	var entitiesDrawable = void 0;
	
	var PAUSE_TEXT = 'HESITATION';
	
	function init() {
	    can = document.querySelector('canvas');
	    ctx = can.getContext('2d');
	
	    width = can.width;
	    height = can.height;
	
	    var resizeListener = function resizeListener() {
	        can.width = width = Math.ceil(document.body.clientWidth / 2);
	        can.height = height = Math.ceil(document.body.clientHeight / 2);
	    };
	
	    resizeListener();
	    window.addEventListener('resize', resizeListener);
	
	    entitiesDrawable = images.get('entities');
	};
	
	function drawUI() {
	    var melonCountTop = height - 16;
	    entitiesDrawable.draw(function (img) {
	        return ctx.drawImage(img, 0, 0, 8, 8, 10, melonCountTop - settings.tile_size + 8, settings.tile_size, settings.tile_size);
	    });
	
	    ctx.font = settings.tile_size + 'px VT323';
	
	    var melonCountLeft = 20 + settings.tile_size;
	    var melonCountText = 'x' + entities.registry[0].melonCount;
	
	    ctx.fillStyle = 'black';
	    ctx.fillText(melonCountText, melonCountLeft + 2, melonCountTop + 2);
	    ctx.fillStyle = 'white';
	    ctx.fillText(melonCountText, melonCountLeft, melonCountTop);
	};
	
	function drawPaused() {
	    ctx.font = '60px VT323';
	
	    var modifierWidth = ctx.measureText(PAUSE_TEXT);
	    ctx.fillStyle = 'black';
	    ctx.fillText(PAUSE_TEXT, width / 2 - modifierWidth.width / 2 + 4, height / 2 - 15 + 4);
	    ctx.fillStyle = 'white';
	    ctx.fillText(PAUSE_TEXT, width / 2 - modifierWidth.width / 2, height / 2 - 15);
	};
	
	function draw() {
	    ctx.imageSmoothingEnabled = false;
	    levels.getCurrent().draw(ctx, drawUI);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.registry = undefined;
	exports.init = init;
	exports.draw = draw;
	exports.tick = tick;
	exports.getEntity = getEntity;
	exports.add = add;
	exports.reset = reset;
	
	var _beetle = __webpack_require__(6);
	
	var _colin = __webpack_require__(11);
	
	var _melon = __webpack_require__(12);
	
	var _player = __webpack_require__(15);
	
	var registry = exports.registry = [];
	
	function init() {
	    registry.push(new _player.Player());
	};
	
	function draw(ctx, level, offsetX, offsetY) {
	    for (var i = 0; i < registry.length; i++) {
	        registry[i].draw(ctx, level, offsetX, offsetY);
	    }
	};
	
	function tick(delta, level) {
	    for (var i = registry.length - 1; i >= 0; i--) {
	        var result = registry[i].tick(delta, level);
	        if (!result) {
	            registry.splice(i, 1);
	            i--;
	        }
	    }
	};
	
	function getEntity(id, x, y) {
	    switch (id) {
	        case 0:
	            // Melon
	            return new _melon.MelonEntity(x, y);
	        case 5:
	            // Colin
	            return new _colin.ColinEntity(x, y);
	        case 15:
	            // Beetle
	            return new _beetle.BeetleEntity(x, y);
	        default:
	            throw new Error('Unrecognized entity ' + id);
	    }
	};
	
	function add(id, x, y) {
	    registry.push(getEntity(id, x, y));
	};
	
	function reset() {
	    if (registry.length === 1) {
	        return;
	    }
	    registry.splice(1, registry.length);
	    registry[0].reset();
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BeetleEntity = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _generic = __webpack_require__(7);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _settings = __webpack_require__(8);
	
	var settings = _interopRequireWildcard(_settings);
	
	var _tiles = __webpack_require__(9);
	
	var tiles = _interopRequireWildcard(_tiles);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SPRITE_TILE = 8;
	
	var DIR_LEFT = 0;
	var DIR_RIGHT = 1;
	
	var BEETLE_SPEED = 2.0;
	var BEETLE_PANIC_SPEED = 6.5;
	
	var BeetleEntity = exports.BeetleEntity = function (_Entity) {
	    _inherits(BeetleEntity, _Entity);
	
	    function BeetleEntity(x, y) {
	        _classCallCheck(this, BeetleEntity);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BeetleEntity).call(this));
	
	        _this.x = x;
	        _this.y = y;
	
	        _this.height = 0.625;
	        _this.ticksAfterReversing = 0;
	
	        _this.image = images.get('entities');
	        return _this;
	    }
	
	    _createClass(BeetleEntity, [{
	        key: 'reset',
	        value: function reset() {
	            this.ticksAfterReversing = 0;
	            this.direction = DIR_RIGHT;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, level, offsetX, offsetY) {
	            var _this2 = this;
	
	            var speed = this.standers.size ? BEETLE_PANIC_SPEED : BEETLE_SPEED;
	            this.image.draw(function (img) {
	                var x = Math.floor(Date.now() / 350) % 2;
	                if (_this2.direction === DIR_LEFT) {
	                    x += 2;
	                }
	                var locX = _this2.x * settings.tile_size;
	
	                if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;
	
	                ctx.drawImage(img, x * SPRITE_TILE, 3 * SPRITE_TILE + 3, SPRITE_TILE, SPRITE_TILE * _this2.height, locX + offsetX, (level.height - _this2.y - _this2.height) * settings.tile_size + offsetY, settings.tile_size, settings.tile_size * _this2.height);
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, level) {
	            var speed = this.standers.size ? BEETLE_PANIC_SPEED : BEETLE_SPEED;
	
	            var prospectiveVel = void 0;
	            if (this.standingOn) {
	                prospectiveVel = 0;
	            } else if (this.direction === DIR_LEFT) {
	                prospectiveVel = -1 * speed;
	            } else if (this.direction === DIR_RIGHT) {
	                prospectiveVel = speed;
	            }
	
	            var newX = this.x + prospectiveVel / delta * _generic.DELTA_RATIO;
	            if (this.isInContactWithFloor && Math.floor(newX) !== Math.floor(this.x) && !this.standers.size) {
	                for (var x = Math.floor(newX); x <= Math.ceil(Math.floor(newX) + this.width); x++) {
	                    var index = level.getLevelIndex(x, Math.ceil(this.y));
	                    if (!tiles.canStand(level.data[index])) {
	                        this.hitWall(this.x);
	                        break;
	                    }
	                }
	            }
	
	            this.velX = prospectiveVel;
	
	            var origDirection = this.direction;
	            this.calcPhysics(delta, level);
	            if (this.direction === origDirection && this.ticksAfterReversing) {
	                this.ticksAfterReversing--;
	            }
	
	            return this.y > -2;
	        }
	    }, {
	        key: 'hitWall',
	        value: function hitWall(stoppedX) {
	            _get(Object.getPrototypeOf(BeetleEntity.prototype), 'hitWall', this).call(this, stoppedX);
	            if (this.ticksAfterReversing) return;
	            this.direction = this.direction === DIR_LEFT ? DIR_RIGHT : DIR_LEFT;
	            this.ticksAfterReversing = 3;
	        }
	    }, {
	        key: 'bounce',
	        get: function get() {
	            return 0.3;
	        }
	    }, {
	        key: 'canBePushed',
	        get: function get() {
	            return false;
	        }
	    }, {
	        key: 'canBeStoodOn',
	        get: function get() {
	            return true;
	        }
	    }, {
	        key: 'canPush',
	        get: function get() {
	            return true;
	        }
	    }, {
	        key: 'canStandOn',
	        get: function get() {
	            return true;
	        }
	    }, {
	        key: 'type',
	        get: function get() {
	            return 'beetle';
	        }
	    }]);
	
	    return BeetleEntity;
	}(_generic.Entity);
	
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Entity = exports.DELTA_RATIO = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(5);
	
	var entities = _interopRequireWildcard(_entities);
	
	var _settings = __webpack_require__(8);
	
	var settings = _interopRequireWildcard(_settings);
	
	var _tiles = __webpack_require__(9);
	
	var tiles = _interopRequireWildcard(_tiles);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DELTA_RATIO = exports.DELTA_RATIO = 0.3;
	
	var GRAVITY = 50;
	var MAX_SPEED = 50.0;
	
	var Entity = exports.Entity = function () {
	    function Entity() {
	        _classCallCheck(this, Entity);
	
	        this.standers = new Set();
	        this.standingOn = null;
	
	        this.velX = 0.0;
	        this.velY = 0.0;
	
	        this.canDoubleJump = false;
	        this.didDoubleJump = false;
	
	        this.height = 1.0;
	        this.width = 1.0;
	
	        this.bouncing = false;
	        this.isInContactWithFloor = false;
	
	        this.reset();
	    }
	
	    _createClass(Entity, [{
	        key: 'hitGround',
	        value: function hitGround(y) {
	            if (this.bounce !== 0.0 && this.velY < -1 && !this.standers.size) {
	                this.velY = -1 * this.bounce * this.velY;
	            } else {
	                this.velY = 0.0;
	            }
	            this.y = y;
	            this.isInContactWithFloor = true;
	
	            if (this.complexJumps) {
	                this.canDoubleJump = false;
	                this.didDoubleJump = false;
	                this.jumpEnergy = settings.jump_energy;
	            }
	        }
	    }, {
	        key: 'testCollisionDown',
	        value: function testCollisionDown(level, origY) {
	            if (this.y < 0 || Math.ceil(this.y) > level.height - 1) {
	                return;
	            }
	
	            var start = Math.max(Math.floor(this.x), 0);
	            var end = Math.min(Math.ceil(this.x + this.width), level.width);
	
	            var crossedOne = Math.floor(this.y) !== Math.floor(origY);
	            var testForHalf = Math.ceil(this.y) - this.y > 0.5;
	
	            // Test for solid blocks
	            if (crossedOne) {
	                for (var x = start; x < end; x++) {
	                    var index = level.getLevelIndex(x, Math.ceil(this.y));
	                    if (tiles.canStand(level.data[index])) {
	                        this.hitGround(Math.ceil(this.y));
	                        return;
	                    }
	                }
	                if (!testForHalf) {
	                    this.isInContactWithFloor = false;
	                }
	            }
	            // Test for half-solid blocks
	            if (testForHalf) {
	                for (var _x = start; _x < end; _x++) {
	                    var _index = level.getLevelIndex(_x, Math.ceil(this.y));
	                    var tile = level.data[_index];
	                    if (tiles.HALF_SOLID.has(tile)) {
	                        if (tile == tiles.TILE_CHAIR_LEFT || tile == tiles.TILE_CHAIR_RIGHT) {
	                            this.sitOnChair();
	                        }
	
	                        this.hitGround(Math.ceil(this.y) - 0.5);
	                        return;
	                    }
	                }
	                this.isInContactWithFloor = false;
	            }
	        }
	    }, {
	        key: 'nearestLadder',
	        value: function nearestLadder(level) {
	            var topMostSide = Math.min(Math.ceil(this.y + this.height), level.height - 1);
	            for (var y = Math.max(Math.floor(this.y + 1), 0); y < topMostSide; y++) {
	                var x = Math.floor(this.x + 0.5);
	                var index = level.getLevelIndex(x, y);
	                if (level.data[index] === tiles.TILE_LADDER) {
	                    return x;
	                }
	            }
	            return -1;
	        }
	    }, {
	        key: 'testHitUp',
	        value: function testHitUp(level) {
	            var _this = this;
	
	            // This is because there is no `reduce()` on Set.
	            var height = this.height;
	            this.standers.forEach(function (e) {
	                height = Math.max(height, e.height + _this.height);
	            });
	
	            var y = Math.floor(this.y + height) + 1;
	            if (y >= level.height) {
	                return false;
	            }
	
	            var rightMostSpot = Math.min(Math.ceil(this.x + this.width), level.width - 1);
	            for (var x = Math.max(Math.floor(this.x), 0); x < rightMostSpot; x++) {
	                if (tiles.SOLID.has(level.data[level.getLevelIndex(x, y)])) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'testCollisionUp',
	        value: function testCollisionUp(level) {
	            if (this.testHitUp(level)) {
	                this.headBump();
	            }
	        }
	    }, {
	        key: 'testCollisionSide',
	        value: function testCollisionSide(level) {
	            var topMostSide = Math.min(Math.ceil(this.y + this.height + 1), level.height - 1);
	            for (var y = Math.max(Math.floor(this.y) + 1, 0); y < topMostSide; y++) {
	                if (this.velX < 1) {
	                    // On left
	                    var index = level.getLevelIndex(Math.ceil(this.x) - 1, y);
	                    var tile = level.data[index];
	                    if (tiles.SOLID.has(tile)) {
	                        this.hitWall(Math.ceil(this.x));
	                        return;
	                    }
	                } else if (this.velX > 1) {
	                    // On right
	                    var _index2 = level.getLevelIndex(Math.floor(this.x + this.width), y);
	                    var _tile = level.data[_index2];
	                    if (tiles.SOLID.has(_tile)) {
	                        this.hitWall(Math.floor(this.x));
	                        return;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'hitTestEntities',
	        value: function hitTestEntities(cb) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = entities.registry[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var ent = _step.value;
	
	                    if (ent === this) continue;
	
	                    if (this.x >= ent.x + ent.width) continue;
	                    if (this.y >= ent.y + ent.height) continue;
	                    if (this.x + this.width <= ent.x) continue;
	                    if (this.y + this.height <= ent.y) continue;
	
	                    var result = cb(ent);
	                    if (result) break;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'updateUpwardsChain',
	        value: function updateUpwardsChain() {
	            var _this2 = this;
	
	            if (!this.standers.size) {
	                return;
	            }
	
	            var newY = this.y + this.height;
	            this.standers.forEach(function (e) {
	                e.y = newY;
	                e.velY = _this2.velY;
	                e.isInContactWithFloor = true;
	                e.updateUpwardsChain();
	            });
	        }
	    }, {
	        key: 'testFallingDown',
	        value: function testFallingDown() {
	            var _this3 = this;
	
	            if (this.standingOn !== null) {
	                // If the entity is standing on someone, check the state of
	                // that.
	                var estStandingY = this.y - this.standingOn.height;
	                if (estStandingY > this.standingOn.y || this.x + this.width < this.standingOn.x || this.x > this.standingOn.x + this.standingOn.width) {
	                    // If we're no longer standing on the other entity, un-stand
	                    // us from it.
	                    this.stopStanding();
	                } else if (estStandingY < this.standingOn.y) {
	                    // If the entity would be falling through the entity it is
	                    // on, terminate the fall.
	                    this.hitGround(this.standingOn.y + this.standingOn.height);
	                }
	            }
	            if (this.canStandOn && this.standingOn === null) {
	                // If we can stand on someone (and we're not already), check
	                // who we can stand on.
	                this.hitTestEntities(function (e) {
	                    if (!e.canBeStoodOn) return false;
	                    if (e.standingOn === _this3) return false;
	                    e.standers.add(_this3);
	                    _this3.standingOn = e;
	                    _this3.hitGround(e.y + e.height);
	                    if (e.velY) {
	                        _this3.velY += e.velY;
	                    }
	                    return true;
	                });
	            }
	        }
	    }, {
	        key: 'jump',
	        value: function jump(velY) {
	            this.velY += velY;
	            this.stopStanding();
	        }
	    }, {
	        key: 'stopStanding',
	        value: function stopStanding() {
	            if (this.standingOn !== null) {
	                this.standingOn.standers.delete(this);
	                this.standingOn = null;
	            }
	        }
	    }, {
	        key: 'calcPhysics',
	        value: function calcPhysics(delta, level) {
	            var _this4 = this;
	
	            var origY = this.y;
	            var origX = this.x;
	
	            var velX = this.standingOn ? this.standingOn.velX + this.velX : this.velX;
	            this.x += velX / delta * DELTA_RATIO;
	            if (velX !== 0.0) {
	                this.testCollisionSide(level);
	                if (this.canBePushed || this.canPush) {
	                    this.hitTestEntities(function (ent) {
	                        if (ent.canPush && _this4.canBePushed) {
	                            _this4.x = origX;
	                            return true;
	                        } else if (ent.canBePushed && _this4.canPush) {
	                            var hitX = velX > 0 ? ent.x - _this4.width : ent.x + _this4.width;
	                            _this4.hitWall(hitX);
	                            return true;
	                        }
	
	                        return false;
	                    });
	                }
	            }
	
	            this.y += this.velY / delta * DELTA_RATIO;
	            if (this.velY < 0) {
	                this.testCollisionDown(level, origY);
	                this.testFallingDown();
	            } else if (this.velY > 0) {
	                this.testCollisionUp(level);
	                this.updateUpwardsChain();
	            } else {
	                this.testFallingDown();
	            }
	
	            this.x = Math.max(this.x, 0);
	            this.x = Math.min(this.x, level.width - 1);
	
	            if (this.velY !== 0.0 && this.isInContactWithFloor) {
	                this.isInContactWithFloor = false;
	            }
	
	            this.velY -= GRAVITY / delta * DELTA_RATIO;
	            if (this.velY > MAX_SPEED) this.velY = MAX_SPEED;
	            if (-1 * this.velY > MAX_SPEED) this.velY = -1 * MAX_SPEED;else if (-1 * this.velY > MAX_SPEED) this.velY = -1 * MAX_SPEED;
	        }
	    }, {
	        key: 'hitWall',
	        value: function hitWall(stoppedX) {
	            this.velX = 0.0;
	            this.x = stoppedX;
	        }
	    }, {
	        key: 'sitOnChair',
	        value: function sitOnChair() {
	            // noop
	        }
	    }, {
	        key: 'headBump',
	        value: function headBump() {
	            this.velY = 0.0;
	            this.y = Math.floor(this.y) - this.height + 1;
	            this.jumpEnergy = 0;
	        }
	    }, {
	        key: 'bounce',
	        get: function get() {
	            return 0.0;
	        }
	    }, {
	        key: 'canBePushed',
	        get: function get() {
	            return false;
	        }
	    }, {
	        key: 'canBeStoodOn',
	        get: function get() {
	            return false;
	        }
	    }, {
	        key: 'canPush',
	        get: function get() {
	            return false;
	        }
	    }, {
	        key: 'canStandOn',
	        get: function get() {
	            return false;
	        }
	    }, {
	        key: 'complexJumps',
	        get: function get() {
	            return false;
	        }
	    }]);

	    return Entity;
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var jump_energy = exports.jump_energy = 160;
	var jump_energy_force = exports.jump_energy_force = 3;
	var jump_energy_force_ticks = exports.jump_energy_force_ticks = 40;
	var jump_force = exports.jump_force = 13;
	var jump_force_double = exports.jump_force_double = 10.0;
	var jump_force_double_falling = exports.jump_force_double_falling = 25.0;
	var sprite_tile_row = exports.sprite_tile_row = 5;
	var sprite_tile_size = exports.sprite_tile_size = 8;
	var tile_size = exports.tile_size = 32;
	var throw_force_x = exports.throw_force_x = 20;
	var throw_force_y = exports.throw_force_y = 10;
	var ladder_velocity = exports.ladder_velocity = 7.0;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _IMAGES;
	
	exports.canStand = canStand;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var TILE_AIR = exports.TILE_AIR = 0;
	var TILE_BRICK = exports.TILE_BRICK = 1;
	var TILE_ROCK = exports.TILE_ROCK = 2;
	var TILE_ROCK_LOOSE = exports.TILE_ROCK_LOOSE = 3;
	var TILE_CARVED_STONE = exports.TILE_CARVED_STONE = 4;
	var TILE_CRACKED_STONE = exports.TILE_CRACKED_STONE = 5;
	
	var TILE_DIRT = exports.TILE_DIRT = 6;
	var TILE_GRASS = exports.TILE_GRASS = 7;
	var TILE_WATER = exports.TILE_WATER = 10;
	var TILE_TRUNK = exports.TILE_TRUNK = 11;
	var TILE_LEAF = exports.TILE_LEAF = 12;
	var TILE_GLASS = exports.TILE_GLASS = 16;
	var TILE_LOG = exports.TILE_LOG = 17;
	var TILE_LADDER = exports.TILE_LADDER = 18;
	var TILE_DOOR_CLOSED = exports.TILE_DOOR_CLOSED = 19;
	var TILE_DOOR_OPEN = exports.TILE_DOOR_OPEN = 20;
	
	var TILE_CHAIR_LEFT = exports.TILE_CHAIR_LEFT = 21;
	var TILE_CHAIR_RIGHT = exports.TILE_CHAIR_RIGHT = 22;
	
	var TILE_SIGN_RIGHT = exports.TILE_SIGN_RIGHT = 23;
	var TILE_SIGN_RIGHT_UP = exports.TILE_SIGN_RIGHT_UP = 24;
	var TILE_SIGN_LEFT = exports.TILE_SIGN_LEFT = 25;
	var TILE_SIGN_STOP = exports.TILE_SIGN_STOP = 26;
	var TILE_SIGN_RIGHT_DOWN = exports.TILE_SIGN_RIGHT_DOWN = 27;
	var TILE_SIGN_Q = exports.TILE_SIGN_Q = 28;
	
	var IMAGES = exports.IMAGES = (_IMAGES = {}, _defineProperty(_IMAGES, TILE_BRICK, 0), _defineProperty(_IMAGES, TILE_ROCK, 1), _defineProperty(_IMAGES, TILE_ROCK_LOOSE, 2), _defineProperty(_IMAGES, TILE_CARVED_STONE, 3), _defineProperty(_IMAGES, TILE_CRACKED_STONE, 4), _defineProperty(_IMAGES, TILE_DIRT, 5), _defineProperty(_IMAGES, TILE_GRASS, 6), _defineProperty(_IMAGES, TILE_WATER, 9), _defineProperty(_IMAGES, TILE_TRUNK, 10), _defineProperty(_IMAGES, TILE_LEAF, 11), _defineProperty(_IMAGES, TILE_GLASS, 15), _defineProperty(_IMAGES, TILE_LOG, 16), _defineProperty(_IMAGES, TILE_LADDER, 17), _defineProperty(_IMAGES, TILE_DOOR_CLOSED, 18), _defineProperty(_IMAGES, TILE_DOOR_OPEN, 19), _defineProperty(_IMAGES, TILE_CHAIR_LEFT, 20), _defineProperty(_IMAGES, TILE_CHAIR_RIGHT, 21), _defineProperty(_IMAGES, TILE_SIGN_RIGHT, 22), _defineProperty(_IMAGES, TILE_SIGN_RIGHT_UP, 23), _defineProperty(_IMAGES, TILE_SIGN_LEFT, 24), _defineProperty(_IMAGES, TILE_SIGN_STOP, 25), _defineProperty(_IMAGES, TILE_SIGN_RIGHT_DOWN, 26), _defineProperty(_IMAGES, TILE_SIGN_Q, 27), _IMAGES);
	
	// Solid cannot be passed through.
	var SOLID = exports.SOLID = new Set([TILE_ROCK, TILE_ROCK_LOOSE, TILE_CARVED_STONE, TILE_CRACKED_STONE, TILE_DIRT, TILE_GRASS, TILE_BRICK, TILE_GLASS]);
	
	// Half solid is solid at half-height.
	var HALF_SOLID = exports.HALF_SOLID = new Set([TILE_CHAIR_LEFT, TILE_CHAIR_RIGHT]);
	
	// Cloud can only be passed through going up.
	var CLOUD = exports.CLOUD = new Set([TILE_LEAF, TILE_LOG]);
	
	function canStand(tile) {
	    return SOLID.has(tile) || CLOUD.has(tile);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.get = get;
	exports.waitFor = waitFor;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function loadImage(src) {
	    return new Promise(function (resolve) {
	        var img = new Image();
	        img.src = src;
	        img.onload = function () {
	            return resolve(img);
	        };
	    });
	}
	
	var images = {
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
	
	var all = exports.all = Promise.all(Object.keys(images).map(function (key) {
	    return images[key];
	}));
	
	var Drawable = function () {
	    function Drawable(name) {
	        var _this = this;
	
	        _classCallCheck(this, Drawable);
	
	        this.fetched = null;
	
	        this.future = images[name];
	        this.future.then(function (img) {
	            _this.fetched = img;
	        });
	    }
	
	    _createClass(Drawable, [{
	        key: 'draw',
	        value: function draw(drawer) {
	            if (this.fetched !== null) {
	                drawer(this.fetched);
	            }
	        }
	    }, {
	        key: 'drawEventually',
	        value: function drawEventually(drawer) {
	            this.future.then(drawer);
	        }
	    }]);
	
	    return Drawable;
	}();
	
	function get(name) {
	    return new Drawable(name);
	};
	
	function waitFor(names) {
	    return Promise.all(names.map(function (key) {
	        return images[key];
	    }));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ColinEntity = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _generic = __webpack_require__(7);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _settings = __webpack_require__(8);
	
	var settings = _interopRequireWildcard(_settings);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SPRITE_TILE = 8;
	var COLIN_JUMP_FORCE = 20.0;
	var COLIN_JUMP_TIMER_MIN = 2000;
	var COLIN_JUMP_TIMER_MAX = 4000;
	
	var ColinEntity = exports.ColinEntity = function (_Entity) {
	    _inherits(ColinEntity, _Entity);
	
	    function ColinEntity(x, y) {
	        _classCallCheck(this, ColinEntity);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColinEntity).call(this));
	
	        _this.x = x;
	        _this.y = y;
	
	        _this.image = images.get('entities');
	        return _this;
	    }
	
	    _createClass(ColinEntity, [{
	        key: 'reset',
	        value: function reset() {
	            this.jumpTimer = 0;
	            this.jumpDuration = COLIN_JUMP_TIMER_MIN;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, level, offsetX, offsetY) {
	            var _this2 = this;
	
	            this.image.draw(function (img) {
	                var x = _this2.isInContactWithFloor ? Math.floor(Date.now() / 350) % 2 : 2;
	                var locX = _this2.x * settings.tile_size;
	
	                if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;
	
	                ctx.drawImage(img, x * SPRITE_TILE, SPRITE_TILE, SPRITE_TILE, SPRITE_TILE, locX + offsetX, (level.height - _this2.y - _this2.height) * settings.tile_size + offsetY, settings.tile_size, settings.tile_size);
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, level) {
	
	            this.calcPhysics(delta, level);
	
	            this.jumpTimer += delta;
	            if (this.jumpTimer > this.jumpDuration) {
	                this.jumpTimer = 0;
	                this.jump(COLIN_JUMP_FORCE);
	                this.calculateJumpTime();
	            }
	
	            return true;
	        }
	    }, {
	        key: 'calculateJumpTime',
	        value: function calculateJumpTime() {
	            this.jumpDuration = Math.floor(Math.random() * (COLIN_JUMP_TIMER_MAX - COLIN_JUMP_TIMER_MIN)) + COLIN_JUMP_TIMER_MIN;
	        }
	    }, {
	        key: 'bounce',
	        get: function get() {
	            return 0.4;
	        }
	    }, {
	        key: 'canBePushed',
	        get: function get() {
	            return true;
	        }
	    }, {
	        key: 'canBeStoodOn',
	        get: function get() {
	            return true;
	        }
	    }, {
	        key: 'canPush',
	        get: function get() {
	            return true;
	        }
	    }, {
	        key: 'canStandOn',
	        get: function get() {
	            return true;
	        }
	    }, {
	        key: 'type',
	        get: function get() {
	            return 'colin';
	        }
	    }]);

	    return ColinEntity;
	}(_generic.Entity);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MelonEntity = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _entities = __webpack_require__(5);
	
	var entities = _interopRequireWildcard(_entities);
	
	var _generic = __webpack_require__(7);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _settings = __webpack_require__(8);
	
	var settings = _interopRequireWildcard(_settings);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SPRITE_TILE = 8;
	
	var MelonEntity = exports.MelonEntity = function (_Entity) {
	    _inherits(MelonEntity, _Entity);
	
	    function MelonEntity(x, y) {
	        _classCallCheck(this, MelonEntity);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MelonEntity).call(this));
	
	        _this.x = x;
	        _this.y = y;
	
	        _this.image = images.get('entities');
	        return _this;
	    }
	
	    _createClass(MelonEntity, [{
	        key: 'reset',
	        value: function reset() {
	            this.bouncing = false;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, level, offsetX, offsetY) {
	            var _this2 = this;
	
	            this.image.draw(function (img) {
	                var x = Math.floor(Date.now() / 250) % 3;
	                var locX = _this2.x * settings.tile_size;
	
	                if (locX + offsetX + settings.tile_size < 0 || locX + offsetX > ctx.canvas.width) return;
	
	                ctx.drawImage(img, x * SPRITE_TILE, 0, SPRITE_TILE, SPRITE_TILE, locX + offsetX, (level.height - _this2.y - _this2.height) * settings.tile_size + offsetY, settings.tile_size, settings.tile_size);
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, level) {
	            if (this.bouncing) {
	                this.calcPhysics(delta, level);
	                this.velX *= 0.95;
	                if (this.isInContactWithFloor && this.velX + this.velY < 1) {
	                    this.bouncing = false;
	                }
	
	                return true;
	            } else {
	                var player = entities.registry[0];
	
	                if (this.x > player.x + player.width) return true;
	                if (this.x + this.width < player.x) return true;
	                if (this.y > player.y + player.height) return true;
	                if (this.y + this.height < player.y) return true;
	
	                sound.play('melonCollect');
	                player.melonCount++;
	                return false;
	            }
	        }
	    }, {
	        key: 'bounce',
	        get: function get() {
	            return 0.5;
	        }
	    }, {
	        key: 'type',
	        get: function get() {
	            return 'melon';
	        }
	    }]);
	
	    return MelonEntity;
	}(_generic.Entity);
	
	;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = init;
	exports.play = play;
	
	var _jsfx = __webpack_require__(14);
	
	var _jsfx2 = _interopRequireDefault(_jsfx);
	
	var _audio = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var waves = {
	    'bastacorp': ["saw", 0.0000, 0.1930, 0.0000, 0.2680, 0.0000, 0.0040, 110.0000, 878.0000, 2400.0000, -0.9000, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.5000, -0.2960, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000],
	    'select': ["square", 2.0000, 0.1930, 0.0000, 0.0020, 0.5760, 0.2760, 20.0000, 850.0000, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000],
	    'jump': ["square", 0.0000, 0.1530, 0.0000, 0.1280, 0.0000, 0.0200, 20.0000, 339.0000, 971.0000, 0.4080, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.5000, 0.0000, 0.0000, 0.0000, 0.0000, 0.8070, 0.0000, 0.0000, 0.0000, 0.0000],
	    'doubleJump': ["square", 0.0000, 0.1530, 0.0000, 0.1280, 0.0000, 0.0200, 20.0000, 511.0000, 971.0000, 0.4080, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.5000, 0.0000, 0.0000, 0.0000, 0.0000, 0.8070, 0.0000, 0.0000, 0.0000, 0.0000],
	    'headBump': ["square", 9.0000, 0.0450, 0.0000, 0.0300, 0.0000, 0.0480, 20.0000, 150.0000, 2400.0000, -0.5780, -0.0740, 0.0000, 0.0100, 0.0003, 0.0000, -0.2660, 0.0000, 0.0590, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, -0.0040, 0.0000, 0.0000, -0.0140],
	    'drownInPool': ["saw", 0.0000, 0.1530, 0.0000, 0.9760, 0.0000, 0.1540, 112.0000, 467.0000, 594.0000, 0.1020, -0.9520, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.0120, 0.0640, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.1600, 0.0000],
	    'melonCollect': ["square", 0.0000, 0.0520, 0.0000, 0.0320, 0.4920, 0.3600, 20.0000, 1320.0000, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.2620, 0.1050, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000],
	    'keypress': ["noise", 0.0000, 0.0540, 0.0000, 0.0140, 0.7560, 0.0460, 20.0000, 1691.0000, 2400.0000, -0.2680, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, -0.1320, -0.1860, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000],
	    'badkeypress': ["sine", 0.0000, 0.2060, 0.0000, 0.0280, 0.0000, 0.0180, 20.0000, 425.0000, 1843.0000, -1.0000, -1.0000, 0.0000, 0.0100, -0.0673, 0.0000, 0.0000, 0.0000, 0.4555, 0.1460, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000],
	    'fellInHole': ["noise", 0.0000, 0.0750, 0.0000, 0.2700, 0.7890, 0.6200, 20.0000, 20.0000, 1512.0000, -0.7620, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.1280, 0.0000],
	    'throwMelon': ["synth", 0.0000, 0.0750, 0.0000, 0.0560, 0.0000, 0.0000, 20.0000, 616.0000, 2400.0000, 0.5540, -0.2400, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.7704, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000],
	    'ladder': ["noise", 0.0000, 0.0230, 0.0000, 0.0000, 0.0000, 0.0220, 20.0000, 1420.0000, 2400.0000, -0.3000, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, -0.4400, 0.8090, 0.0000, 0.0000, 0.0000, -0.0540, -0.1600, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000]
	};
	
	var _jsfxInst = null;
	
	var samples = {};
	
	function init() {
	    _jsfxInst = new _jsfx2.default();
	
	    Object.keys(waves).forEach(function (key) {
	        samples[key] = _jsfxInst.getSample(waves[key]);
	    });
	};
	
	function play(name) {
	    if ((0, _audio.isMuted)()) {
	        return;
	    }
	    _jsfxInst.playSample(samples[name]);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	var audio = {};
	(function (samplerate) {
	    this.SampleRate = samplerate || 44100;
	    var SampleRate = this.SampleRate;
	
	    // Do not modify parameters without changing code!
	    var BitsPerSample = 16;
	    var NumChannels = 1;
	    var BlockAlign = NumChannels * BitsPerSample >> 3;
	    var ByteRate = SampleRate * BlockAlign;
	
	    // helper functions
	    var chr = String.fromCharCode; // alias for getting converting int to char
	
	    //////////////////////
	    // Wave            ///
	    //////////////////////
	
	    var waveTag = "data:audio/wav;base64,";
	    // constructs a wave from sample array
	    var constructWave = function constructWave(data) {
	        var l;
	        return pack(["RIFF", 36 + (l = data.length), "WAVEfmt ", 16, 1, NumChannels, SampleRate, ByteRate, BlockAlign, BitsPerSample, "data", l, data], "s4s4224422s4s");
	    };
	
	    // creates an audio object from sample data
	    this.make = function (arr) {
	        return new Audio(waveTag + btoa(constructWave(arrayToData(arr))));
	    };
	
	    // creates a wave file for downloading
	    this.makeWaveFile = function (arr) {
	        dataToFile(waveTag + btoa(constructWave(arrayToData(arr))));
	    };
	
	    //////////////////////
	    // General stuff   ///
	    //////////////////////
	
	    // Converts an integer to String representation
	    //   a - number
	    //   i - number of bytes
	    var istr = function istr(a, i) {
	        var m8 = 0xff; // 8 bit mask
	        return i ? chr(a & m8) + istr(a >> 8, i - 1) : "";
	    };
	
	    // Packs array of data to a string
	    //   data   - array
	    //   format - s is for string, numbers denote bytes to store in
	    var pack = function pack(data, format) {
	        var out = "";
	        for (i = 0; i < data.length; i++) {
	            out += format[i] == "s" ? data[i] : istr(data[i], format.charCodeAt(i) - 48);
	        }return out;
	    };
	
	    var dataToFile = function dataToFile(data) {
	        document.location.href = data;
	    };
	
	    //////////////////////
	    // Audio Processing ///
	    //////////////////////
	
	    // Utilities
	    //////////////////////
	
	    // often used variables (just for convenience)
	    var count, out, i, sfreq;
	    var sin = Math.sin;
	    var TAU = 2 * Math.PI;
	    var Arr = function Arr(c) {
	        return new Array(c | 0);
	    }; // alias for creating a new array
	
	    var clamp8bit = function clamp8bit(a) {
	        return a < 0 ? 0 : 255 < a ? 255 : a;
	    };
	    var sample8bit = function sample8bit(a) {
	        return clamp(a * 127 + 127 | 0);
	    };
	
	    this.toTime = function (a) {
	        return a / SampleRate;
	    };
	    this.toSamples = function (a) {
	        return a * SampleRate;
	    };
	
	    var arrayToData16bit = function arrayToData16bit(arr) {
	        var out = "";
	        var len = arr.length;
	        for (i = 0; i < len; i++) {
	            var a = arr[i] * 32767 | 0;
	            a = a < -32768 ? -32768 : 32767 < a ? 32767 : a; // clamp
	            a += a < 0 ? 65536 : 0; // 2-s complement
	            out += String.fromCharCode(a & 255, a >> 8);
	        };
	        return out;
	    };
	
	    var arrayToData8bit = function arrayToData8bit(arr) {
	        var out = "";
	        var len = arr.length;
	        for (i = 0; i < len; i++) {
	            var a = arr[i] * 127 + 128 | 0;
	            a = a < 0 ? 0 : 255 < a ? 255 : a;
	            out += String.fromCharCode(a);
	        };
	        return out;
	    };
	
	    var arrayToData = function arrayToData(arr) {
	        if (BitsPerSample == 16) return arrayToData16bit(arr);else return arrayToData8bit(arr);
	    };
	
	    //////////////////////
	    // Processing
	    //////////////////////
	
	    // adjusts volume of a buffer
	    this.adjustVolume = function (data, v) {
	        for (i = 0; i < data.length; i++) {
	            data[i] *= v;
	        }return data;
	    };
	
	    // Filters
	    //////////////////////
	
	    this.filter = function (data, func, from, to, A, B, C, D, E, F) {
	        from = from ? from : 1;
	        to = to ? to : data.length;
	        out = data.slice(0);
	        for (i = from; i < to; i++) {
	            out[i] = func(data, out, from, to, i, A, B, C, D, E, F);
	        }return out;
	    };
	    var filter = this.filter;
	
	    this.filters = {
	        lowpass: function lowpass(data, out, from, to, pos, A) {
	            return out[pos - 1] + A * (data[pos] - out[pos - 1]);
	        },
	        lowpassx: function lowpassx(data, out, from, to, pos, A) {
	            return out[pos - 1] + A * (to - pos) / (to - from) * (data[pos] - out[pos - 1]);
	        },
	        highpass: function highpass(data, out, from, to, pos, A) {
	            return A * (out[pos - 1] + data[pos] - data[pos - 1]);
	        }
	    };
	    var filters = this.filters;
	
	    this.f = {
	        lowpass: function lowpass(data, from, to, A) {
	            return filter(data, filters.lowpass, from, to, A);
	        },
	        lowpassx: function lowpassx(data, from, to, A) {
	            return filter(data, filters.lowpassx, from, to, A);
	        },
	        highpass: function highpass(data, from, to, A) {
	            return filter(data, filters.highpass, from, to, A);
	        }
	    };
	
	    // Generators
	    //////////////////////
	
	    // general sound generation
	    // example:
	    // generate(3, 440, Math.sin);
	    this.generate = function (count, freq, func, A, B, C, D, E, F) {
	        var sfreq = freq * TAU / SampleRate;
	        var out = Arr(count);
	        for (i = 0; i < count; i++) {
	            out[i] = func(i * sfreq, A, B, C, D, E, F);
	        }return out;
	    };
	
	    var lastNoise = 0;
	
	    var generate = this.generate;
	    this.generators = {
	        noise: function noise(phase) {
	            if (phase % TAU < 4) {
	                lastNoise = Math.random() * 2 - 1;
	            }
	            return lastNoise;
	        },
	        uninoise: Math.random,
	        sine: Math.sin,
	        synth: function synth(phase) {
	            return sin(phase) + .5 * sin(phase / 2) + .3 * sin(phase / 4);
	        },
	        saw: function saw(phase) {
	            return 2 * (phase / TAU - (phase / TAU + 0.5 | 0));
	        },
	        square: function square(phase, A) {
	            return sin(phase) > A ? 1.0 : sin(phase) < A ? -1.0 : A;
	        }
	    };
	    var generators = this.generators;
	
	    this.g = {
	        noise: function noise(count) {
	            return generate(count, 0, generators.noise);
	        },
	        sine: function sine(count, freq) {
	            return generate(count, freq, generators.sine);
	        },
	        synth: function synth(count, freq) {
	            return generate(count, freq, generators.synth);
	        },
	        saw: function saw(count, freq) {
	            return generate(count, freq, generators.saw);
	        },
	        square: function square(count, freq, A) {
	            return generate(count, freq, generators.square, A);
	        }
	    };
	}).apply(audio);
	
	var jsfxlib = {};
	(function () {
	    // takes object with param arrays
	    // audiolib = {
	    //   Sound : ["sine", 1, 2, 4, 1...
	    // }
	    //
	    // returns object with audio samples
	    // p.Sound.play()
	    this.createWaves = function (lib) {
	        var sounds = {};
	        for (var e in lib) {
	            var data = lib[e];
	            sounds[e] = this.createWave(data);
	        }
	        return sounds;
	    };
	
	    /* Create a single sound:
	       var p = jsfxlib.createWave(["sine", 1,2,3, etc.]);
	       p.play();
	    */
	    this.createWave = function (lib) {
	        var params = this.arrayToParams(lib),
	            data = jsfx.generate(params),
	            wave = audio.make(data);
	
	        return wave;
	    };
	
	    this.paramsToArray = function (params) {
	        var pararr = [];
	        var len = jsfx.Parameters.length;
	        for (var i = 0; i < len; i++) {
	            pararr.push(params[jsfx.Parameters[i].id]);
	        }
	        return pararr;
	    };
	
	    this.arrayToParams = function (pararr) {
	        var params = {};
	        var len = jsfx.Parameters.length;
	        for (var i = 0; i < len; i++) {
	            params[jsfx.Parameters[i].id] = pararr[i];
	        }
	        return params;
	    };
	}).apply(jsfxlib);
	
	var jsfx = {};
	(function () {
	    this.Parameters = []; // will be constructed in the end
	
	    this.Generators = {
	        square: audio.generators.square,
	        saw: audio.generators.saw,
	        sine: audio.generators.sine,
	        noise: audio.generators.noise,
	        synth: audio.generators.synth
	    };
	
	    this.getGeneratorNames = function () {
	        var names = [];
	        for (var e in this.Generators) {
	            names.push(e);
	        }return names;
	    };
	
	    var nameToParam = function nameToParam(name) {
	        return name.replace(/ /g, "");
	    };
	
	    this.getParameters = function () {
	        var params = [];
	
	        var grp = 0;
	
	        // add param
	        var ap = function ap(name, min, max, def, step) {
	            if (step === undefined) step = (max - min) / 1000;
	            var param = { name: name, id: nameToParam(name),
	                min: min, max: max, step: step, def: def,
	                type: "range", group: grp };
	            params.push(param);
	        };
	
	        // add option
	        var ao = function ao(name, options, def) {
	            var param = { name: name, id: nameToParam(name),
	                options: options, def: def,
	                type: "option", group: grp };
	            params.push(param);
	        };
	
	        var gens = this.getGeneratorNames();
	        ao("Generator", gens, gens[0]);
	        ap("Super Sampling Quality", 0, 16, 0, 1);
	        ap("Master Volume", 0, 1, 0.4);
	        grp++;
	
	        ap("Attack Time", 0, 1, 0.1); // seconds
	        ap("Sustain Time", 0, 2, 0.3); // seconds
	        ap("Sustain Punch", 0, 3, 2);
	        ap("Decay Time", 0, 2, 1); // seconds
	        grp++;
	
	        ap("Min Frequency", 20, 2400, 0, 1);
	        ap("Start Frequency", 20, 2400, 440, 1);
	        ap("Max Frequency", 20, 2400, 2000, 1);
	        ap("Slide", -1, 1, 0);
	        ap("Delta Slide", -1, 1, 0);
	
	        grp++;
	        ap("Vibrato Depth", 0, 1, 0);
	        ap("Vibrato Frequency", 0.01, 48, 8);
	        ap("Vibrato Depth Slide", -0.3, 1, 0);
	        ap("Vibrato Frequency Slide", -1, 1, 0);
	
	        grp++;
	        ap("Change Amount", -1, 1, 0);
	        ap("Change Speed", 0, 1, 0.1);
	
	        grp++;
	        ap("Square Duty", 0, 0.5, 0);
	        ap("Square Duty Sweep", -1, 1, 0);
	
	        grp++;
	        ap("Repeat Speed", 0, 0.8, 0);
	
	        grp++;
	        ap("Phaser Offset", -1, 1, 0);
	        ap("Phaser Sweep", -1, 1, 0);
	
	        grp++;
	        ap("LP Filter Cutoff", 0, 1, 1);
	        ap("LP Filter Cutoff Sweep", -1, 1, 0);
	        ap("LP Filter Resonance", 0, 1, 0);
	        ap("HP Filter Cutoff", 0, 1, 0);
	        ap("HP Filter Cutoff Sweep", -1, 1, 0);
	
	        return params;
	    };
	
	    /**
	     * Input params object has the same parameters as described above
	     * except all the spaces have been removed
	     *
	     * This returns an array of float values of the generated audio.
	     *
	     * To make it into a wave use:
	     *    data = jsfx.generate(params)
	     *    audio.make(data)
	     */
	    this.generate = function (params) {
	        // useful consts/functions
	        var TAU = 2 * Math.PI,
	            sin = Math.sin,
	            cos = Math.cos,
	            pow = Math.pow,
	            abs = Math.abs;
	        var SampleRate = audio.SampleRate;
	
	        // super sampling
	        var super_sampling_quality = params.SuperSamplingQuality | 0;
	        if (super_sampling_quality < 1) super_sampling_quality = 1;
	        SampleRate = SampleRate * super_sampling_quality;
	
	        // enveloping initialization
	        var _ss = 1.0 + params.SustainPunch;
	        var envelopes = [{ from: 0.0, to: 1.0, time: params.AttackTime }, { from: _ss, to: 1.0, time: params.SustainTime }, { from: 1.0, to: 0.0, time: params.DecayTime }];
	        var envelopes_len = envelopes.length;
	
	        // envelope sample calculation
	        for (var i = 0; i < envelopes_len; i++) {
	            envelopes[i].samples = 1 + (envelopes[i].time * SampleRate | 0);
	        }
	        // envelope loop variables
	        var envelope = undefined;
	        var envelope_cur = 0.0;
	        var envelope_idx = -1;
	        var envelope_increment = 0.0;
	        var envelope_last = -1;
	
	        // count total samples
	        var totalSamples = 0;
	        for (var i = 0; i < envelopes_len; i++) {
	            totalSamples += envelopes[i].samples;
	        }
	
	        // fix totalSample limit
	        if (totalSamples < SampleRate / 2) {
	            totalSamples = SampleRate / 2;
	        }
	
	        var outSamples = totalSamples / super_sampling_quality | 0;
	
	        // out data samples
	        var out = new Array(outSamples);
	        var sample = 0;
	        var sample_accumulator = 0;
	
	        // main generator
	        var generator = jsfx.Generators[params.Generator];
	        if (generator === undefined) generator = this.Generators.square;
	        var generator_A = 0;
	        var generator_B = 0;
	
	        // square generator
	        generator_A = params.SquareDuty;
	        var square_slide = params.SquareDutySweep / SampleRate;
	
	        // phase calculation
	        var phase = 0;
	        var phase_speed = params.StartFrequency * TAU / SampleRate;
	
	        // phase slide calculation
	        var phase_slide = 1.0 + pow(params.Slide, 3.0) * 64.0 / SampleRate;
	        var phase_delta_slide = pow(params.DeltaSlide, 3.0) / (SampleRate * 1000);
	        if (super_sampling_quality !== undefined) phase_delta_slide /= super_sampling_quality; // correction
	
	        // frequency limiter
	        if (params.MinFrequency > params.StartFrequency) params.MinFrequency = params.StartFrequency;
	
	        if (params.MaxFrequency < params.StartFrequency) params.MaxFrequency = params.StartFrequency;
	
	        var phase_min_speed = params.MinFrequency * TAU / SampleRate;
	        var phase_max_speed = params.MaxFrequency * TAU / SampleRate;
	
	        // frequency vibrato
	        var vibrato_phase = 0;
	        var vibrato_phase_speed = params.VibratoFrequency * TAU / SampleRate;
	        var vibrato_amplitude = params.VibratoDepth;
	
	        // frequency vibrato slide
	        var vibrato_phase_slide = 1.0 + pow(params.VibratoFrequencySlide, 3.0) * 3.0 / SampleRate;
	        var vibrato_amplitude_slide = params.VibratoDepthSlide / SampleRate;
	
	        // arpeggiator
	        var arpeggiator_time = 0;
	        var arpeggiator_limit = params.ChangeSpeed * SampleRate;
	        var arpeggiator_mod = pow(params.ChangeAmount, 2);
	        if (params.ChangeAmount > 0) arpeggiator_mod = 1 + arpeggiator_mod * 10;else arpeggiator_mod = 1 - arpeggiator_mod * 0.9;
	
	        // phaser
	        var phaser_max = 1024;
	        var phaser_mask = 1023;
	        var phaser_buffer = new Array(phaser_max);
	        for (var _i = 0; _i < phaser_max; _i++) {
	            phaser_buffer[_i] = 0;
	        }var phaser_pos = 0;
	        var phaser_offset = pow(params.PhaserOffset, 2.0) * (phaser_max - 4);
	        var phaser_offset_slide = pow(params.PhaserSweep, 3.0) * 4000 / SampleRate;
	        var phaser_enabled = abs(phaser_offset_slide) > 0.00001 || abs(phaser_offset) > 0.00001;
	
	        // lowpass filter
	        var filters_enabled = params.HPFilterCutoff > 0.001 || params.LPFilterCutoff < 0.999;
	
	        var lowpass_pos = 0;
	        var lowpass_pos_slide = 0;
	        var lowpass_cutoff = pow(params.LPFilterCutoff, 3.0) / 10;
	        var lowpass_cutoff_slide = 1.0 + params.HPFilterCutoffSweep / 10000;
	        var lowpass_damping = 5.0 / (1.0 + pow(params.LPFilterResonance, 2) * 20) * (0.01 + params.LPFilterCutoff);
	        if (lowpass_damping > 0.8) lowpass_damping = 0.8;
	        lowpass_damping = 1.0 - lowpass_damping;
	        var lowpass_enabled = params.LPFilterCutoff < 0.999;
	
	        // highpass filter
	        var highpass_accumulator = 0;
	        var highpass_cutoff = pow(params.HPFilterCutoff, 2.0) / 10;
	        var highpass_cutoff_slide = 1.0 + params.HPFilterCutoffSweep / 10000;
	
	        // repeat
	        var repeat_time = 0;
	        var repeat_limit = totalSamples;
	        if (params.RepeatSpeed > 0) {
	            repeat_limit = pow(1 - params.RepeatSpeed, 2.0) * SampleRate + 32;
	        }
	
	        // master volume controller
	        var master_volume = params.MasterVolume;
	
	        var k = 0;
	        for (var i = 0; i < totalSamples; i++) {
	            // main generator
	            sample = generator(phase, generator_A, generator_B);
	
	            // square generator
	            generator_A += square_slide;
	            if (generator_A < 0.0) {
	                generator_A = 0.0;
	            } else if (generator_A > 0.5) {
	                generator_A = 0.5;
	            }
	
	            if (repeat_time > repeat_limit) {
	                // phase reset
	                phase = 0;
	                phase_speed = params.StartFrequency * TAU / SampleRate;
	                // phase slide reset
	                phase_slide = 1.0 + pow(params.Slide, 3.0) * 3.0 / SampleRate;
	                phase_delta_slide = pow(params.DeltaSlide, 3.0) / (SampleRate * 1000);
	                if (super_sampling_quality !== undefined) phase_delta_slide /= super_sampling_quality; // correction
	                // arpeggiator reset
	                arpeggiator_time = 0;
	                arpeggiator_limit = params.ChangeSpeed * SampleRate;
	                arpeggiator_mod = 1 + (params.ChangeAmount | 0) / 12.0;
	                // repeat reset
	                repeat_time = 0;
	            }
	            repeat_time += 1;
	
	            // phase calculation
	            phase += phase_speed;
	
	            // phase slide calculation
	            phase_slide += phase_delta_slide;
	            phase_speed *= phase_slide;
	
	            // arpeggiator
	            if (arpeggiator_time > arpeggiator_limit) {
	                phase_speed *= arpeggiator_mod;
	                arpeggiator_limit = totalSamples;
	            }
	            arpeggiator_time += 1;
	
	            // frequency limiter
	            if (phase_speed > phase_max_speed) {
	                phase_speed = phase_max_speed;
	            } else if (phase_speed < phase_min_speed) {
	                phase_speed = phase_min_speed;
	            }
	
	            // frequency vibrato
	            vibrato_phase += vibrato_phase_speed;
	            var _vibrato_phase_mod = phase_speed * sin(vibrato_phase) * vibrato_amplitude;
	            phase += _vibrato_phase_mod;
	
	            // frequency vibrato slide
	            vibrato_phase_speed *= vibrato_phase_slide;
	            if (vibrato_amplitude_slide) {
	                vibrato_amplitude += vibrato_amplitude_slide;
	                if (vibrato_amplitude < 0) {
	                    vibrato_amplitude = 0;
	                    vibrato_amplitude_slide = 0;
	                } else if (vibrato_amplitude > 1) {
	                    vibrato_amplitude = 1;
	                    vibrato_amplitude_slide = 0;
	                }
	            }
	
	            // filters
	            if (filters_enabled) {
	
	                if (abs(highpass_cutoff) > 0.001) {
	                    highpass_cutoff *= highpass_cutoff_slide;
	                    if (highpass_cutoff < 0.00001) {
	                        highpass_cutoff = 0.00001;
	                    } else if (highpass_cutoff > 0.1) {
	                        highpass_cutoff = 0.1;
	                    }
	                }
	
	                var _lowpass_pos_old = lowpass_pos;
	                lowpass_cutoff *= lowpass_cutoff_slide;
	                if (lowpass_cutoff < 0.0) {
	                    lowpass_cutoff = 0.0;
	                } else if (lowpass_cutoff > 0.1) {
	                    lowpass_cutoff = 0.1;
	                }
	                if (lowpass_enabled) {
	                    lowpass_pos_slide += (sample - lowpass_pos) * lowpass_cutoff;
	                    lowpass_pos_slide *= lowpass_damping;
	                } else {
	                    lowpass_pos = sample;
	                    lowpass_pos_slide = 0;
	                }
	                lowpass_pos += lowpass_pos_slide;
	
	                highpass_accumulator += lowpass_pos - _lowpass_pos_old;
	                highpass_accumulator *= 1.0 - highpass_cutoff;
	                sample = highpass_accumulator;
	            }
	
	            // phaser
	            if (phaser_enabled) {
	                phaser_offset += phaser_offset_slide;
	                if (phaser_offset < 0) {
	                    phaser_offset = -phaser_offset;
	                    phaser_offset_slide = -phaser_offset_slide;
	                }
	                if (phaser_offset > phaser_mask) {
	                    phaser_offset = phaser_mask;
	                    phaser_offset_slide = 0;
	                }
	
	                phaser_buffer[phaser_pos] = sample;
	                // phaser sample modification
	                var _p = phaser_pos - (phaser_offset | 0) + phaser_max & phaser_mask;
	                sample += phaser_buffer[_p];
	                phaser_pos = phaser_pos + 1 & phaser_mask;
	            }
	
	            // envelope processing
	            if (i > envelope_last) {
	                envelope_idx += 1;
	                if (envelope_idx < envelopes_len) // fault protection
	                    envelope = envelopes[envelope_idx];else // the trailing envelope is silence
	                    envelope = { from: 0, to: 0, samples: totalSamples };
	                envelope_cur = envelope.from;
	                envelope_increment = (envelope.to - envelope.from) / (envelope.samples + 1);
	                envelope_last += envelope.samples;
	            }
	            sample *= envelope_cur;
	            envelope_cur += envelope_increment;
	
	            // master volume controller
	            sample *= master_volume;
	
	            // prepare for next sample
	            if (super_sampling_quality > 1) {
	                sample_accumulator += sample;
	                if ((i + 1) % super_sampling_quality === 0) {
	                    out[k] = sample_accumulator / super_sampling_quality;
	                    k += 1;
	                    sample_accumulator = 0;
	                }
	            } else {
	                out[i] = sample;
	            }
	        }
	
	        // return out;
	
	        // add padding 10ms
	        var len = SampleRate / 100 | 0;
	        var padding = new Array(len);
	        for (var i = 0; i < len; i++) {
	            padding[i] = 0;
	        }return padding.concat(out).concat(padding);
	    };
	
	    this.Parameters = this.getParameters();
	}).apply(jsfx);
	
	module.exports = function JSFX() {
	
	    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	
	    this.arrayToParams = jsfxlib.arrayToParams.bind(jsfxlib);
	    this.createWave = jsfxlib.createWave.bind(jsfxlib);
	    this.createWaves = jsfxlib.createWaves.bind(jsfxlib);
	    this.generate = jsfx.generate.bind(jsfx);
	
	    this.getSample = function (data) {
	        var waveform = this.generate(this.arrayToParams(data));
	        var buffer = audioCtx.createBuffer(1, waveform.length, 44100);
	        var fArr = buffer.getChannelData(0);
	        for (var i = 0; i < fArr.length; i++) {
	            fArr[i] = waveform[i];
	        }
	        var sample = audioCtx.createBufferSource();
	        sample.buffer = buffer;
	        sample.connect(audioCtx.destination);
	        return sample;
	    };
	
	    this.playSample = function (orig) {
	        var cloned = audioCtx.createBufferSource();
	        cloned.buffer = orig.buffer;
	        // cloned.playbackRate = orig.playbackRate;
	        cloned.connect(audioCtx.destination);
	        cloned.start(0);
	    };
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Player = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _generic = __webpack_require__(7);
	
	var _melon = __webpack_require__(12);
	
	var _entities = __webpack_require__(5);
	
	var entities = _interopRequireWildcard(_entities);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _keys = __webpack_require__(16);
	
	var keys = _interopRequireWildcard(_keys);
	
	var _settings = __webpack_require__(8);
	
	var settings = _interopRequireWildcard(_settings);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DIR_LEFT = 0;
	var DIR_RIGHT = 1;
	var SPRITE_TILE = 8;
	
	var Player = exports.Player = function (_Entity) {
	    _inherits(Player, _Entity);
	
	    function Player() {
	        _classCallCheck(this, Player);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this));
	
	        _this.image = images.get('blueman');
	
	        _this.ducking = false;
	        _this.walking = false;
	        _this.didSitInChair = false;
	        _this.shouldThrowMelon = false;
	        _this.ladderCounter = 0;
	
	        _this.melonCount = 0;
	
	        keys.down.on(81, function () {
	            // Q
	            _this.shouldThrowMelon = true;
	        });
	        return _this;
	    }
	
	    _createClass(Player, [{
	        key: 'canBePushed',
	        value: function canBePushed() {
	            return true;
	        }
	    }, {
	        key: 'canBeStoodOn',
	        value: function canBeStoodOn() {
	            return true;
	        }
	    }, {
	        key: 'canPush',
	        value: function canPush() {
	            return true;
	        }
	    }, {
	        key: 'canStandOn',
	        value: function canStandOn() {
	            return true;
	        }
	    }, {
	        key: 'type',
	        value: function type() {
	            return 'player';
	        }
	    }, {
	        key: 'complexJumps',
	        value: function complexJumps() {
	            return true;
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.x = 1.0;
	            this.y = 5.0;
	            this.ducking = false;
	            this.walking = false;
	            this.didSitInChair = false;
	            this.shouldThrowMelon = false;
	            this.melonCount = 0;
	
	            this.direction = DIR_RIGHT;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, level, offsetX, offsetY) {
	            var _this2 = this;
	
	            this.image.draw(function (img) {
	                var now = Date.now();
	                var x = 4; // Default pose
	                // If the player is walking, make them wiggle between states 5 and 6
	                if (_this2.walking) {
	                    x += Math.floor(now / 200) % 2 + 1;
	                } else if (_this2.ducking) {
	                    x = 2;
	                }
	                if (_this2.velY < -10 && !_this2.ducking) {
	                    x = 0;
	                }
	
	                ctx.drawImage(img, x * SPRITE_TILE, _this2.direction * SPRITE_TILE, SPRITE_TILE, SPRITE_TILE, _this2.x * settings.tile_size + offsetX, (level.height - _this2.y - _this2.height) * settings.tile_size + offsetY, settings.tile_size, settings.tile_size);
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, level) {
	            if (this.y < -1) {
	                return true;
	            }
	            if (this.didSitInChair) {
	                level.sitByPool();
	                return true;
	            }
	
	            var nearestLadder = this.nearestLadder(level);
	            var onLadder = nearestLadder !== -1;
	            var jumpCondition = keys.upArrow && !this.testHitUp(level) && !onLadder;
	
	            if (jumpCondition && this.isInContactWithFloor) {
	                this.jump(settings.jump_force * (this.ducking ? 0.75 : 1));
	                this.isInContactWithFloor = false;
	                this.jumpEnergy--;
	                sound.play('jump');
	                this.canDoubleJump = false;
	            } else if (keys.upArrow && !this.didDoubleJump && this.canDoubleJump) {
	                if (this.velY < -5) {
	                    this.jump(settings.jump_force_double_falling);
	                } else {
	                    this.jump(settings.jump_force_double);
	                }
	                sound.play('doubleJump');
	                this.didDoubleJump = true;
	            } else if (!keys.upArrow) {
	                this.canDoubleJump = true;
	            } else if (jumpCondition && this.jumpEnergy !== 0) {
	                this.velY += settings.jump_energy_force * (delta / settings.jump_energy_force_ticks);
	
	                this.jumpEnergy -= delta;
	                this.jumpEnergy = Math.max(this.jumpEnergy, 0);
	            } else if (keys.upArrow && onLadder) {
	                this.velY = settings.ladder_velocity;
	                this.jumpEnergy = settings.jump_energy;
	                this.canDoubleJump = false;
	                this.didDoubleJump = false;
	                this.x = (nearestLadder + this.x * 5) / 6;
	                if (Math.abs(nearestLadder - this.x) < 0.1) {
	                    this.x = nearestLadder;
	                }
	
	                var origLadderCount = this.ladderCounter;
	                this.ladderCounter += delta;
	                if (Math.floor(origLadderCount / 150) !== Math.floor(this.ladderCounter / 150)) {
	                    sound.play('ladder');
	                }
	            }
	
	            if (!keys.upArrow && !this.isInContactWithFloor) {
	                this.jumpEnergy = 0;
	            }
	
	            if (keys.downArrow) {
	                this.velX *= 0.6;
	                this.walking = false;
	                this.ducking = true;
	            }
	
	            if (!keys.downArrow || !this.isInContactWithFloor) {
	                this.ducking = keys.downArrow;
	                if (keys.leftArrow) {
	                    this.direction = DIR_LEFT;
	                    this.velX = -8.5;
	                    this.walking = !keys.downArrow;
	                } else if (keys.rightArrow) {
	                    this.direction = DIR_RIGHT;
	                    this.velX = 8.5;
	                    this.walking = !keys.downArrow;
	                } else {
	                    if (Math.abs(this.velX) > 0.001) {
	                        this.velX *= 0.65;
	                    } else {
	                        this.velX = 0.0;
	                    }
	                    this.walking = false;
	                }
	            }
	
	            this.calcPhysics(delta, level);
	
	            if (this.x > level.width - 10 && this.y < -1) {
	                level.drownedInPool();
	            } else if (this.y < -1) {
	                level.fellInHole();
	            }
	
	            if (this.shouldThrowMelon) {
	                this.shouldThrowMelon = false;
	                this.throwMelon();
	            }
	
	            return true;
	        }
	    }, {
	        key: 'sitOnChair',
	        value: function sitOnChair() {
	            if (keys.downArrow) {
	                sound.play('select');
	                this.didSitInChair = true;
	            }
	        }
	    }, {
	        key: 'headBump',
	        value: function headBump() {
	            _get(Object.getPrototypeOf(Player.prototype), 'headBump', this).call(this);
	            sound.play('headBump');
	        }
	    }, {
	        key: 'throwMelon',
	        value: function throwMelon() {
	            if (this.melonCount <= 0) return;
	            this.melonCount--;
	
	            sound.play('throwMelon');
	            var melon = new _melon.MelonEntity(Math.floor(this.x), Math.floor(this.y));
	            melon.bouncing = true;
	            melon.velY = this.velY + settings.throw_force_y;
	            melon.velX = settings.throw_force_x * (this.direction === DIR_LEFT ? -1 : 1);
	            entities.registry.push(melon);
	        }
	    }]);
	
	    return Player;
	}(_generic.Entity);
	
	;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.down = exports.up = undefined;
	exports.init = init;
	
	var _events = __webpack_require__(17);
	
	var up = exports.up = new _events.EventTarget();
	var down = exports.down = new _events.EventTarget();
	
	exports.downArrow = false;
	exports.leftArrow = false;
	exports.rightArrow = false;
	exports.upArrow = false;
	
	function keypress(e, wasSet) {
	    if (!e.metaKey && !e.altKey) {
	        e.preventDefault();
	    }
	    switch (e.keyCode) {
	        case 37: // Left
	        case 65:
	            // A
	            exports.leftArrow = wasSet;
	            break;
	        case 38: // Up
	        case 87:
	            // W
	            exports.upArrow = wasSet;
	            break;
	        case 39: // Right
	        case 68:
	            // D
	            exports.rightArrow = wasSet;
	            break;
	        case 40: // Down
	        case 83:
	            // S
	            exports.downArrow = wasSet;
	            break;
	    }
	    if (wasSet) {
	        down.fire(e.keyCode, e);
	        down.fire('any', e);
	    } else {
	        up.fire(e.keyCode, e);
	        up.fire('any', e);
	    }
	}
	
	function init() {
	    window.addEventListener('keydown', function (e) {
	        keypress(e, true);
	    });
	    window.addEventListener('keyup', function (e) {
	        keypress(e, false);
	    });
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventTarget = exports.EventTarget = function () {
	    function EventTarget() {
	        _classCallCheck(this, EventTarget);
	
	        this.listeners = new Map();
	        this.oneListeners = new Map();
	    }
	
	    _createClass(EventTarget, [{
	        key: "fire",
	        value: function fire(name) {
	            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                data[_key - 1] = arguments[_key];
	            }
	
	            if (this.listeners.has(name)) {
	                this.listeners.get(name).forEach(function (listener) {
	                    listener.apply(undefined, data);
	                });
	            }
	            if (this.oneListeners.has(name)) {
	                this.oneListeners.get(name).forEach(function (listener) {
	                    listener.apply(undefined, data);
	                });
	                this.oneListeners.delete(name);
	            }
	        }
	    }, {
	        key: "on",
	        value: function on(name, listener) {
	            if (!this.listeners.has(name)) {
	                this.listeners.set(name, new Set());
	            }
	            this.listeners.get(name).add(listener);
	        }
	    }, {
	        key: "one",
	        value: function one(name, listener) {
	            if (!this.oneListeners.has(name)) {
	                this.oneListeners.set(name, new Set());
	            }
	            this.oneListeners.get(name).add(listener);
	        }
	    }, {
	        key: "off",
	        value: function off(name, listener) {
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
	    }]);
	
	    return EventTarget;
	}();
	
	;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = init;
	exports.goTo = goTo;
	exports.getCurrent = getCurrent;
	exports.goToDisability = goToDisability;
	exports.next = next;
	
	var _audio = __webpack_require__(2);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _level = __webpack_require__(19);
	
	var _leveldata = __webpack_require__(29);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var levels = [];
	
	var DISABILITY_LEVEL = -1;
	var CURRENT_LEVEL = 0;
	
	function init() {
	    levels.push(new _level.LevelTitle('bastacorp', 750, 'bastacorp'));
	    levels.push(new _level.LevelMenu('menu', 'title'));
	
	    _leveldata.LEVELS.forEach(function (level) {
	        levels.push(new _level.LevelPlatform(level['width'], level['height'], level['content'], level['entities']));
	        levels.push(new _level.LevelMelonomics());
	    });
	
	    levels.push(new _level.LevelDisability());
	
	    DISABILITY_LEVEL = levels.length - 1;
	
	    levels[0].reset();
	};
	
	function goTo(level) {
	    CURRENT_LEVEL = level;
	    audio.stop();
	    levels[CURRENT_LEVEL].reset();
	};
	
	function getCurrent() {
	    return levels[CURRENT_LEVEL];
	};
	
	function goToDisability() {
	    goTo(DISABILITY_LEVEL);
	};
	
	function next() {
	    CURRENT_LEVEL += 1;
	    if (CURRENT_LEVEL === levels.length) {
	        CURRENT_LEVEL = 0;
	    }
	    goTo(CURRENT_LEVEL);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _disability = __webpack_require__(20);
	
	Object.defineProperty(exports, 'LevelDisability', {
	  enumerable: true,
	  get: function get() {
	    return _disability.LevelDisability;
	  }
	});
	
	var _generic = __webpack_require__(21);
	
	Object.defineProperty(exports, 'LevelGeneric', {
	  enumerable: true,
	  get: function get() {
	    return _generic.LevelGeneric;
	  }
	});
	
	var _melonomics = __webpack_require__(22);
	
	Object.defineProperty(exports, 'LevelMelonomics', {
	  enumerable: true,
	  get: function get() {
	    return _melonomics.LevelMelonomics;
	  }
	});
	
	var _menu = __webpack_require__(23);
	
	Object.defineProperty(exports, 'LevelMenu', {
	  enumerable: true,
	  get: function get() {
	    return _menu.LevelMenu;
	  }
	});
	
	var _platform = __webpack_require__(24);
	
	Object.defineProperty(exports, 'LevelPlatform', {
	  enumerable: true,
	  get: function get() {
	    return _platform.LevelPlatform;
	  }
	});
	
	var _title = __webpack_require__(28);
	
	Object.defineProperty(exports, 'LevelTitle', {
	  enumerable: true,
	  get: function get() {
	    return _title.LevelTitle;
	  }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LevelDisability = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audio = __webpack_require__(2);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _generic = __webpack_require__(21);
	
	var _keys = __webpack_require__(16);
	
	var keys = _interopRequireWildcard(_keys);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DENIED_TEXT = 'APPLICATION DENIED';
	
	var LevelDisability = exports.LevelDisability = function (_Level) {
	    _inherits(LevelDisability, _Level);
	
	    function LevelDisability() {
	        _classCallCheck(this, LevelDisability);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelDisability).call(this));
	
	        _this.enteredText = '';
	        _this.active = false;
	        _this.entered = -1;
	
	        _this.image = images.get('disabilityBenefits');
	
	        keys.up.on('any', function (e) {
	            if (!_this.active || _this.entered > 0) return;
	            if (e.metaKey || e.altKey) return;
	
	            e.preventDefault();
	
	            // Handle Enter
	            if (e.keyCode === 13) {
	                if (!_this.enteredText) {
	                    sound.play('badkeypress');
	                    return;
	                }
	                _this.entered = 1500;
	                sound.play('keypress');
	                return;
	            }
	            // Handle backspace
	            if (e.keyCode === 8) {
	                if (!_this.enteredText) {
	                    sound.play('badkeypress');
	                    return;
	                }
	                _this.enteredText = _this.enteredText.substring(0, _this.enteredText.length - 1);
	                sound.play('keypress');
	                return;
	            }
	            // Handle everything else
	            if (_this.enteredText.length < 10) {
	                _this.enteredText += String.fromCharCode(e.keyCode);
	            }
	
	            sound.play('keypress');
	        });
	        return _this;
	    }
	
	    _createClass(LevelDisability, [{
	        key: 'reset',
	        value: function reset() {
	            audio.playLoop('hero');
	            this.active = true;
	            this.entered = -1;
	            this.enteredText = '';
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, drawUI) {
	            var _this2 = this;
	
	            ctx.fillStyle = '#111';
	            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	            this.image.draw(function (img) {
	                var headerWidth = ctx.canvas.width * 0.4;
	                var headerHeight = headerWidth / img.width * img.height;
	                ctx.drawImage(img, 0, 0, img.width, img.height, ctx.canvas.width / 2 - headerWidth / 2, ctx.canvas.height / 2 - headerHeight / 2, headerWidth, headerHeight);
	
	                var measured = void 0;
	
	                if (_this2.entered > -1) {
	                    ctx.fillStyle = '#f00';
	                    measured = ctx.measureText(DENIED_TEXT);
	                    ctx.fillText(DENIED_TEXT, ctx.canvas.width / 2 - measured.width / 2, ctx.canvas.height / 2 + headerHeight / 2 - 15);
	                    return;
	                }
	
	                if (_this2.enteredText !== '') {
	                    ctx.fillStyle = '#fff';
	                    measured = ctx.measureText(_this2.enteredText);
	                    ctx.fillText(_this2.enteredText, ctx.canvas.width / 2 - measured.width / 2, ctx.canvas.height / 2 + headerHeight / 2 - 15);
	                }
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, nextLevel) {
	            if (!this.active) {
	                nextLevel();
	            }
	            if (this.entered !== -1) {
	                this.entered -= delta;
	                if (this.entered < 0) {
	                    this.active = false;
	                }
	            }
	        }
	    }, {
	        key: 'canType',
	        get: function get() {
	            return true;
	        }
	    }]);

	    return LevelDisability;
	}(_generic.Level);

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Level = exports.Level = function () {
	    function Level() {
	        _classCallCheck(this, Level);
	    }
	
	    _createClass(Level, [{
	        key: "getLevelIndex",
	        value: function getLevelIndex(x, y) {
	            return 0;
	        }
	    }, {
	        key: "sitByPool",
	        value: function sitByPool() {
	            // noop
	        }
	    }, {
	        key: "drownedInPool",
	        value: function drownedInPool() {
	            // noop
	        }
	    }, {
	        key: "fellInHole",
	        value: function fellInHole() {
	            // noop
	        }
	    }, {
	        key: "canPause",
	        get: function get() {
	            return false;
	        }
	    }, {
	        key: "canType",
	        get: function get() {
	            return false;
	        }
	    }]);
	
	    return Level;
	}();
	
	;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LevelMelonomics = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audio = __webpack_require__(2);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _entities = __webpack_require__(5);
	
	var entities = _interopRequireWildcard(_entities);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _generic = __webpack_require__(21);
	
	var _keys = __webpack_require__(16);
	
	var keys = _interopRequireWildcard(_keys);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MelonomicsTax = function MelonomicsTax(name, applies, mod) {
	    _classCallCheck(this, MelonomicsTax);
	
	    this.name = name;
	    this.applies = applies;
	    this.mod = mod;
	};
	
	var TAXES = [new MelonomicsTax('Melon Tax', function (v) {
	    return true;
	}, function (v) {
	    return v - 2;
	}), new MelonomicsTax('Seed Tax', function (v) {
	    return v > 0;
	}, function (v) {
	    return Math.floor(v * 0.8);
	}), new MelonomicsTax('Melon Inflation', function (v) {
	    return true;
	}, function (v) {
	    return v - Math.floor(Math.abs(v) * 0.2 + 1);
	}), new MelonomicsTax('Intermelon Commerce Fee', function (v) {
	    return v > 10;
	}, function (v) {
	    return v - 1;
	}), new MelonomicsTax('Even Tax', function (v) {
	    return v % 2 === 0;
	}, function (v) {
	    return v - 1;
	})];
	
	var LevelMelonomics = exports.LevelMelonomics = function (_Level) {
	    _inherits(LevelMelonomics, _Level);
	
	    function LevelMelonomics() {
	        _classCallCheck(this, LevelMelonomics);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelMelonomics).call(this));
	
	        _this.image = images.get('melonfinance');
	        return _this;
	    }
	
	    _createClass(LevelMelonomics, [{
	        key: 'reset',
	        value: function reset() {
	            var _this2 = this;
	
	            audio.playLoop('hero');
	            this.ticks = 0;
	            this.ended = false;
	            this.finalMelons = TAXES.reduce(function (melons, tax) {
	                if (!tax.applies(melons)) return melons;
	                return tax.mod(melons);
	            }, this.startMelons = entities.registry[0].melonCount);
	
	            keys.down.one('any', function () {
	                return sound.play('select');
	            });
	            keys.up.one('any', function () {
	                _this2.ended = true;
	            });
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, drawUI) {
	            var _this3 = this;
	
	            ctx.fillStyle = '#111';
	            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	            this.image.draw(function (img) {
	                var headerWidth = ctx.canvas.width * 0.4 / 2;
	                ctx.drawImage(img, 0, 0, img.width, img.height, ctx.canvas.width / 2 - headerWidth / 2, ctx.canvas.height * 0.1, headerWidth, headerWidth / img.width * img.height);
	
	                var melons = _this3.startMelons;
	
	                var items = Math.floor(_this3.ticks / 300);
	
	                var y = ctx.canvas.height * 0.1 + headerWidth / img.width * img.height + 50;
	                ctx.font = '20px VT323';
	                ctx.fillStyle = 'white';
	
	                if (items !== 0) {
	                    items--;
	                    ctx.fillText('Net Melons', ctx.canvas.width * 0.3, y);
	                    ctx.fillText(melons.toString(), ctx.canvas.width * 0.65, y);
	                    y += 21;
	                }
	
	                TAXES.forEach(function (tax) {
	                    if (!tax.applies(melons)) return;
	                    if (!items) return;
	                    items--;
	                    var afterTax = tax.mod(melons);
	                    var diff = afterTax - melons;
	                    ctx.fillText(tax.name, ctx.canvas.width * 0.3, y);
	                    ctx.fillText(diff.toString(), ctx.canvas.width * 0.65, y);
	                    y += 21;
	                    melons = afterTax;
	                });
	
	                if (items !== 0) {
	                    y += 20;
	                    items--;
	                    ctx.fillText('Gross Melons', ctx.canvas.width * 0.3, y);
	                    ctx.fillText(melons.toString(), ctx.canvas.width * 0.65, y);
	                }
	
	                if (items !== 0) {
	                    items--;
	                    y += 20;
	                    ctx.fillText('PRESS TO CONTINUE', ctx.canvas.width * 0.3, y);
	                }
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, nextLevel) {
	            this.ticks += delta;
	            if (this.ended) {
	                nextLevel();
	                entities.registry[0].melonCount = this.finalMelons;
	            }
	        }
	    }]);

	    return LevelMelonomics;
	}(_generic.Level);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LevelMenu = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audio = __webpack_require__(2);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _keys = __webpack_require__(16);
	
	var keys = _interopRequireWildcard(_keys);
	
	var _generic = __webpack_require__(21);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LevelMenu = exports.LevelMenu = function (_Level) {
	    _inherits(LevelMenu, _Level);
	
	    function LevelMenu(src) {
	        var audioName = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	        _classCallCheck(this, LevelMenu);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelMenu).call(this));
	
	        _this.image = images.get(src);
	        _this.audioName = audioName;
	        _this.ended = false;
	        _this.playedSound = false;
	        return _this;
	    }
	
	    _createClass(LevelMenu, [{
	        key: 'reset',
	        value: function reset() {
	            var _this2 = this;
	
	            if (this.audioName !== null) {
	                audio.playLoop(this.audioName);
	            }
	            this.playedSound = false;
	            this.ended = false;
	
	            keys.down.one('any', function () {
	                sound.play('select');
	                _this2.playedSound = true;
	            });
	            keys.up.one('any', function () {
	                _this2.ended = true;
	                if (!_this2.playedSound) {
	                    sound.play('select');
	                }
	            });
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, drawUI) {
	            ctx.fillStyle = '#111';
	            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	            this.image.draw(function (img) {
	                var hw = img.width / 4;
	                var hh = img.height / 4;
	                ctx.drawImage(img, 0, 0, img.width, img.height, ctx.canvas.width / 2 - hw, ctx.canvas.height / 2 - hh, img.width / 2, img.height / 2);
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, nextLevel) {
	            if (this.ended) {
	                nextLevel();
	            }
	        }
	    }]);

	    return LevelMenu;
	}(_generic.Level);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LevelPlatform = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base = __webpack_require__(25);
	
	var base64 = _interopRequireWildcard(_base);
	
	var _celestialbodies = __webpack_require__(26);
	
	var celestialbodies = _interopRequireWildcard(_celestialbodies);
	
	var _drawutils = __webpack_require__(27);
	
	var drawutils = _interopRequireWildcard(_drawutils);
	
	var _entities = __webpack_require__(5);
	
	var entities = _interopRequireWildcard(_entities);
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _generic = __webpack_require__(21);
	
	var _levels = __webpack_require__(18);
	
	var levelLib = _interopRequireWildcard(_levels);
	
	var _settings = __webpack_require__(8);
	
	var settings = _interopRequireWildcard(_settings);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	var _tiles = __webpack_require__(9);
	
	var tiles = _interopRequireWildcard(_tiles);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DAY_LENGTH = 5 * 60 * 1000; // 5 minutes
	var COMPLETED_TTL = 3000;
	
	var TILES_PER_ROW = settings.sprite_tile_row;
	var TILES_RATIO = settings.tile_size / settings.sprite_tile_size;
	var TILES_RATIO_INV = settings.sprite_tile_size / settings.tile_size;
	
	function getTimeColor(time) {
	    // One day-night cycle for every full oscillation of cosine
	    var tod = Math.cos(time / DAY_LENGTH * 2 * Math.PI);
	    // Normalize the result to [0,1]
	    tod += 1;
	    tod /= 2;
	
	    var hue = 150 * tod - 100; // [-100,50]
	    var sat = 70 * tod + 20; // [20,100]
	    var lig = 33 * tod + 35; // [35,68]
	    return 'hsl(' + hue + ',' + sat + '%,' + lig + '%)';
	}
	
	var LevelPlatform = exports.LevelPlatform = function (_Level) {
	    _inherits(LevelPlatform, _Level);
	
	    function LevelPlatform(width, height, data, defaultEntities) {
	        _classCallCheck(this, LevelPlatform);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelPlatform).call(this));
	
	        _this.width = width;
	        _this.height = height;
	        _this.defaultEntities = defaultEntities;
	
	        _this.coolShades = images.get('coolshades');
	
	        _this.data = new Uint16Array(width * height);
	        if (data !== null) {
	            var convertedData = base64.base64DecToArr(data);
	            for (var i = 0; i < convertedData.length - 1; i++) {
	                _this.data[i] = convertedData[i];
	            }
	        }
	
	        _this.tilemap = new drawutils.TileMap(width * settings.sprite_tile_size, height * settings.sprite_tile_size, images.get('tiles'));
	
	        _this.tilemap.render(function (img) {
	            for (var x = 0; x < width; x++) {
	                for (var y = 0; y < height; y++) {
	                    var tile = _this.data[_this.getLevelIndex(x, y)];
	                    if (tile === tiles.TILE_AIR) continue;
	
	                    var tileImg = tiles.IMAGES[tile];
	
	                    _this.tilemap.drawImage(img, tileImg % TILES_PER_ROW * settings.sprite_tile_size, Math.floor(tileImg / TILES_PER_ROW) * settings.sprite_tile_size, settings.sprite_tile_size, settings.sprite_tile_size, x * settings.sprite_tile_size, (height - y) * settings.sprite_tile_size, settings.sprite_tile_size, settings.sprite_tile_size);
	                }
	            }
	        });
	
	        return _this;
	    }
	
	    _createClass(LevelPlatform, [{
	        key: 'getLevelIndex',
	        value: function getLevelIndex(x, y) {
	            return (this.height - y - 1) * this.width + x;
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.time = 0;
	
	            this.leftEdge = 0;
	            this.bottomEdge = 0;
	
	            this.messageImg = null;
	            this.messageImgTTL = 0;
	            this.messageImgNext = null;
	
	            this.levelCompletedTTL = -1;
	
	            this.completed = false;
	            entities.reset();
	
	            this.defaultEntities.forEach(function (dE) {
	                entities.add(dE['id'], dE['x'], dE['y']);
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, nextLevel) {
	
	            if (this.completed) {
	                nextLevel();
	            }
	
	            this.time += delta;
	
	            entities.tick(delta, this);
	
	            if (this.messageImgTTL !== 0) {
	                this.messageImgTTL -= delta;
	                if (this.messageImgTTL <= 0) {
	                    this.completed = true;
	                    this.messageImgNext();
	                }
	            }
	
	            if (this.levelCompletedTTL !== -1) {
	                this.levelCompletedTTL -= delta;
	                if (this.levelCompletedTTL <= 0) {
	                    this.completed = true;
	                }
	            }
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, drawUI) {
	            var _this2 = this;
	
	            // Clear the frame with the sky color.
	            ctx.fillStyle = getTimeColor(this.time);
	            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	            // Draw the sun/moon
	            ctx.drawImage(celestialbodies.sun, 0, 0, celestialbodies.sun.width, celestialbodies.sun.height, 30, -1 * (ctx.canvas.height / 2) * Math.cos(this.time / DAY_LENGTH * 2 * Math.PI) + ctx.canvas.height, 60, 60);
	            ctx.drawImage(celestialbodies.moon, 0, 0, celestialbodies.moon.width, celestialbodies.moon.height, ctx.canvas.width - 60 - 30, ctx.canvas.height / 2 * Math.cos(this.time / DAY_LENGTH * 2 * Math.PI) + ctx.canvas.height, 60, 60);
	
	            var myHeight = this.tilemap.height;
	            var theirHeight = ctx.canvas.height;
	
	            // Calculate the new best offsets for the viewport
	            var player = entities.registry[0];
	            var bestX = player.x + player.width / 2 - ctx.canvas.width / settings.tile_size / 2;
	            var bestY = player.y + player.height / 2 - ctx.canvas.height / settings.tile_size / 2;
	
	            this.leftEdge = (this.leftEdge * 6 + bestX) / 7;
	            this.bottomEdge = (this.bottomEdge * 6 + bestY) / 7;
	
	            this.leftEdge = Math.max(Math.min(this.leftEdge, this.width - ctx.canvas.width / settings.tile_size), 0);
	            this.bottomEdge = Math.max(Math.min(this.bottomEdge, this.height - 1 - ctx.canvas.height / settings.tile_size), 0);
	
	            var terrainY = myHeight - theirHeight / TILES_RATIO - this.bottomEdge * settings.sprite_tile_size;
	            this.tilemap.drawMapScaled(ctx, this.leftEdge * settings.sprite_tile_size, terrainY, TILES_RATIO);
	
	            var offsetX = -1 * this.leftEdge * settings.tile_size;
	            var offsetY = ctx.canvas.height - myHeight * TILES_RATIO + this.bottomEdge * settings.tile_size;
	            entities.draw(ctx, this, offsetX, offsetY);
	
	            if (this.levelCompletedTTL !== -1) {
	                this.coolShades.draw(function (shades) {
	                    var playerY = (_this2.height - player.y - player.height) * settings.tile_size + offsetY;
	                    ctx.drawImage(shades, 0, 0, shades.width, shades.height, player.x * settings.tile_size + offsetX, playerY - Math.max(0, (_this2.levelCompletedTTL - 750) / (COMPLETED_TTL - 750)) * ctx.canvas.height, settings.tile_size, settings.tile_size);
	                });
	            }
	
	            if (this.messageImg !== null) {
	                this.messageImg.draw(function (img) {
	                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	                    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	                    var width = ctx.canvas.width * 0.4;
	                    var height = width / img.width * img.height;
	                    ctx.drawImage(img, 0, 0, img.width, img.height, ctx.canvas.width / 2 - width / 2, ctx.canvas.height / 2 - height / 2, width, height);
	                });
	            }
	
	            drawUI();
	        }
	    }, {
	        key: 'drownedInPool',
	        value: function drownedInPool() {
	            sound.play('drownInPool');
	            this.messageImg = images.get('drowninpool');
	            this.messageImgTTL = 1250;
	            this.messageImgNext = function () {
	                return levelLib.goToDisability();
	            };
	        }
	    }, {
	        key: 'fellInHole',
	        value: function fellInHole() {
	            sound.play('fellInHole');
	            this.messageImg = images.get('fellInHole');
	            this.messageImgTTL = 1250;
	            this.messageImgNext = function () {
	                return levelLib.goToDisability();
	            };
	        }
	    }, {
	        key: 'sitByPool',
	        value: function sitByPool() {
	            if (this.levelCompletedTTL !== -1) {
	                return;
	            }
	            this.messageImg = images.get('relaxbypool');
	            this.messageImgTTL = COMPLETED_TTL;
	            this.levelCompletedTTL = COMPLETED_TTL;
	            this.messageImgNext = function () {
	                return levelLib.next();
	            };
	        }
	    }, {
	        key: 'complete',
	        value: function complete() {
	            this.completed = true;
	        }
	    }, {
	        key: 'canPause',
	        get: function get() {
	            return true;
	        }
	    }]);

	    return LevelPlatform;
	}(_generic.Level);

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.base64DecToArr = base64DecToArr;
	
	function b64ToUint6(char) {
	    return char > 64 && char < 91 ? char - 65 : char > 96 && char < 123 ? char - 71 : char > 47 && char < 58 ? char + 4 : char === 43 ? 62 : char === 47 ? 63 : 0;
	}
	
	function base64DecToArr(sBase64) {
	    var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, '');
	    var nInLen = sB64Enc.length;
	    var nOutLen = nInLen * 3 + 1 >> 2;
	    var taBytes = new Uint8Array(nOutLen);
	
	    var nUint24 = 0;
	    var nOutIdx = 0;
	    for (var nInIdx = 0; nInIdx < nInLen; nInIdx++) {
	        var nMod4 = nInIdx & 3;
	        nUint24 |= b64ToUint6(sB64Enc.codePointAt(nInIdx)) << 18 - 6 * nMod4;
	        if (nMod4 === 3 || nInLen - nInIdx === 1) {
	            for (var nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
	                taBytes[nOutIdx] = nUint24 >> (16 >> nMod3 & 24) & 255;
	            }
	            nUint24 = 0;
	        }
	    }
	
	    return taBytes;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.moon = exports.sun = undefined;
	exports.getBody = getBody;
	
	var _drawutils = __webpack_require__(27);
	
	var drawutils = _interopRequireWildcard(_drawutils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var BODY_SIZE = 17; // px
	
	
	function getBody(color) {
	    var half = BODY_SIZE / 2;
	
	    var body = drawutils.getBuffer(BODY_SIZE, BODY_SIZE);
	    body.fillStyle = color;
	
	    var dist = void 0;
	    for (var y = 0; y < BODY_SIZE; y++) {
	        for (var x = 0; x < BODY_SIZE; x++) {
	            if (Math.sqrt(Math.pow(x - half, 2) + Math.pow(y - half, 2)) <= half) {
	                body.fillRect(x, y, 1, 1);
	            }
	        }
	    }
	
	    return body.canvas;
	}
	
	var sun = exports.sun = getBody('#fff');
	var moon = exports.moon = getBody('#ccc');

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TileMap = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.getBufferFromCanvas = getBufferFromCanvas;
	exports.getBuffer = getBuffer;
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TileMap = exports.TileMap = function () {
	    function TileMap(width, height, drawable) {
	        var tileSize = arguments.length <= 3 || arguments[3] === undefined ? 256 : arguments[3];
	
	        _classCallCheck(this, TileMap);
	
	        this.width = width;
	        this.height = height;
	        this.tileSize = tileSize;
	
	        this.drawable = drawable;
	
	        this.perRow = Math.ceil(width / this.tileSize);
	
	        this.canvases = [];
	
	        var count = Math.floor(height / tileSize) * this.perRow + width / tileSize;
	        for (var i = 0; i < count; i++) {
	            this.canvases.push(getBuffer(this.tileSize, this.tileSize).canvas);
	        }
	    }
	
	    _createClass(TileMap, [{
	        key: 'render',
	        value: function render(renderer) {
	            this.drawable.drawEventually(function (img) {
	                return renderer(img);
	            });
	        }
	    }, {
	        key: 'drawImage',
	        value: function drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) {
	            var idx = Math.floor(dy / this.tileSize) * this.perRow + Math.floor(dx / this.tileSize);
	            var ctx = getBufferFromCanvas(this.canvases[idx]);
	            ctx.drawImage(img, sx, sy, sw, sh, dx % this.tileSize, dy % this.tileSize, dw, dh);
	        }
	    }, {
	        key: 'drawMapScaled',
	        value: function drawMapScaled(ctx, sx, sy, ratio) {
	            var height = Math.ceil(ctx.canvas.height / ratio);
	            var width = Math.ceil(ctx.canvas.width / ratio);
	
	            var leftMostX = Math.floor(sx / this.tileSize);
	            var rightMostX = Math.floor((sx + width) / this.tileSize);
	            var topMostY = Math.floor(sy / this.tileSize);
	            var bottomMostY = Math.floor((sy + height) / this.tileSize);
	
	            var offsetX = leftMostX * this.tileSize - sx;
	            var offsetY = topMostY * this.tileSize - sy;
	
	            var tsRatio = Math.ceil(this.tileSize * ratio);
	
	            for (var y = topMostY; y <= bottomMostY; y++) {
	                for (var x = leftMostX; x <= rightMostX; x++) {
	                    var idx = y * this.perRow + x;
	                    if (idx < 0 || idx >= this.canvases.length) continue;
	                    ctx.drawImage(this.canvases[idx], 0, 0, this.tileSize, this.tileSize, x * tsRatio - sx * ratio, y * tsRatio - sy * ratio, tsRatio, tsRatio);
	                }
	            }
	        }
	    }]);
	
	    return TileMap;
	}();
	
	;
	
	function getBufferFromCanvas(canvas) {
	    var ctx = canvas.getContext('2d');
	    ctx.imageSmoothingEnabled = false;
	    return ctx;
	}
	
	function getBuffer(width, height) {
	    var canvas = document.createElement('canvas');
	    canvas.width = width;
	    canvas.height = height;
	    return getBufferFromCanvas(canvas);
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LevelTitle = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _images = __webpack_require__(10);
	
	var images = _interopRequireWildcard(_images);
	
	var _generic = __webpack_require__(21);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LevelTitle = exports.LevelTitle = function (_Level) {
	    _inherits(LevelTitle, _Level);
	
	    function LevelTitle(src, duration, soundName) {
	        _classCallCheck(this, LevelTitle);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelTitle).call(this));
	
	        _this.image = images.get(src);
	        _this.duration = duration;
	        _this.soundName = soundName;
	        return _this;
	    }
	
	    _createClass(LevelTitle, [{
	        key: 'reset',
	        value: function reset() {
	            if (this.soundName !== null) {
	                sound.play(this.soundName);
	            }
	
	            this.ttl = this.duration;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx, drawUI) {
	            ctx.fillStyle = '#111';
	            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	            this.image.draw(function (img) {
	                var hw = img.width / 4;
	                var hh = img.height / 4;
	                ctx.drawImage(img, 0, 0, img.width, img.height, ctx.canvas.width / 2 - hw, ctx.canvas.height / 2 - hh, img.width / 2, img.height / 2);
	            });
	        }
	    }, {
	        key: 'tick',
	        value: function tick(delta, nextLevel) {
	            this.ttl -= delta;
	            if (this.ttl <= 0) {
	                nextLevel();
	            }
	        }
	    }]);

	    return LevelTitle;
	}(_generic.Level);

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var LEVELS = exports.LEVELS = [{ "height": 33, "width": 256, "content": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCAwIDAgMCAwIDAgMCAwIDAgMCAwIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREAAAAAAAAAAAAREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQREREEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAAAAAAAAABAAAAAAEAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQCBAQAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQCAgIEBAQEAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAgICAgICAgICBAAAAAAAAAAABBEREREEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwREQAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAAAAALCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMEgAAAAAAAAAAAAAAAAAAAAAAAAAABAQEERERERIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBwcHBwcHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAEAAADAAADAAAAAAAEgAAAAAAAAAAAAEBAAAAAAAAAQEAAAAAAAABAQAAAAAAAAQRERERBAAAAAAAAAAACwsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAAAAAAAAAAAAAAwMDAwMABIAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAwAAAwAAAAAABIAAAAAAAAAAAABAQAAAAAAAAEBAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAABwcHBwcHBwcHBwcHBwcHBwcHAAAAAQAAAAEAAAAHBwAAAAAAAAAAAAAAAAAAAAsAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAAAAAAAQAAALAAALAAAAAAASAAAAAAAXAAAAAQEAAAAAAAABAQAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAIDAgYGBgYGBgYGBgYGBgYGBgAAAAAAAAAAAAAABgYAAAAAAAAAAAAAAAAAAAALAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABARIAAQEBAQEBAQcHBwcHBwcHBwcHBwcHBwAHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcAAAAAAAAAAAAAAAAAAAADAwMDBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAYGAAAAAAAAAAAAAAAAAAAACwAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAQBAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQASAAAAAAAAAAEGBgYGBgYGBgYGBgYGBgYABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAAAAAAAAAAAAAAAAAAAAMCAwYGBgYGBgYGBgYGBgYGAAAAAAAAAAAAAAAGBgcAAAAAAAAAAAAAAAAAAAsAAAASAAAAAAAAAAAAAAAYAAAAAAAAAAAAAQAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBwEAEgAAAAAAAAABBgYGBgYGBgYGAAAAAAAAAAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAwMDAgMDBgYGBgYGBgYGBgAAAAAAAAAAAAAABgYGAAAAAAAAAAAAAAAAAAALAAAAEgAAAAAAAAAAAAAEBAQAAAAAAAAAAAEAAAAAABIAGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFBQUBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcHBgYBBQUFBQASBQUFAQYGBgYGBgYGBhEGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMGBgYGBgYGBgYAAAAAAAAAAAAAAAYGBgAAAAAAAAAAAAAAAAAACwAAABIAABcAAAAAAAAAAAEAAAAAAAAAAAABAAAAAAASAAUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAEFBQUFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcGBgYGAQAAAAAAEgAAAAEGBgYGBgYGBgAABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwYGBgYGBgYGAAAAAAAAAAAAAAAGBgYHAAAAAAAAAAAAAAAAAAsAAAQEBAQEAAAAAAAAAAABAAAAAAAAAAAEAQAAAAAAEgUFBQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAEFBQUFBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBwcGBgYGBgEAAAAAABIAAAABBgYGBgYGBgYAAAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAADAAMAAAAAAAAAAAAAAAAAAMGBgYGBgYGBgAAAAAAAAAAAAAABgYGBgAAAAAAAAAAAAAAAAALAAAAAAEAAAAAAAAAAAAAAQAAAAAAAAAAAAEAAAAAAAUFBQUFBQAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAEFBQUFBQUBAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcHBgYGBgYGBgYBAAAAAAASABcAAAAAAAAAAAAAAAAAAAAAAAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAwADAAAAAAAAwMAAAAAAAADBgYGBgYGBgYAAAAAAAAAAAAAAAYGBgYAAAAAFwAAAAAAAAAACwAAAAABAAAAAAAAAAAAAAEEAAAAAAAAAAABAAAAAAACAgICAgIAAAAAAAAAAAAAAAAAAAAXAAAAAAsAAAEFBQUFBQUFAQAAAAAVFgAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAABwcGBgYGBgYGBgYGBQUFBQUFBQUFBQUGBgYGBgYGBgYGBgYGAAAGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAAAAAAAAALAAsAAAADAwMDAwAAAAAAAgYGBgYGBgYGAAAAAAAAAAAAAAAGBgYGBwAABAQEBAQREQAAAAsAAAAAAQAAAAAAAAAAAAABAAAAAAAAAAAAAQAAAAAABAICAgIEAAAAAAAAAAAAAAARERERBAcHBwcHBwcHBwcHBwcHBwcHBwcHAQEKCgoKCgEHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwAAAAAAAAAHBwcHBwcHBwEREREREQEHBwYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgoKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAAAAAHBwcHBwIDAwIDAwMAAAAAAAMGBgYGBgYGBgAAAAAAAAAAAAAABgYGBgYAAAAAAQAAAAAAAAALAAAAAAEAAAAAAAAAAAAAAQAAAAAAAAAABAEAAAAAAAQCAgICBAAAAAAAAAAAAAAAAAAAAAAGBgYGBgYGBgYGBgYGBgYGBgYGBgYBCgoKCgoBBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAABgYGBgYGBgYBAAAAAAABBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYKCgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAABgYGBgYDAwMDAwMCAwAAAwMDBgYGBgYGBgYAAAAAAAAAAAAAAAYGBgYGAAAAAAEAAAAAAAAACwAAAAABAAAAAAAAAAAAAAEAAAAAAAAAAAABAAAAAAQBAQEBAQEEEREREQAAAAAAAAAAAAAAAAYGBgYGBgYGBgYGBgYGBgYGBgYGAQoKCgoKAQYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAABgYGBgYGBgYGAQoKCgoKAQYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGCgoGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAAAAAAAAYGBgYGAwMCAwMDAwMDAwMCAwYGBgYGBgYGAAAAAAAAAAAAAAAGBgYGBgAAAAABAAAAAAAAAAsAAAAAAQAAAAAAAAAAAAABBAAAAAAAAAAAAQAAAAABAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAAGBgYGBgYGBgYGBgYGBgYGBgYGBgEKCgoKCgE=", "entities": [{ "id": 0, "x": 11, "y": 9 }, { "id": 0, "x": 17, "y": 14 }, { "id": 0, "x": 26, "y": 14 }, { "id": 0, "x": 27, "y": 14 }, { "id": 0, "x": 28, "y": 14 }, { "id": 0, "x": 30, "y": 18 }, { "id": 0, "x": 32, "y": 17 }, { "id": 0, "x": 29, "y": 6 }, { "id": 0, "x": 44, "y": 7 }, { "id": 0, "x": 48, "y": 30 }, { "id": 0, "x": 59, "y": 30 }, { "id": 0, "x": 83, "y": 19 }, { "id": 0, "x": 84, "y": 19 }, { "id": 0, "x": 102, "y": 24 }, { "id": 0, "x": 103, "y": 24 }, { "id": 0, "x": 131, "y": 20 }, { "id": 0, "x": 134, "y": 18 }, { "id": 0, "x": 135, "y": 19 }, { "id": 0, "x": 131, "y": 17 }, { "id": 0, "x": 135, "y": 4 }, { "id": 0, "x": 133, "y": 4 }, { "id": 0, "x": 151, "y": 17 }, { "id": 0, "x": 151, "y": 15 }, { "id": 0, "x": 202, "y": 29 }, { "id": 0, "x": 203, "y": 29 }, { "id": 0, "x": 204, "y": 29 }, { "id": 0, "x": 205, "y": 29 }, { "id": 0, "x": 206, "y": 30 }, { "id": 0, "x": 207, "y": 30 }, { "id": 0, "x": 208, "y": 29 }, { "id": 0, "x": 201, "y": 30 }, { "id": 0, "x": 200, "y": 30 }, { "id": 0, "x": 199, "y": 30 }, { "id": 0, "x": 219, "y": 7 }, { "id": 0, "x": 220, "y": 7 }, { "id": 0, "x": 191, "y": 2 }, { "id": 0, "x": 199, "y": 4 }, { "id": 0, "x": 191, "y": 6 }, { "id": 0, "x": 199, "y": 8 }, { "id": 0, "x": 175, "y": 14 }, { "id": 0, "x": 173, "y": 15 }, { "id": 5, "x": 17, "y": 3 }, { "id": 5, "x": 41, "y": 3 }, { "id": 5, "x": 41, "y": 8 }, { "id": 5, "x": 203, "y": 15 }, { "id": 5, "x": 203, "y": 16 }, { "id": 0, "x": 202, "y": 25 }, { "id": 0, "x": 203, "y": 25 }, { "id": 0, "x": 204, "y": 25 }, { "id": 0, "x": 202, "y": 26 }, { "id": 0, "x": 203, "y": 26 }, { "id": 0, "x": 204, "y": 26 }, { "id": 15, "x": 29, "y": 14 }, { "id": 15, "x": 36, "y": 3 }] }, { "height": 33, "width": 232, "content": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAUAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREEAAAFERERBAAbAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABQAABQAAAAEBAQEBAAAAAQEBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREQUAAAUREREBAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAUAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAEBERERAQAEAAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABERERBQAABREREQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMAAwAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAABBERERERBAEEAQEEEREAAAAAEREEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwAAAAAAAAAAAAAAAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgADAAMAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREFAAAFERERAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAQMDAQAAAAAAAAASAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAwAAAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABQAABQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAEDAwEAAAAAAAAAEgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMAAwQAAAsAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREQQAAAQREREBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAABAwMBGQAAAAAAABIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAXAAAAAAAAAAAADAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgADAAMBBgYGBgYBAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAABAEBBAQAAAAAAAASAQAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAEBwcHBAAAAAAAAAAAAAAMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAwAABAEBAQEBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARAAAAAAAAEQAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAAEgAAAAAAAAAAAAAAAAAAAAEAAAASAAAAAAAAEgEAAAwAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAwMDAwMAAAAAAAAAAAAADAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMDAAUDAwMDAwUAAwMREREAAAAAAAAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQQREREBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAABIAAAAAAAAAAAAAAAAAAAABAAAEEgAAAAAAABIBAAAMAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAwAFAwAAAAMFAAMAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAASAAASAAAAAAAAAAAAAAAAAAAAAQAAARIAABIAAAASAQAACwAAAAAAAAwMDAAAAAAACwAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAALCwAXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAwMABQUAAAAFBQADAAASAAAAERERAAAAAAAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABERERAQAABREREQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAEgAAEgAAAAAAAAAAAAAAAAAAAAEAAAEAAAASAAAAEgELCwsAAAAAAAAMDAwAAAAAAAsAAAAMDAwAAAAAAAAAAAAAAAAAAAAAAAQHBwcHBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMAAAAAAAAAAAAAAwAAEgAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAUAAAABBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAABIAABIAAAAAAAAAGAAAAAAAAAABAAABAAAAEgAAABIBAAAAAAAAAAAADAwMAAAAAAALCwsMDAwMDAAAAAAAAAAAAAAAAAAAAAADAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgADAAMDAxEREQMDAAMAABIAAAAAAAAAAAAADAwMDAwAAAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREFAAAFERERAQQEAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAASAAASAAAAAAAAAAAAAAQREREREQQAAQAAAQAAAAAAAAASAQAAAAAAAAAAAAALAAAAAAAACwAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAwAAAAMAEgAABAAEAAASAAAAAAAAAAAADAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABQAABQAAAAEEBAQAAAAAAAAREREEAAARAAAAABERAAAAAAAREQAAAAAAEREAAAAAAAAAABEFEQAAAAAAEgAAEgAAAAAAAAAAAAAAAAAAABIAAAEAAAEAAAAAAAAAEgEAAAAAAAAAAAAACwAAAAAAAAsAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMDAwADABIAAAAAAAAAEgAAAAwMDAAMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREQUAAAUREREEAAABAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAASAAABAAABAAAAAAAAABIBAAAAAAAAAAAAAAsLCwsLCwsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAQABAASAAAAAAAAABIAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAFAAAAAAAAAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAASAAAAAAAbAAAAAAAAAAAAAAAAEgAAAQAAAQAAAAAAAAASAQAAAAAAAAAAAAAAAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAEgAAAAAAAAASAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAABERERBQAABREREQQREQEAAAAAAAAAAAABAAAAAAAAAAAAAAARAAAAAAAAEQAAAAAAABEAAAAAAAAFAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAABIAAAEAAAEAAAAAAAAAEgEAAAAAAAAAAAAAAAAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAABIAAAAAAAAAEgAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAUAAAABAAABAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAASAAABAAABAAAAGgAAABIBAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAASAAAAAAAAABIAAAwMDAwMDAwLAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQREREEAAAEERERARERAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAURAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAEgAAAQAABAEBAQEBAQEBBAAAAAAAAAAAAAAAAAAMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAEgAAAAAAAAASAAAACwAMDAsACwAACwAMDAwLDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAABIAAAEAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAABIAAAAAAAAAEgAAAAsAAAALAAsAAAsADAwMCwALAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAEAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAASAAAEAQEBAQEBAQEBAQEEAAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAASAAAAAAAAABIAAAALAAAACwALAAALAAALAAsACwAAAAAAAAAABBERBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAABkAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAwMDAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFwAAABIAAAAAAAAAEgAAAAAAAAASAAAACwAAAAsACwAACwAACwALAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAEAQEBAQEBAQEBAQQBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAYAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAsAAAAAAAwMDAwMAAAAAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAABUWAAAAAAAAAAcHBwcHBwcHBwcHBwcHBwcHBwAAAAcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwAAAAAAAAAAAAAAAAAAAAAREQcHBwcHBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgcHBwcHBwAAAAAHBwcAAAAABwcHAAAAAAcHBwAAAAABAQEAAAAABwcHAAAAAAcHBwcHBwcHBBERERERBAAAAAAAAAAAAAAAAAAREQcHBwcHBwAAAAAAAAALAAAAAAAADAwMAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAABwcBAQEKCgoKCgEGBgYGBgYGBgYGBgYGBgYGBgYAAAAGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAABgYGAAAAAAYGBgAAAAAGBgYAAAAAAQEBAAAAAAYGBgAAAAAGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYGBgYAAAAAAAAACwAAAAAAAAALAAAAAAAAAAAMAAAADAAAAAAAAAAZAAAAAAAAAAAAAAYGBgYBCgoKCgoBBgYGBgYGBgYGBgYGBgYGBgYGCgoKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAAAAYGBgAAAAAGBgYAAAAABgYGAAAAAAEBAQAAAAAGBgYKCgoKBgYGBgYGBgYGAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgYGAAAAAAAAAAsAAAAAAAAACwAAAAAAAAAACwAAAAsAAAAAAAQRERERBAAAAAAAAAAGBgYGAQoKCgoKAQYGBgYGBgYGBgYGBgYGBgYGBgoKCgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAGBgYAAAAABgYGAAAAAAYGBgAAAAABAQEAAAAABgYGCgoKCgYGBgYGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGBgYGBgAAAAAAAAALAAAAAAAAAAsAAAAAAAAAAAsAAAALAAAAAAAAAAAAAAAAAAAAAAAABgYGBgEKCgoKCgE=", "entities": [{ "id": 0, "x": 28, "y": 7 }, { "id": 0, "x": 30, "y": 6 }, { "id": 0, "x": 37, "y": 7 }, { "id": 0, "x": 42, "y": 6 }, { "id": 0, "x": 40, "y": 7 }, { "id": 0, "x": 15, "y": 16 }, { "id": 0, "x": 23, "y": 20 }, { "id": 0, "x": 16, "y": 25 }, { "id": 0, "x": 14, "y": 25 }, { "id": 0, "x": 7, "y": 27 }, { "id": 0, "x": 34, "y": 8 }, { "id": 0, "x": 49, "y": 6 }, { "id": 0, "x": 58, "y": 7 }, { "id": 0, "x": 58, "y": 12 }, { "id": 0, "x": 70, "y": 9 }, { "id": 0, "x": 69, "y": 11 }, { "id": 0, "x": 71, "y": 11 }, { "id": 0, "x": 77, "y": 9 }, { "id": 0, "x": 77, "y": 11 }, { "id": 0, "x": 77, "y": 13 }, { "id": 0, "x": 77, "y": 15 }, { "id": 0, "x": 70, "y": 30 }, { "id": 0, "x": 69, "y": 28 }, { "id": 0, "x": 71, "y": 28 }, { "id": 0, "x": 85, "y": 25 }, { "id": 0, "x": 84, "y": 22 }, { "id": 0, "x": 83, "y": 19 }, { "id": 0, "x": 86, "y": 22 }, { "id": 0, "x": 87, "y": 19 }, { "id": 0, "x": 84, "y": 16 }, { "id": 0, "x": 86, "y": 16 }, { "id": 0, "x": 85, "y": 13 }, { "id": 0, "x": 6, "y": 28 }, { "id": 0, "x": 8, "y": 28 }, { "id": 0, "x": 5, "y": 27 }, { "id": 0, "x": 9, "y": 27 }, { "id": 0, "x": 44, "y": 28 }, { "id": 0, "x": 43, "y": 29 }, { "id": 0, "x": 45, "y": 29 }, { "id": 0, "x": 44, "y": 29 }, { "id": 0, "x": 44, "y": 30 }, { "id": 0, "x": 43, "y": 30 }, { "id": 0, "x": 45, "y": 30 }, { "id": 0, "x": 45, "y": 28 }, { "id": 0, "x": 43, "y": 28 }, { "id": 0, "x": 104, "y": 22 }, { "id": 5, "x": 34, "y": 4 }, { "id": 5, "x": 40, "y": 23 }, { "id": 5, "x": 95, "y": 4 }, { "id": 5, "x": 95, "y": 5 }, { "id": 5, "x": 111, "y": 20 }, { "id": 0, "x": 111, "y": 29 }, { "id": 0, "x": 112, "y": 29 }, { "id": 0, "x": 110, "y": 29 }, { "id": 0, "x": 111, "y": 30 }, { "id": 0, "x": 110, "y": 30 }, { "id": 0, "x": 112, "y": 30 }, { "id": 5, "x": 148, "y": 4 }, { "id": 5, "x": 148, "y": 5 }, { "id": 0, "x": 148, "y": 26 }, { "id": 0, "x": 149, "y": 26 }, { "id": 0, "x": 141, "y": 20 }, { "id": 0, "x": 143, "y": 20 }, { "id": 0, "x": 118, "y": 22 }, { "id": 0, "x": 111, "y": 16 }, { "id": 0, "x": 104, "y": 16 }, { "id": 0, "x": 118, "y": 16 }, { "id": 0, "x": 155, "y": 18 }, { "id": 0, "x": 156, "y": 17 }, { "id": 0, "x": 155, "y": 16 }, { "id": 0, "x": 156, "y": 15 }, { "id": 0, "x": 155, "y": 14 }, { "id": 0, "x": 156, "y": 13 }, { "id": 0, "x": 155, "y": 12 }, { "id": 0, "x": 156, "y": 11 }, { "id": 0, "x": 177, "y": 16 }, { "id": 0, "x": 181, "y": 7 }, { "id": 0, "x": 189, "y": 15 }, { "id": 0, "x": 189, "y": 4 }, { "id": 0, "x": 169, "y": 21 }, { "id": 0, "x": 196, "y": 23 }, { "id": 0, "x": 198, "y": 23 }, { "id": 0, "x": 184, "y": 18 }] }];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.start = start;
	
	var _audio = __webpack_require__(2);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _drawing = __webpack_require__(4);
	
	var drawing = _interopRequireWildcard(_drawing);
	
	var _keys = __webpack_require__(16);
	
	var keys = _interopRequireWildcard(_keys);
	
	var _levels = __webpack_require__(18);
	
	var levels = _interopRequireWildcard(_levels);
	
	var _sound = __webpack_require__(13);
	
	var sound = _interopRequireWildcard(_sound);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var started = false;
	var paused = false;
	
	var previous = 0;
	
	function loop(ts) {
	    var now = Date.now();
	    var delta = now - previous;
	
	    if (!paused) {
	        levels.getCurrent().tick(delta, levels.next);
	        drawing.draw();
	    }
	
	    requestAnimationFrame(loop);
	    previous = now;
	}
	
	function start() {
	    if (started) {
	        return;
	    }
	    previous = Date.now();
	    requestAnimationFrame(loop);
	    started = true;
	
	    keys.up.on(80, function (e) {
	        // P
	        if (!paused && !levels.getCurrent().canPause) {
	            return;
	        }
	        paused = !paused;
	        sound.play('select');
	
	        if (paused) {
	            drawing.drawPaused();
	        }
	    });
	
	    keys.up.on(77, function (e) {
	        if (levels.getCurrent().canType) {
	            return;
	        }
	        e.preventDefault();
	        audio.toggleMute();
	    });
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.set = set;
	exports.get = get;
	var VERSION = 1;
	
	function set(key, val) {
	    window.localStorage.setItem(VERSION + "." + key, JSON.stringify(val));
	};
	
	function get(key) {
	    return JSON.parse(window.localStorage.getItem(VERSION + "." + key));
	}

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map