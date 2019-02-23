function deleteOrder(orderId) {
    if (!orderId)
        throw new Error('A valid order ID is required');

    return {};
}

module.exports = deleteOrder;