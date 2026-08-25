const express = require("express");
const router = express.Router();

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Mock payment - replace with real Stripe integration
    const paymentIntent = {
      id: "pi_mock_" + Date.now(),
      client_secret: "pi_mock_secret_" + Date.now(),
      amount,
      currency: currency || "usd",
      status: "succeeded",
    };

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/confirm", async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    // Mock confirmation
    res.json({
      success: true,
      message: "Payment confirmed successfully",
      paymentIntentId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
