'use strict';

exports.register = function (server, options, next) {


    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
          reply("hello Sraleik");
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-root'
};
