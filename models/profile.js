
// Represents single messages, stored in Quote objects.
class Profile{
	// name is the user's (first) name
	// emojiNames is an array of associated emoji (their names)
	// description is a description of the person
	constructor(name, emojiNames, description){
	  this.name = name;
	  this.emojiNames = emojiNames;
	  this.description = description;
	}

	static deserialize(object){
		let profile = JSON.parse(profile);
		profile = new Profile(profile.name, profile.emojiNames, profile.description);
		return profile;
	}
  
	// This class should have no instance (non-static) methods,
	// as it's purely to store data and will be serialized frequently
  }
  module.exports = Profile;
  