const config = require('../config.js');
const Express = require('express');
let urlencodedParser = Express.urlencoded({ extended: false});

let router = Express.Router();

router.get('/chat/:name', async function(req, res){

	const { Configuration, OpenAIApi } = require("openai");

	const configuration = new Configuration({
		apiKey: config.openai_key,
	});
	const openai = new OpenAIApi(configuration);

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{role: "system", content: config.prompt},
			{role: "user", content: req.params.name}
		],
	});
	res.send(completion.data.choices[0].message.content);
});

router.get('/*', async function(req, res){
	res.render('index');
});

module.exports = router
