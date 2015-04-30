/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Article = require('./article.model');

exports.register = function(socket) {
  Article.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Article.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('article:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('article:remove', doc);
}
