
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

			// Handle emoji by replacing all substrings like ":emoji:" with their respective images
			let array = text.split(':');
			// If there's a ":" somewhere in the string that doesn't have a matching ":"
			if (array.length % 2 != 1){
				// Just abort processing that string entirely. This does mean that strings that contain both unmatched ":"s and custom emoji will be unprocessed.
				continue;
			}
			let emojiCount = (array.length - 1) / 2;
			for (let i = 0; i < emojiCount; i++){
				let emoji = array[i+1];
				// This only supports pngs
				emoji = '<img class="emoji" src="/assets/emoji/' + emoji + '.png">'
				array[i+1] = emoji;
			}
			text = array.join('');

			this.messages[i].text = text;
			
		}
	}
}

module.exports = Quote;
