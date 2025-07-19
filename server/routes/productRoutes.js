const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProductById);
router.delete("/:id", productController.deleteProductById);

//specfications
router.post("/:id/specifications", productController.createSpecification);
router.put("/:productId/specifications/:specificationId", productController.updateSpecification);
router.delete("/:productId/specifications/:specificationId", productController.deleteSpecification);

module.exports = router;
