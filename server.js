'use strict';

console.log("Clap your hand")

// Require the module
var clapDetector = require('clap-detector');

// Define configuration
var clapConfig = {
   AUDIO_SOURCE: 'alsa hw:' + process.env.MICRO,
   DETECTION_PERCENTAGE_START : process.env.DETEC_START,
   DETECTION_PERCENTAGE_END: process.env.DETEC_STOP,
   CLAP_AMPLITUDE_THRESHOLD: process.env.DETEC_AMPL,
   CLAP_ENERGY_THRESHOLD: process.env.DETEC_ENERGY,
   MAX_HISTORY_LENGTH: 10
};

// Start clap detection
clapDetector.start(clapConfig);

// Register on clap event
clapDetector.onClap(function(history) {
    console.log('one clap !', history);
});

// Register to a series of 3 claps occuring within 2 seconds
clapDetector.onClaps(3, 2000, function(delay) {
    console.log('3 clap !');
});

// Update the configuration
//clapDetector.updateConfig({CLAP_ENERGY_THRESHOLD: 0.2});

