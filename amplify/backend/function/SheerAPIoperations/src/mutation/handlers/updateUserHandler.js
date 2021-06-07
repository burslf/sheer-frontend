const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();


const updateUserHandler = async (client_id, item, tableName) => {
    const items = Object.entries(item);
    const params = {
        TableName: tableName,
        UpdateExpression: 'set',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
        Key: { 'client_id': client_id },
        ReturnValues: "ALL_NEW"
    };

    items.forEach(([key, value]) => {
        if (key === 'client_id') return;
        params.UpdateExpression += ` #${key} = :${key},`;
        params.ExpressionAttributeNames[`#${key}`] = key;
        params.ExpressionAttributeValues[`:${key}`] = value;
    })

    // remove the last comma 
    params.UpdateExpression = params.UpdateExpression.slice(0, -1)

    const response = await documentClient.update(params).promise()
    if (response) return response.Attributes
    else return null
}

module.exports = { updateUserHandler }