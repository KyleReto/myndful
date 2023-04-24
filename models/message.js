
// Represents single messages, stored in Quote objects.
class Message{
  // sender is the sender's name
  // text is the text content of the message
  constructor(sender, text){
    this.sender = sender;
    this.text = text;
  }

  // This class should have no instance (non-static) methods,
  // as it's purely to store data and will be serialized frequently
}
module.exports = Message;
