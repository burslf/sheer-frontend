exports.paramsUserId = (tableName, client_id) => {
    return {
      TableName: tableName,
      Key: {
        "client_id" : client_id
      }
    };
}
