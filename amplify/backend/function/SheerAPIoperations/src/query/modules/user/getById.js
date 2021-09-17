const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const userTable = process.env.USERS_DB

const getUserById = async (event) => {
    const { arguments } = event;
    const { email } = arguments;
    const params = {
        TableName: userTable,
        IndexName: 'email',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {':email' : email}
        }
    try {
        const { Item } = await docClient.get(params).promise()
        return Item
    }catch (err) {
        throw Error("Couldn't find user")

    }
}

module.exports = getUserById