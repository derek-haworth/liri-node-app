# liri-node-app
 A command line node app that takes in parameters and gives you back data using Twitter, Spotify, and Request, for OMDB, node packages.

### How can I view the app?

1. Install node if it's not already.
2. Open the folder directory in your terminal.
3. Run `npm install` to download all the dependencies required for this app.
4. Type `node liri.js 'command' 'argument(s)'`

### Commands and Arguments

* The application takes 4 different commands

  * `my-tweets`
  * `spotify-this-song`
  * `movie-this`
  * `do-what-it-says`

* `spotify-this-song` and `movie-this` take arguments that can be typed after their appropriate command.

For example: 
* `node liri.js spotify-this-song Californication`
<br>
![Spotify](images/node_spotify.png)
<br>
* `node liri.js movie-this Jurassic Park`
<br>
![OMDB](images/node_movie.png)

