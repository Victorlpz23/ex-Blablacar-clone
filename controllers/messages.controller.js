// Requiring Message model
const Message = require('../models/message.model');


// List of message between users
module.exports.list = ((req,res,next) => {
  res.render('messages/chat')
});



// Create a message to another user
module.exports.doCreate = ((req,res,next) => {

});
