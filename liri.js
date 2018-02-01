require("dotenv").config();

//set up liri object
var liri = {
	fs: require("fs"),

	logic: function(userRequest) {
		switch(userRequest) {
    		case "my-tweets":
    		 	console.log("chirp chirp");
                this.twitter();
    		break;

    		case "spotify-this-song":
				console.log("spotifying");
    		    break;

    		case "movie-this":
    			console.log("movie that");
    		    break;

    		case "do-what-it-says":
    			console.log("did it");
    		    break;

    		default:
                console.log("Try one of these arguments instead: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
		}
	},

    twitter: function() {
        var keysFile = require("./keys.js");
        var twitter = require("twitter");

        var client = new twitter(keysFile.twitter);
        var params = {
            screen_name: 'derekhaw1',
            count: 20
        };

        client.get('statuses/user_timeline', params, function(error, tweets, response) {

            // console.log(tweets);
            // console.log(response);

            if (error) {
                console.log("An error: " + error);
            }

            var tweetLength = tweets.length;

            for (var i = 0; i < tweetLength; i++) {
                var tweetNum = i + 1;

                var builtTweet = {
                    "number": tweetNum,
                    "created": tweets[i].created_at,
                    tweet: tweets[i].text
                };
            }

            console.log(builtTweet);

        });

    }, 

    spotifySong: function() {

    },

    movieThis: function() {

    },

    doSay: function() {

    }

};

liri.logic(process.argv[2]);