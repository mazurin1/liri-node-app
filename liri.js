require("dotenv").config();
var fs = require("fs");
const axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);



var argv = process.argv
var command = argv[2]

switch (command) {
    case "concert-this":
        bandsInTown(argv);
        break;
    case "spotify-this-song":
        spotifyThisSong(argv);
        break;
    case "movie-this":
        omdbMovies(argv);
        break;
    case "do-what-it-says":
        doWhatItSays(argv);
        break;
    default:
        console.log("Invalid command.");
        break;
}

function bandsInTown(argv) {
    if (argv[3] !== undefined) {
        console.log(argv[3])

        //var response = axios.get("https://rest.bandsintown.com/artists/" 
        // + argv[3] + "/events?app_id=codingbootcamp");
        //handle success

        axios.get("https://rest.bandsintown.com/artists/"
            + argv[3] + "/events?app_id=codingbootcamp")
            .then(function (response) {
                // handle success
                // console.log(response.data);
                var events = response.data;
                for (var i = 0; i < events.length; i++) {
                    console.log('Event: ' + events[i].venue.name);
                    console.log('Location: ' + events[i].venue.city + ', ' + events[i].venue.region);
                    console.log('Date: ' + moment(events[i].datetime).format('MM/DD/YYYY'));
                    console.log('');
                }
            })

    } else {
        console.log("Please specify an artist/band name")
    }

}

function spotifyThisSong(argv) {
    var songName = ''
    if (argv[3] !== undefined) {
        songName = argv[3]
    } else {
        songName = 'The Sign';
    }

    spotify.search({ type: 'album,artist,playlist,track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            //console.log(JSON.stringify(data, null, 2))
            var songs = data;
            songs = songs.tracks.items; 
            for (var i = 0; i < songs.length; i++) {
                console.log('Artist: ' + songs[i].artists[0].name);
                console.log('Song Title : ' + songs[i].name);
                console.log('Album: ' + songs[i].album.name);
                console.log('Preview Song: ' + songs[i].preview_url);





                console.log('');
            }
        }
    });


}

function omdbMovies(argv) {
    if (argv[3] !== undefined) {
        console.log(argv[3])

        //var response = axios.get("https://rest.bandsintown.com/artists/" 
        // + argv[3] + "/events?app_id=codingbootcamp");
        //handle success

        axios.get("https://www.omdbapi.com/?t=" + argv[3] + "&y=&plot=short&apikey=trilogy")

            .then(function (response) {
                // handle success
                // console.log(response.data);
                var movie = response.data;
                console.log('Title: ' + movie.Title);
                console.log('Year: ' + movie.Year);
                console.log('IMDB Rating: ' + movie.Ratings[0].Source);
                console.log('Rotten Tomato Rating: ' + movie.Ratings[1].Source);
                console.log('County: ' + movie.Country);
                console.log('Language: ' + movie.English);
                console.log('Plot: ' + movie.Plot);
                console.log('Actors: ' + movie.Actors);

                console.log('');

            })

    } else {
        console.log("Please specify an artist/band name")
    }

}


// fs is a core Node package for reading and writing files

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
function doWhatItSays(argv) {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        var command = dataArr[0];
        switch (command) {
            case "concert-this":
                bandsInTown(argv);
                break;
            case "spotify-this-song":
                spotifyThisSong(argv);
                break;
            case "movie-this":
                omdbMovies(argv);
                break;
            default:
                console.log("Invalid command.");
                break;
        }
    });
}