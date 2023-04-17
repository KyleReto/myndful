
// Represents single messages, stored in Quote objects.
class Message{
  // sender is the sender's name (ex. David, Jon, etc.)
  // text is the text content of the message
  // embedPath is the path to the embedded image, if it exists. Optional.
  constructor(sender, text, embedPath){
    this.sender = sender;
    this.text = text;
    // embedPath is null instead of undefined if nonexistent
    typeof embedPath === 'undefined' ? this.embedPath = null : this.embedPath = embedPath
  }

  // This class should have no instance (non-static) methods,
  // as it's purely to store data and will be serialized frequently
}
module.exports = Message;
