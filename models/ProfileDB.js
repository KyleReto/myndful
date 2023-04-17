
// This file handles getting profiles. In future, this may be turned into a full database connection, but for now it just reads a JSON file.
const Profile = require('./profile.js');
const fs = require('fs');
const { triggerAsyncId } = require('async_hooks');

class ProfileDB{

	// Add a profile to the "database"
	static addProfile(name, emojiNames, description){
		let profile = new Profile(name, emojiNames, description);
		try{
			let profiles = fs.readFileSync('models/profiles.json');
			profiles = JSON.parse(profiles);
			profiles.push(profile);
			let json = JSON.stringify(profiles);
			fs.writeFileSync('models/profiles.json', json, 'utf8');
			return json;
		}catch(err){
			return err;
		}
	}

	static getProfile(name){
		try{
			let profiles = fs.readFileSync('models/profiles.json');
			profiles = JSON.parse(profiles);
			for (let i = 0; i < profiles.length; i++){
				if (profiles[i].name === name){
					return profiles[i];
				}
			}
			return null;
		}catch(err){
			return null;
		}
	}

	// Populate the JSON file. This entirely resets the JSON file.
	static setJSONFile(){
		let profiles = []
		profiles.push(new Profile('Kyle', ['KyleObserve'], 'It\'s me, I\'m here.'));
		try{
			let json = JSON.stringify(profiles);
			fs.writeFileSync('models/profiles.json', json, 'utf8');
			return json;
		}catch(err){
			return err;
		}
	}
}

module.exports = ProfileDB;
