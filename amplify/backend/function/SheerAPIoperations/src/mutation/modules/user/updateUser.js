const {updateUserHandler} = require('../../handlers/updateUserHandler')
const usersTable = process.env.USER_DB;

const updateUser = async (event) => {
    const { arguments } = event;
    const payload = JSON.parse(arguments.payload)
    const client_id = arguments.clientId
    if(!payload) {
        throw Error("No payload provided")
    }
    if(!client_id) {
        throw Error("No clientId provided")
    }
    let userInfos = {}
    for (const field in payload) {
        userInfos[field] = payload[field]
    }
    console.log("User Infos : ")
    const userUpdate = await updateUserHandler(client_id, payload, usersTable)
    if(!userUpdate) {
        throw Error("Failed to update user")
    }
    return userUpdate
};

module.exports = updateUser;
