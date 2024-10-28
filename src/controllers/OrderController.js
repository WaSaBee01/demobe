const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body;
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Please fill in all fields'
            })
        }
        const response = await OrderService.createOrder(req.body);
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: e
        })
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'User ID is required'
            })
        }
        const response = await OrderService.getOrderDetails(userId);
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getOrderDetails,
}