'use strict';

const Hapi = require('hapi');
var clapDetector = require('clap-detector');

// Define configuration
var clapConfig = {
   AUDIO_SOURCE: 'alsa hw:1,0',
   DETECTION_PERCENTAGE_START : '5%',
   DETECTION_PERCENTAGE_END: '5%',
   CLAP_AMPLITUDE_THRESHOLD: 0.4,
   CLAP_ENERGY_THRESHOLD: 0.3,
   MAX_HISTORY_LENGTH: 10
};

// Start clap detection
clapDetector.start(clapConfig);

console.log("Clap your hand")

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

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: 8080,
    routes: {
        cors: true
    }
});
//Load plugins and start server
server.register([
    require('./routes/root')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        if(err) {
          console.log('registration failed', err)
          return;
        }
        console.log('Server running at:', server.info.uri);
    });

});



