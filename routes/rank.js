'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

exports.register = function (server, options, next) {

    const db = server.app.db;
    db.rank = db.collection('rank')

    server.route({
        method: 'GET',
        path: '/rank',
        handler: function (request, reply) {

            db.rank.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/rank/{num}',
        handler: function (request, reply) {

            db.rank.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (!docs) {
                    return reply(Boom.notFound());
                }

                reply(docs[request.params.num]);
            });

        }
    });

    server.route({
        method: ['POST'],
        path: '/rank',
        handler: function (request, reply) {

            const rank = request.payload;

            //Create an id
            rank._id = uuid.v1();

            db.rank.save(rank, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(rank);
            });
        },
        config: {
            validate: {
                payload: {
                    rank_full: Joi.string().min(1).max(50).required(),
                    rank_short: Joi.string().min(1).max(50).required(),
                }
            }
        }
    });

    // server.route({
    //     method: 'PATCH',
    //     path: '/rank/{id}',
    //     handler: function (request, reply) {

    //         db.rank.update({
    //             _id: request.params.id
    //         }, {
    //             $set: request.payload
    //         }, function (err, result) {

    //             if (err) {
    //                 return reply(Boom.wrap(err, 'Internal MongoDB error'));
    //             }

    //             if (result.n === 0) {
    //                 return reply(Boom.notFound());
    //             }

    //             reply().code(204);
    //         });
    //     },
    //     config: {
    //         validate: {
    //             payload: Joi.object({
    //                 title: Joi.string().min(10).max(50).optional(),
    //                 author: Joi.string().min(10).max(50).optional(),
    //                 isbn: Joi.number().optional()
    //             }).required().min(1)
    //         }
    //     }
    // });

    // server.route({
    //     method: 'DELETE',
    //     path: '/rank/{id}',
    //     handler: function (request, reply) {

    //         db.rank.remove({
    //             _id: request.params.id
    //         }, function (err, result) {

    //             if (err) {
    //                 return reply(Boom.wrap(err, 'Internal MongoDB error'));
    //             }

    //             if (result.n === 0) {
    //                 return reply(Boom.notFound());
    //             }

    //             reply().code(204);
    //         });
    //     }
    // });

    return next();
};

exports.register.attributes = {
    name: 'routes-rank'
};
