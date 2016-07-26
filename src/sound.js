import JSFX from './jsfx';


const waves = {
    'bastacorp': ["saw",0.0000,0.1930,0.0000,0.2680,0.0000,0.0040,110.0000,878.0000,2400.0000,-0.9000,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,-0.2960,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000],
    'select': ["square",2.0000,0.1930,0.0000,0.0020,0.5760,0.2760,20.0000,850.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000],
    'jump': ["square",0.0000,0.1530,0.0000,0.1280,0.0000,0.0200,20.0000,339.0000,971.0000,0.4080,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,0.0000,0.0000,0.0000,0.0000,0.8070,0.0000,0.0000,0.0000,0.0000],
    'doubleJump': ["square",0.0000,0.1530,0.0000,0.1280,0.0000,0.0200,20.0000,511.0000,971.0000,0.4080,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,0.0000,0.0000,0.0000,0.0000,0.8070,0.0000,0.0000,0.0000,0.0000],
    'headBump': ["square",9.0000,0.0450,0.0000,0.0300,0.0000,0.0480,20.0000,150.0000,2400.0000,-0.5780,-0.0740,0.0000,0.0100,0.0003,0.0000,-0.2660,0.0000,0.0590,0.0000,0.0000,0.0000,0.0000,1.0000,-0.0040,0.0000,0.0000,-0.0140],
    'drownInPool': ["saw",0.0000,0.1530,0.0000,0.9760,0.0000,0.1540,112.0000,467.0000,594.0000,0.1020,-0.9520,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0120,0.0640,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.1600,0.0000],
    'melonCollect': ["square",0.0000,0.0520,0.0000,0.0320,0.4920,0.3600,20.0000,1320.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.2620,0.1050,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000],
    'keypress': ["noise",0.0000,0.0540,0.0000,0.0140,0.7560,0.0460,20.0000,1691.0000,2400.0000,-0.2680,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,-0.1320,-0.1860,1.0000,0.0000,0.0000,0.0000,0.0000],
    'fellInHole': ["noise",0.0000,0.0750,0.0000,0.2700,0.7890,0.6200,20.0000,20.0000,1512.0000,-0.7620,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.1280,0.0000],
    'throwMelon': ["synth",0.0000,0.0750,0.0000,0.0560,0.0000,0.0000,20.0000,616.0000,2400.0000,0.5540,-0.2400,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.7704,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000],
};

let _jsfxInst = null;

const samples = {};

export function init() {
    _jsfxInst = new JSFX();

    Object.keys(waves).forEach(key => {
        const wave = waves[key];
        samples[wave] = _jsfxInst.getSample(wave);
    });
};

export function play(name) {
    _jsfxInst.playSample(samples[name]);
};
