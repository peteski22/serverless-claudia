const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function updateOrder(orderId, updates) {
    if (!updates || !updates.pizza || !updates.address)
        throw new Error('Both pizza and address are required to update an order')

    return docClient.update({
        TableName: 'pizza-orders',
        Key: { orderId: orderId },
        UpdateExpression: 'set pizza = :p, address = :a',
        ExpressionAttributeValues: {
            ':p': updates.pizza,
            ':a': updates.address,
            ':s': 'pending'
        },
        ReturnValues: 'ALL_NEW'
        ConditionExpression: 'orderStatus == :s'
    }).promise()
    .then((res) => {
        console.log('Order is updated!', res);
        return res;
    })
    .catch((saveError) => {
        console.log('Oops, order could not be updated : {`, saveError');
        throw saveError;
    });
}

module.exports = updateOrder;