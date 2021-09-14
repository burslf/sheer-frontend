const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const userTable = process.env.USERS_DB

const getUserById = async (event) => {
    const { arguments } = event;
    const { clientId } = arguments;
    const params = {
        TableName: userTable,
        Key: {"client_id" : clientId}
    }
    try {
        const { Item } = await docClient.get(params).promise()
        if (Item) return Item
        else throw Error("Couldn't find user")
    }catch (err) {
        console.log(err)
        return err
    }
}

module.exports = getUserById