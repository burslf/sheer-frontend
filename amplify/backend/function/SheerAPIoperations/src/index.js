const signup = require('./mutation/modules/user/signup')
const login = require('./mutation/modules/user/login')
const updateUser = require('./mutation/modules/user/updateUser')
const getUserById = require('./query/modules/user/getById')
const getUserByEmail = require('./query/modules/user/getByEmail')
const getSpotifyAuth = require('./query/modules/user/getSpotifyAuth')
const getSpotifyAccessToken = require('./mutation/modules/user/getSpotifyAccessToken')
const getLyrics = require('./query/modules/lyrics/getLyrics')

const resolvers = {
    Query: {
        getUserById: async (event) => {
            return await getUserById(event)
        },
        getUserByEmail: async (event) => {
            return await getUserByEmail(event)
        },
        getSpotifyAuth: async (event) => {
            return await getSpotifyAuth(event)
        },
        getLyrics: async (event) => {
            return await getLyrics(event)
        }
    },
    Mutation: {
        signup: async (event) => {
            return await signup(event);
        },
        login: async (event) => {
            return await login(event)
        },
        updateUser : async (event) => {
            return await updateUser(event)
        },
        getSpotifyAccessToken: async (event) => {
            return await getSpotifyAccessToken(event)
        }
    },
}

exports.handler = async (event, context, callback) => {
    console.log("Received event {} ", JSON.stringify(event, 3));
    const typeHandler = resolvers[event.typeName];
    if(typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if(resolver) {
            return resolver(event)
        }else {
            throw Error("Something went wrong")
        }
    }
};