const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const TAX_RATE = 0.05; // Tax rate as 5%
const DISCOUNT_PERCENTAGE = 10; // Discount for members as 10%
const LOYALTY_RATE = 2; // Loyalty points multiplier

const PORT = 3000;

// Endpoint 1: Calculate the total price of items in the cart
app.get("/cart-total", (req, res) => {
    const newItemPrice = parseFloat(req.query.newItemPrice);
    const cartTotal = parseFloat(req.query.cartTotal);
    const totalCartValue = cartTotal + newItemPrice;
    res.send(totalCartValue.toString());
});

// Endpoint 2: Apply a discount based on membership status
app.get("/membership-discount", (req, res) => {
    const isMember = req.query.isMember === "true";
    const cartTotal = parseFloat(req.query.cartTotal);
    const discountedPrice = isMember 
        ? cartTotal * (1 - DISCOUNT_PERCENTAGE / 100) 
        : cartTotal;
    res.send(discountedPrice.toFixed(2));
});

// Endpoint 3: Calculate tax on the cart total
app.get("/calculate-tax", (req, res) => {
    const cartTotal = parseFloat(req.query.cartTotal);
    const tax = cartTotal * TAX_RATE;
    res.send(tax.toFixed(2));
});

// Endpoint 4: Estimate delivery time based on shipping method
app.get("/estimate-delivery", (req, res) => {
    const shippingMethod = req.query.shippingMethod.toLowerCase();
    const distance = parseFloat(req.query.distance);
    let deliveryDays;

    if (shippingMethod === "standard") {
        deliveryDays = Math.ceil(distance / 50);
    } else if (shippingMethod === "express") {
        deliveryDays = Math.ceil(distance / 100);
    } else {
        return res.status(400).send("Invalid shipping method");
    }

    res.send(deliveryDays.toString());
});

// Endpoint 5: Calculate the shipping cost based on weight and distance
app.get("/shipping-cost", (req, res) => {
    const weight = parseFloat(req.query.weight);
    const distance = parseFloat(req.query.distance);
    const shippingCost = weight * distance * 0.1;
    res.send(shippingCost.toFixed(2));
});

// Endpoint 6: Calculate loyalty points earned from a purchase
app.get("/loyalty-points", (req, res) => {
    const purchaseAmount = parseFloat(req.query.purchaseAmount);
    const loyaltyPoints = purchaseAmount * LOYALTY_RATE;
    res.send(loyaltyPoints.toString());
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
