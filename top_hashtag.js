var fs = require('fs');
var twitter = require('twitter-stream');

var config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

twitter.public(config.username, config.password, function(tweet) {
	console.log(tweet);
});