const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const userTable = process.env.USER_DB;
const crypto = require("crypto");
const { paramsUserId } = require("../../../utils/params/UserId");
const { paramsNewUser } = require("../../../utils/params/NewUser");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js')

const signup = async (event) => {
  const { arguments } = event;
  const { clientId, email } = arguments;
  if (!email) {
    throw Error('Email not provided')
  }
  if (!clientId) {
    throw Error('Missing ID')
  }
  const userExists = await docClient.get(paramsUserId(userTable, clientId)).promise()
  
  if (userExists.Item) {
    throw Error('User already exists')
  }
  
  const secret_key = `secret_${crypto.randomBytes(32).toString('base64')}`
  const user = {
    client_id: clientId,
    email: email,
    secret_key: secret_key
  }
  const token = jwt.sign(user, JWT_SECRET)
  const encryptedSecret = CryptoJS.AES.encrypt(secret_key, JWT_SECRET).toString()
  user.secret_key = encryptedSecret 
  const userInDb = await docClient.put(paramsNewUser(userTable, user)).promise()
  if (!userInDb) {
    throw Error("Failed to import new user")
  }

  delete user.secret_key // We send back the secret key only in the jwtoken
  return { user, token }

};

module.exports = signup;
