'use strict';

const sockets = require('socket.io');
const log = require('./models/log').module('Sockets');

module.exports = (server) => {

  const io = sockets(server);

  io.on('connection', (client) => {
    log.info('Client connected.');

    client.on('subscribe', (data) => {
      const channel = data.channel;
      log.info(`Client asks to subscribe to redis channel: "${channel}"`);

      const subscriber = require('./models/redis/subscriber');
      subscriber.subscribe(channel).catch((err) => log.error(err));

      subscriber.getClient().on('message', (pchannel, message) => {
        client.emit('message', JSON.parse(message));
      });

      client.on('disconnect', () => {
        log.info('Client disconnected.');
      });
    });
  });

};
