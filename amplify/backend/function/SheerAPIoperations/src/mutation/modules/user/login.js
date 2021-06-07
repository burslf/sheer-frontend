const AWS = require('aws-sdk')
const jwt = require("jsonwebtoken")
const CryptoJS = require('crypto-js')
const docClient = new AWS.DynamoDB.DocumentClient()
const { paramsUserId } = require("../../../utils/params/UserId")
const JWT_SECRET = process.env.JWT_SECRET
const userTable = process.env.USER_DB

const login = async (event) => {
    const { arguments } = event;
    const { clientId } = arguments;
    if (!clientId) {
        throw Error('clientId not provided')
    }
    const user = await docClient.get(paramsUserId(userTable, clientId)).promise()

    if (user.Item) {
        const uncryptedSecret = CryptoJS.AES.decrypt(user.Item.secret_key, JWT_SECRET)
        console.log(uncryptedSecret)
        user.Item.secret_key = uncryptedSecret.toString(CryptoJS.enc.Utf8)
        const token = jwt.sign(user.Item, JWT_SECRET)
        const reponse = { token }
        return reponse
    }
};

module.exports = login;
