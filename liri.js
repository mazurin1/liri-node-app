require("dotenv").config();
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
        console.log;
        break;
    case "do-what-it-says":
        console.log;
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

    spotify.search({ type: 'album,artist,playlist,track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
            console.log(data)

    //         Artist(s)

    //  * The song's name

    //  * A preview link of the song from Spotify

    //  * The album that the song is from
        }
    });

}
