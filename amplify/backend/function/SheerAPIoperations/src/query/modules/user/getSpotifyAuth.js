const AWS = require('aws-sdk')
const querystring = require('querystring')
const spotify_client = process.env.SPOTIFY_CLIENT

const getSpotifyAuth = async (event) => {
    const { arguments } = event;
    const { redirectUri } = arguments
    const params = {
        client_id : spotify_client,
        response_type : 'code',
        redirect_uri : redirectUri,
        scope: "playlist-read-collaborative user-read-recently-played ugc-image-upload user-top-read playlist-modify-public user-library-read user-read-private user-read-email playlist-read-private user-library-modify playlist-modify-private"
    }
    let url = 'https://accounts.spotify.com/authorize?';
    url += querystring.stringify(params)
    return {
        auth_endpoint: url
    }
}

module.exports = getSpotifyAuth