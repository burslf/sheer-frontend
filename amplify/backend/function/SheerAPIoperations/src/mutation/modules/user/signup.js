const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const userTable = process.env.USER_DB;
const crypto = require("crypto");
const { paramsUserEmail } = require("../../../utils/params/UserEmail");
const { paramsNewUser } = require("../../../utils/params/NewUser");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js')

const signup = async (event) => {
  const { arguments } = event;
  const { email } = arguments;
  if (!email) {
    throw Error('Email not provided')
  }
  const userExists = await docClient.query(paramsUserEmail(userTable, email)).promise()
  
  if (userExists.Items[0]) {
    throw Error('User already exists')
  }
  
  const secret_key = `secret_${crypto.randomBytes(32).toString('base64')}`
  const user = {
    client_id: crypto.randomBytes(16).toString("hex"),
    email: email,
    secret_key: secret_key
  }
  console.log(user)
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
