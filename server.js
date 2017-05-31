'use strict';

const Hapi = require('hapi');

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
