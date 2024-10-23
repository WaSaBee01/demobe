const Product = require('../models/ProductModal');


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct;

        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of the product already exists'
                })
            }
            const newProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'Product created successfully',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product does not exist'
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'Product update successfully',
                data: updateProduct
            })
        } catch (e) {
            reject(e);
        }
    });
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product does not exist'
                })
            }

            await Product.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e);
        }
    });
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await Product.deleteMany({ _id: ids })

            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e);
        }
    });
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            if (filter) {
                const label = filter[0];
                const allProductFilter = await Product.find({ [label]: { $regex: filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductFilter,
                    total: totalProduct,
                    currentPage: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const Sort = {}
                Sort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(Sort)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    currentPage: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page * limit)

            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                currentPage: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e);
        }
    });
}

const getProductDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product does not exist'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: product
            })
        } catch (e) {
            reject(e);
        }
    });
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductDetail,
    deleteManyProduct,
    getAllType
}