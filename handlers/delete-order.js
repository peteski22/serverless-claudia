const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function deleteOrder(orderId) {
    if (!orderId)
        throw new Error('A valid order ID is required');

    return docClient.delete({
        TableName: 'pizza-orders',
        Key: {
            orderId: orderId
        },
        ConditionExpression: 'orderStatus == :s',
        ExpressionAttributeValues: {
            ':s': 'pending'
        }
    }).promise()
    .then((res) => {
        console.log('Order is delted!', res);
        return res;
    })
    .catch((saveError) => {
        console.log('Oops, order could not be deleted : {`, saveError');
        throw saveError;
    });
}

module.exports = deleteOrder;