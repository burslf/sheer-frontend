const lyricsFinder = require('lyrics-finder');


const getLyrics = async (event) => {
    const { arguments } = event;
    const { artist, title } = arguments
    try {
        let lyrics = await lyricsFinder(artist, title) 
        return {lyrics}
    }catch(err) {
        throw Error('Not Found !')
    }
}

module.exports = getLyrics