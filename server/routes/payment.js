const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const Product = require("../collections/Product");
const Order = require("../collections/Order");

router.post("/create-checkout-session", async (req, res) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const { productId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: parseFloat(product.price) * 100,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?productId=${product._id}`,
      cancel_url: `${process.env.CLIENT_URL}/product/${product._id}`,
      metadata: {
        productId: product._id.toString(),
        userId: userId.toString(),
      },
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error", err);
    res.status(500).json({ error: "Payment failed" });
  }
});
router.post("/success", async (req, res) => {
  const { productId, userId } = req.body;
  console.log("object", productId)
  console.log("object..", userId)

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await Product.findByIdAndUpdate(productId, { status: "sold" });

    const order = new Order({ product, buyer: userId });
    await order.save();

    res.status(200).json({ message: "Order saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save order" });
  }
});

module.exports = router;