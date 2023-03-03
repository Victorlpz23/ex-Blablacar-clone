// Requiring Message model
const Message = require('../models/message.model');


// List of message between users
module.exports.list = ((req, res, next) => {
  Message.find({
    $or: [
      { from: req.user._id, to: req.params.id },
      { to: req.user._id, from: req.params.id },
    ]
  })
    .populate('from')
    .populate('to')
    .then((messages) => {
      res.render('messages/chat', { messages, userId: req.params.id })
    }).catch(next)
});



// Create a message to another user
module.exports.doCreate = ((req, res, next) => {
  Message.create({
    from: req.user.id,
    to: req.params.id,
    message: req.body.message,
  })
    .then(() => {
      res.redirect(`/users/${req.params.id}/chat`)
    }).catch(next)
});



module.exports.inbox = (req, res, next) => {
  res.render('messages/inbox')
}