const Product = require("../models/Product");


const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }


        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};

            if (req.query.minPrice) {
                filter.price.$gte = Number(req.query.minPrice);
            }

            if (req.query.maxPrice) {
                filter.price.$lte = Number(req.query.maxPrice);
            }
        }

        const allowedSortFields = [
            "name", "price", "quantity", "createdAt"
        ];

        const sortBy = allowedSortFields.includes(req.query.sortBy)
            ? req.query.sortBy
            : "createdAt";

        const order = req.query.order === "asc" ? 1 : -1;

    
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(
            100,
            Math.max(1, parseInt(req.query.limit) || 10)
        );

        const skip = (page - 1) * limit;

        const products = await Product.find(filter)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            products
        });
    } catch (error) {
        next(error);
    }
};


const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};


const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        next(error);
    }
};


const updateStock = async (req, res, next) => {
    try {
        const { quantity } = req.body;

        if (quantity === undefined || !Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid non-negative integer quantity"
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { quantity },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            product
        });
    } catch (error) {
        next(error);
    }
};


const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

const getLowStockProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$reorderLevel"]
            }
        });

        res.status(200).json({
            success: true,
            totalLowStockProducts: products.length,
            products
        });
    } catch (error) {
        next(error);
    }
};


const getCategorySummary = async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    },
                    averagePrice: { $avg: "$price" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.status(200).json({
            success: true,
            categorySummary: summary
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateStock,
    deleteProduct,
    getLowStockProducts,
    getCategorySummary
};

