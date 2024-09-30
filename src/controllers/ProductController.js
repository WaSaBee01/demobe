const ProductService = require('../services/ProductService')


const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body;
        if (!name || !image || !type || !price || !countInStock || !rating ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Please fill in all fields'
            })
        } 
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'product Id  is required'
            })
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product ID is required'
            })
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const response = await ProductService.getAllProduct();
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: e
        })
    }
}

const getProductDetail = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product ID is required'
            })
        }
        const response = await ProductService.getProductDetail(productId);
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductDetail
}