exports.paramsUserEmail = (tableName, email) => {
  return {
    TableName: tableName,
    IndexName: "email",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: { "#email": "email" },
    ExpressionAttributeValues: { ":email": email },
  };
}