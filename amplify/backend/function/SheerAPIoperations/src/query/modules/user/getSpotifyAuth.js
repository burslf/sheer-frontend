const AWS = require('aws-sdk')
const querystring = require('querystring')
const spotify_client = process.env.SPOTIFY_CLIENT
// const spotify_secret = process.env.SPOTIFY_SECRET
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

const getSpotifyAuth = async (event) => {
    const { arguments } = event;
    const params = {
        client_id : spotify_client,
        response_type : 'code',
        redirect_uri : redirect_uri,
        scope: "playlist-read-collaborative user-read-recently-played ugc-image-upload user-top-read playlist-modify-public user-library-read user-read-private user-read-email playlist-read-private user-library-modify playlist-modify-private"
    }
    let url = 'https://accounts.spotify.com/authorize?';
    url += querystring.stringify(params)
    return {
        auth_endpoint: url
    }
}

module.exports = getSpotifyAuth