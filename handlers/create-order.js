'use strict'

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const rp = require('minimal-request-promise');

function createOrder(request) {
    if (!request || !request.pizza || !request.address)
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');

    return rp.post('https://some-like-it-hot.effortless-serverless.com/delivery', {
        headers: {
            "Authorization": "fo shizzle",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            pickupTime: '15.34pm',
            pickupAddress: 'Aunt Maria Pizzeria',
            deliveryAddress: request.address,
            webhookUrl: 'https://3hs9f2zp8l.execute-api.eu-west-1.amazonaws.com/latest/delivery'
        })
    })


    return docClient.put({
        TableName: 'pizza-orders',
        Item: {
            orderId: uuid(),
            pizza: request.pizza,
            address: request.address,
            orderStatus: 'pending'
        }
    }).promise()
    .then((res) => {
        console.log('Order is saved!', res);
        return res;
    })
    .catch((saveError) => {
        console.log('Oops, order is not saved : {`, saveError');
        throw saveError;
    });
}

module.exports = createOrder;