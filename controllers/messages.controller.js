// Requiring Message model
const Message = require('../models/message.model');

// Requiring User model
const User = require('../models/user.model');


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
module.exports.doCreate = (req, res, next) => {
  Message.create({
    message: req.body.message,
    to: req.params.id,
    from: req.user.id
  })
  .then(() => {
    console.log(req.user.adquiredChats.map((x) => x = x.id))
    if (req.user.adquiredChats.map((x) => x = x.id).includes(req.params.id)){
    } else {
      req.user.adquiredChats.push(req.params.id)
      User.findByIdAndUpdate(req.user.id, req.user)
      .then(() => console.log('updated'))
      .catch(next)
      User.findById(req.params.id)
      .then((userTo) => {
        userTo.adquiredChats.push(req.user.id)
        User.findByIdAndUpdate(req.params.id, userTo)
          .then(() => console.log('updated'))
          .catch(next)
      })
      .catch(next)
    }
    res.redirect(`/users/${req.params.id}/chat`)
  })
  .catch(next)
}

// Rendering the inbox page for user
module.exports.inbox = (req, res, next) => {
  res.render('messages/inbox')
}