const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProductById);
router.delete("/:id", productController.deleteProductById);

// Route to get products listed by a specific user
router.get("/user/:userId", productController.getProductsByUser);

router.post("/:id/images", productController.addImageToProduct);
router.delete("/:id/images/:imageIndex", productController.removeImageFromProduct);

router.post("/:id/specifications", productController.addSpecificationToProduct);
router.put("/:id/specifications/:specificationId", productController.updateProductSpecification);
router.delete("/:id/specifications/:specificationId", productController.removeProductSpecification);

router.put("/:id/update-status", productController.updateProductStatus);

module.exports = router;