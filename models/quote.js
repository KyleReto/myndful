
let MarkdownIt = require('markdown-it');
// Represents quote objects that will be stored in the database.
class Quote{

	// messages is an array of Message objects
	constructor(messages){
		this.messages = messages;
	}

	static deserialize(object){
		let quote = JSON.parse(object);
		quote = new Quote(quote.messages);
		return quote;
	}

	// Format the contents to be displayed
	format(){
		let md = new MarkdownIt();
		for (let i = 0; i < this.messages.length; i++){
			let text = this.messages[i].text;
			// Add markdown styling
			text = md.render(text);

			this.messages[i].text = text;
			
		}
	}
}

module.exports = Quote;
