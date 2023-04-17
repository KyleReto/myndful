const Quote = require('../models/quote.js');
const Message = require('../models/message.js');
const QuoteDB = require('../models/quoteDB.js');
const ProfileDB = require('../models/profileDB.js');
const config = require('../config.js');
const Express = require('express');
let urlencodedParser = Express.urlencoded({ extended: false});

let router = Express.Router();

router.post('/addquote', urlencodedParser, async function(req, res){
	// If password isn't correct, give an error.
	// Note: This isn't actually very secure, but it'll do for this purpose.
	if (req.body.password != config.adminPass) return res.send('Error: Invalid Password');
	let messages = [];
	// For each message in the request
	for (let i = 0; i < req.body.sender.length; i++){
		// If there's no text and no embed (message is empty/invalid), continue
		if (req.body.message[i] == '' && req.body.embed[i] == '') continue

		let message = new Message(req.body.sender[i], req.body.message[i], req.body.embed[i]);
		// Null the embed if it's nonexistent
		if (message.embedPath == ''){
			message.embedPath = null;
		}
		messages.push(message)
	}
	let quote = new Quote(messages);
	let id = await QuoteDB.addQuote(quote);
	res.redirect('/quote/' + id);
});

router.post('/removeQuote', urlencodedParser, async function(req, res){
	if (req.body.password != config.adminPass) return res.send('Error: Invalid');
	let result = await QuoteDB.removeQuote(req.body.id);
	res.send(result);
});

router.get('/addQuote', function(req, res){
	res.render('submit');
});

router.get('/removeQuote', function(req, res){
	res.render('removeQuote');
});

router.get('/search', async function(req, res){
	if (typeof req.query.query === 'undefined') return res.render('search');
	await QuoteDB.searchQuotes(req.query.query).then((quotes) => {
		return res.render('search', {quotes: quotes, query:req.query.query, avatars: config.avatars});
	}).catch((err) => {
		return res.send("Sorry, something went wrong. Try again later.");
	});
});

router.get('/profiles/:name', function(req, res){
	res.redirect('/search?query=' + req.params.name);
});

router.get('/quote', function(req, res){
	res.redirect('/quote/' + QuoteDB.getRandomID().toString());
});

router.get('/quote/:id', async function(req, res){
	QuoteDB.getQuote(req.params.id).then((quote) => {
		return res.render('quote', {quote: quote, id: req.params.id, avatars: config.avatars});
	}).catch((err) => {
		console.log(err);
		return res.send('Sorry, that quote doesn\'t exist');
	});
});

router.get('/populateProfiles', async function(req, res){
	res.send(ProfileDB.setJSONFile());
});

router.get('/persosona', function(req, res){
	res.render('persosona');
});

router.get('/*', async function(req, res){
	res.render('index');
});

module.exports = router
