// required for api keys
require("dotenv").config();
var keys = require("./keys.js");


//set up liri object
var liri = {

    // Empty string for songs and movies
    title: "",

    // require file systems for writing and appending methods
	fs: require("fs"),

    twitter: function() {
        var twitter = require("twitter");

        var twitterClient = new twitter(keys.twitter);
        // set up a params object to pass in get method
        var params = {
            screen_name: 'derekhaw1',
            count: 20
        };

        twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {

            if (error) {
                console.log("Error: " + error);
                return;
            }

            // loop through tweets and build into their own objects
            var tweetLength = tweets.length;
            for (var i = 0; i < tweetLength; i++) {
                // only show last 20 tweets
                if ( i <= 20 ) {
                    var tweetNum = i + 1;

                    var tweetObj = {
                        "number": tweetNum,
                        "created": tweets[i].created_at,
                        tweet: "\"" + tweets[i].text + "\""
                    };

                    liri.consoleDotLog(tweetObj);

                    liri.logOutput(tweetObj);
                }
            }
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

            // build the song object
            var trackObj = {
                Artist: data.tracks.items[0].artists[0].name,
                "Song Name": data.tracks.items[0].name,
                "Preview Link": data.tracks.items[0].preview_url,
                "Album": data.tracks.items[0].album.name
            };
    
            liri.consoleDotLog(trackObj);
            liri.logOutput(trackObj);
        });
    },

    movieThis: function(movieTitle) {
        console.log("movie function is working");

        //if no movie provided, default to 'Mr Nobody'
        if (movieTitle === "") {
            movieTitle = "mr+nobody";
        } 

        var request = require("request");
        var queryUrl = 'http://www.omdbapi.com/?t=' + movieTitle +'&y=&plot=short&apikey=trilogy';

        request(queryUrl, function(error, response, body) { 

            if (!error && response.statusCode === 200) {
                body = JSON.parse(body);

                // build the movie object
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

    // TODO: Think of better way to accept random.txt input
    // for example if the cmd was movie-this instead of spotify-this-song
    doSay: function() {
        console.log("doSay function is working");

        this.fs.readFile("random.txt", "utf8", function(error, data) {
            
            if (error) {
                console.log("Error: " + error);
                return;
            }

            var end = data.indexOf(",");
            var cmd = data.slice(0, end);
            var start = end + 2;

            liri.title = data.slice(start, -1);
            // pass value into init method
            liri.init(cmd, liri.title);
        });

    },

    // Method to log details to random.txt
    logOutput: function(obj) {

        // Create a date timestamp
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); 
        var year = currentDate.getFullYear();
        var dateString = (month + 1) + "-" +date + "-" + year;

        // append object to the log everytime a command is run
        this.fs.appendFile("log.txt", "\n\n" + dateString + "\n" + JSON.stringify(obj, null, 2), function(error) {

            if (error) {
                console.log("Error: " + error);
                return;
            }
        });

    },

    // loop through the object built in the arguments methods and console log it
    consoleDotLog: function(inputObj) {
        console.log("\n===============\n");
        for (var key in inputObj) {
            console.log(key + ": " + inputObj[key]);
        }
    },

    acceptMultipleArgs: function(charCapture) {

        var nodeArgs = process.argv;
        // Capture all the words in the empty var = title, ignoring the first two Node arguments)
        this.title = nodeArgs.slice(3).join(charCapture);

    }, 

    init: function(userRequest, doSay) {

        switch(userRequest) {
            case "my-tweets":
                console.log("chirp chirp");

                this.twitter();

                break;

            case "spotify-this-song":
                console.log("spotifying");

                // if there is no second argument, which comes from doSay function
                // not ideal if there was a different cmd in the random.txt but works for this purpose
                if (doSay === undefined) {
                    var titleSpace = " ";
                    this.acceptMultipleArgs(titleSpace);
                }
                this.spotifySong(this.title);

                break;

            case "movie-this":
                console.log("movie that");

                var titlePlus = "+";
                this.acceptMultipleArgs(titlePlus);
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

// Run the init method in liri object.
liri.init(process.argv[2]);
