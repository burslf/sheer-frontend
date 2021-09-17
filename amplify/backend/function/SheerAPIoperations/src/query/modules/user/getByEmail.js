const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const userTable = process.env.USER_DB
const { paramsUserEmail } = require('../../../utils/params/UserEmail')
const getUserById = async (event) => {
    const { arguments } = event;
    const { email } = arguments;

    try {
        const user = await docClient.query(paramsUserEmail(userTable, email)).promise()
        console.log('ITEMS', user)
        return user.Items[0]
    }catch (err) {
        throw Error(err)

    }
}

module.exports = getUserById