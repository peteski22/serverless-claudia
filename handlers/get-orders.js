const orders = require('../data/orders.json');

function getOrders(orderId) {
    if (!orderId)
        return orders;

    const order = orders.find((order) => {
        return order.id == orderId;
    });

    if (order) 
        return order;

    throw new Error('The order you requested was not found');
}

module.exports = getOrders