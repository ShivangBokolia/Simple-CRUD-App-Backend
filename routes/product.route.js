const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const productController = require("../controllers/product.controller.js");

// The entire function from async to the end is basically called a controller function, so we add them to the controllers folder.
router.get("/", productController.getProducts);

router.get("/:id", productController.getSingleProduct);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
