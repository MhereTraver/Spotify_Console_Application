require("dotenv").config();
const prompt = require("prompt-sync")();
let SpotifyWebApi = require("spotify-web-api-node");

let spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

async function main() {
  console.log(
    "---------------------------Welcome to my Spotify App-----------------------------------"
  );
  console.log("Press 1 to Search for a song");
  console.log("Press 2 to Exit");
  let exit = false;

  while (!exit) {
    let input = prompt("");
    switch (input) {
      case "1":
        try {
          console.clear();
          const data = await spotifyApi.clientCredentialsGrant();
          spotifyApi.setAccessToken(data.body["access_token"]);

          let songName = prompt("Enter the song name: ");
          const searchData = await spotifyApi.searchTracks(songName);
          let tracks = searchData.body.tracks.items;
          if (tracks.length > 0) {
            tracks.forEach((songData, index) => {
              console.log("\n");
              console.log(`Song result ${index + 1}: `);
              console.log(`Name: ${songData.name}`);
              console.log(`Artist: ${songData.artists[0].name}`);
              console.log(`Album: ${songData.album.name}`);
              console.log(`Preview url: ${songData.preview_url}`);

              console.log(
                "-------------------------------------------------------------------------------------------------------------------"
              );

              console.log(
                "Scroll to see the results, to play the song press Ctrl+click on the url link"
              );
              console.log("Press either 1 to select another song");
              console.log("Select 2 to exit the program");
              console.log(
                "---------------------------------------------------------------------------------------------------------------------"
              );
            });
          } else {
            console.log("No results found.");
          }
        } catch (err) {
          console.log(err.message);
        }
        break;
      case "2":
        exit = true;
        console.clear();
        console.log("Thank you for using our services!");
        break;
      default:
        console.log("Click 1 to select a song or 2 to exit.");
        break;
    }
  }
}

main();
