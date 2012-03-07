var fs = require('fs');
var Hash = require('hashish');
var twitter = require('twitter-stream');

var config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

var tags = {};

function getMax() {
	var max = 0;
	var maxKey = "";
	Hash(tags).forEach(function(value, key) {
		if (value > max) {
			max = value;
			maxKey = key;
		}
	});
	
	return maxKey
}

twitter.public(config.username, config.password, function(tweet) {
	// Iterate over each hashtag
	tweet.entities.hashtags.forEach(function(hashtag) {
		tag = hashtag.text.toLowerCase();
		if (tags[tag]) {
			tags[tag] += 1;
		}
		else {
			tags[tag] = 1;
		}
		
		maxTag = getMax();
		process.stdout.write("\r                                      \r" + maxTag + " - " + tags[maxTag]);
	})
});