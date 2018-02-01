require("dotenv").config();
var keys = require("./keys.js");


//set up liri object
var liri = {

    // Empty string for songs and movies
    title: "",

	fs: require("fs"),

	init: function(userRequest) {

		switch(userRequest) {
    		case "my-tweets":
    		    console.log("chirp chirp");
                this.twitter();
    		    break;

    		case "spotify-this-song":
				console.log("spotifying");
                this.spotifySong(this.title);
    		    break;

    		case "movie-this":
    			console.log("movie that");
                this.movieThis(this.title);
    		    break;

    		case "do-what-it-says":
    			console.log("did it"); 
                this.doSay();              
    		    break;

    		default:
                console.log("Try one of these arguments instead: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
		}

	},

    twitter: function() {
        var twitter = require("twitter");

        var twitterClient = new twitter(keys.twitter);
        var params = {
            screen_name: 'derekhaw1',
            count: 20
        };

        twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {

            // console.log(tweets);
            // console.log(response);

            if (error) {
                console.log("Error: " + error);
                return;
            }

            var tweetLength = tweets.length;

            for (var i = 0; i < tweetLength; i++) {
                var tweetNum = i + 1;

                var tweetObj = {
                    "number": tweetNum,
                    "created": tweets[i].created_at,
                    tweet: tweets[i].text
                };
            }

            console.log(JSON.stringify(tweetObj, null, 2));

        });

    }, 

    spotifySong: function(songTitle) {

        //if no song provided, default to 'Ace Of Base - The Sign'
        if (songTitle === "") {
            songTitle = "Ace of Base - The Sign";
        }

        var spotify = require("node-spotify-api");
        var spotifyClient = new spotify(keys.spotify);

        spotifyClient.search({type: 'track', query: songTitle }, function(err,data) {

            if (err) {
                console.log("Error: " + err);
                return;
            } 

            // console.log(JSON.stringify(data, null, 2));

            var trackObj = {
                Artist: data.tracks.items[0].artists[0].name,
                "Song Name": data.tracks.items[0].name,
                "Preview Link": data.tracks.items[0].preview_url,
                "Album": data.tracks.items[0].album.name
            };
    
            console.log(JSON.stringify(trackObj, null, 2));
        });
    },

    movieThis: function() {
        console.log("movie function is working");
    },

    doSay: function() {
        console.log("doSay function is working");

    }

};


// Run the init method in liri object
liri.init(process.argv[2]);