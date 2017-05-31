'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: 8080,
    routes: {
        cors: true
    }
});

//Connect to db
server.app.db = mongojs('mongodb://'+ process.env.MONGO_USER + ':'+ process.env.MONGO_PASSWORD +'@' + process.env.MONGO_URL + '/' + process.env.MONGO_DATABASE);

//Load plugins and start server
server.register([
    require('./routes/chimera'),
    require('./routes/fight'),
    require('./routes/rank')
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
