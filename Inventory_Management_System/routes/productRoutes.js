
const express = require("express");

const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateStock,
    deleteProduct,
    getLowStockProducts,
    getCategorySummary
} = require("../controllers/productController");


router.post("/", createProduct);

router.get("/", getAllProducts);

router.get("/reports/low-stock", getLowStockProducts);
router.get("/reports/category-summary", getCategorySummary);

router.patch("/:id/stock", updateStock);


router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

