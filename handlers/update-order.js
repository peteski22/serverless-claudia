function updateOrder(orderId, updates) {
    if (!orderId || !updates)
        throw new Error('Existing order number updates are required');

    return {
        "message": `Order ${orderId} was updated successfully`
    };
}

module.exports = updateOrder;