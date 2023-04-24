const config = require('../config.js');
const Express = require('express');
let urlencodedParser = Express.urlencoded({ extended: false});
// A quote is a collection of messages.
const Quote = require('../models/quote.js');
const Message = require('../models/message.js');
let router = Express.Router();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: config.openai_key,
});
const openai = new OpenAIApi(configuration);

router.post('/chat', urlencodedParser, async function(req, res){
	let str = config.prompt
	for (const msg of config.script){
		str += msg + '\n'
	}
	let gpt_messages = [
		{role: "system", content: str}
	]
	let messages = [];
	// For each message in the request
	for (let i = 0; i < req.body.sender.length; i++){
		let message = new Message(req.body.sender[i], req.body.message[i]);
		let role = 'assistant'
		if (req.body.sender[i] === 'You'){
			role = 'user'
		}
		gpt_messages.push({role: role, content: req.body.message[i]})
		messages.push(message);
	}
	let completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: gpt_messages,
		temperature: 0.2
	});
	messages.push(new Message('MyndfulBot', completion.data.choices[0].message.content))
	let quote = new Quote(messages);
	return res.render('index', {quote: quote, linksEnabled: true, avatars: config.avatars});
});

router.get('/chat/:name', async function(req, res){
	res.send();
	res.render('index', {avatars: config.avatars});
});

router.get('/*', async function(req, res){
	let messages = [
		new Message('MyndfulBot', "Hello! Welcome to Myndfulness. I'm your “MyndfulBot”, a chatbot powered by ChatGPT. I'm here to teach you mindfulness to help you enhance your mental health."),
		new Message('MyndfulBot', "The lessons were written by humans, but I've personalized it to your unique needs and I can answer any questions along the way."),
		new Message('MyndfulBot', "What is your name and what brings you here? Also, if you tell me about something you're interested in, I'll try to tailor this lesson to that interest."),
	];
	let quote = new Quote(messages);
	return res.render('index', {quote: quote, linksEnabled: true, avatars: config.avatars});
});

module.exports = router
