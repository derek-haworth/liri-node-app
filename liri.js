require("dotenv").config();
var keys = require("./keys.js");


//set up liri object
var liri = {

    // Empty string for songs and movies
    title: "",

	fs: require("fs"),

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

            // console.log(JSON.stringify(tweetObj, null, 2));

            liri.consoleDotLog(tweetObj);
            liri.logOutput(tweetObj);

        });

    }, 

    spotifySong: function(songTitle) {

        //if no song provided, default to 'Ace Of Base - The Sign'
        if (songTitle === "") {
            songTitle = "Ace of Base - The Sign";
        }

        var spotify = require("node-spotify-api");
        var spotifyClient = new spotify(keys.spotify);

        spotifyClient.search({type: 'track', query: songTitle }, function(error,data) {

            if (error) {
                console.log("Error: " + error);
                return;
            } 

            // console.log(JSON.stringify(data, null, 2));

            var trackObj = {
                Artist: data.tracks.items[0].artists[0].name,
                "Song Name": data.tracks.items[0].name,
                "Preview Link": data.tracks.items[0].preview_url,
                "Album": data.tracks.items[0].album.name
            };
    
            // console.log(JSON.stringify(trackObj, null, 2));

            liri.consoleDotLog(trackObj);
            liri.logOutput(trackObj);
        });
    },

    movieThis: function(movieTitle) {
        console.log("movie function is working");

        if (movieTitle === "") {
            movieTitle = "mr+nobody";
        } 

        var request = require("request");
        var queryUrl = 'http://www.omdbapi.com/?t=' + movieTitle +'&y=&plot=short&apikey=trilogy';

        request(queryUrl, function(error, response, body) { 

            if (!error && response.statusCode === 200) {
                body = JSON.parse(body);

                var movieObj = {
                    Title: body.Title,
                    Year: body.Year,
                    "IMDB Raging": body.imdbRating,
                    Country: body.Country,
                    Language: body.Language,
                    Plot: body.Plot,
                    Actors: body.Actors,
                    "Rotten Tomato Rating": body.tomatoRating,
                    "Rotten Tomato URL": body.tomatoURL 
                } 
            }

            liri.consoleDotLog(movieObj);
            liri.logOutput(movieObj);

        });
    },

    doSay: function() {
        console.log("doSay function is working");

    },

    // Method to log details to random.txt
    logOutput: function(obj) {

        // TODO: add timestamp
        this.fs.appendFile("log.txt", "\n\n" + JSON.stringify(obj, null, 2), function(error) {

            if (error) {
                console.log("Error: " + error);
                return;
            }
        });

    },

    consoleDotLog: function(inputObj) {
        console.log("\n===============\n");
        for (var key in inputObj) {
            console.log(key + ": " + inputObj[key]);
        }

    }, 

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
    }
};


// Run the init method in liri object
liri.init(process.argv[2]);