const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./jwtService');
const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModal");

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder;

        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                console.log('productData', productData)
                if (productData) {
                    const createdOrder = await Order.create({
                        orderItems,
                        shippingAdress: {
                            fullName,
                            address,
                            city,
                            phone
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user
                    })
                    if (createdOrder) {
                        return {
                            status: 'OK',
                            message: 'Order created successfully',
                        }
                    }
                } else {
                    return {
                        status: 'ERR',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })

            const results = await Promise.all(promises);
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id ${newData.join(',')} đã hết hàng`,
                    data: newData
                })
            }
            resolve({
                status: 'OK',
                message: 'Order created successfully',
            })
        } catch (e) {
            console.log('error', e)
            reject(e);
        }
    });
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                user: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order does not exist'
                })
            } else {
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: order
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}



module.exports = {
    createOrder,
    getOrderDetails,
}