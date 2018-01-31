require("dotenv").config();

//set up liri object
var liri = {
	fs: require("fs"),

	logic: function(userRequest) {
		switch(userRequest) {
    		case "my-tweets":
    		 	console.log("chirp chirp");
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
		}
	}


}