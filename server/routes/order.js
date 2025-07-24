const express = require("express");
const router = express.Router();
const Order = require("../collections/Order");

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.userId });
    if (!orders) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
