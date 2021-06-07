const axios = require('axios').default;
const spotify_client = process.env.SPOTIFY_CLIENT;
const spotify_secret = process.env.SPOTIFY_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

const getSpotifyAccessToken = async (event) => {
    const { arguments } = event;
    const { code } = arguments;

    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + redirect_uri;
    body += "&client_id=" + spotify_client;
    body += "&client_secret=" + spotify_secret;

    let url = 'https://accounts.spotify.com/api/token';
    let response = {}
    
    try {
        const getAccess = await axios.post(url, body)
        console.log(getAccess.data)
        response.data = getAccess.data
        response.status = getAccess.status
        return response
    }catch(e) {
        throw Error(e.message)
    }
}

module.exports = getSpotifyAccessToken