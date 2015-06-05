/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Date = require('./date.model');

exports.register = function(socket) {
  Date.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Date.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('date:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('date:remove', doc);
}