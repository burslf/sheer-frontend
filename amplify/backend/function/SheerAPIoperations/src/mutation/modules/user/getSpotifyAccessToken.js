const axios = require('axios').default;
const spotify_client = process.env.SPOTIFY_CLIENT;
const spotify_secret = process.env.SPOTIFY_SECRET;

const getSpotifyAccessToken = async (event) => {
    const { arguments } = event;
    const { code, redirectUri } = arguments;

    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + redirectUri;
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