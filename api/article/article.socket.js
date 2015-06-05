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
};

function onSave(socket, doc, cb) {
  if(doc.isSnack)
    socket.emit('snack:save', doc);
  else
    socket.emit('dish:save', doc);
}

function onRemove(socket, doc, cb) {
  if(doc.isSnack)
    socket.emit('snack:remove', doc);
  else
    socket.emit('dish:remove', doc);
}
