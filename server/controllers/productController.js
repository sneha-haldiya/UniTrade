const Product = require("../collections/Product");

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Fetch products listed by the user
    const products = await Product.find({ "uploadedBy._id": userId });

    // Return the products in the response
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Add an image to a product
exports.addImageToProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.images.push(req.body.imageUrl);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove an image from a product
exports.removeImageFromProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.images.splice(req.params.imageIndex, 1);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a specification to a product
exports.addSpecificationToProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.specifications.push(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a specification of a product
exports.updateProductSpecification = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const specification = product.specifications.id(req.params.specificationId);
    if (!specification) {
      return res.status(404).json({ message: "Specification not found" });
    }
    specification.key = req.body.key;
    specification.value = req.body.value;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a specification from a product
exports.removeProductSpecification = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const specification = product.specifications.id(req.params.specificationId);
    if (!specification) {
      return res.status(404).json({ message: "Specification not found" });
    }
    product.specifications.pull(specification);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProductStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the status of the product
    product.status = status;

    // Save the updated product
    await product.save();

    res.json(product);
  } catch (error) {
    console.error("Error updating product status: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};