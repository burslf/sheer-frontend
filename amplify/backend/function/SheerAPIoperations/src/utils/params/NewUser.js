exports.paramsNewUser = (tableName, payload) => {
    return {
            TableName: tableName,
            Item: payload
    }
}
