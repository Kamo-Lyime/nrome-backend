// orderSystem.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Order Schema
const OrderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true },
    patientName: String,
    medications: [{
        name: String,
        quantity: Number
    }],
    deliveryDate: Date,
    deliveryAddress: String,
    phoneNumber: String,
    email: String,
    status: {
        type: String,
        enum: ['pending', 'processing', 'dispatched', 'delivered'],
        default: 'pending'
    },
    tracking: {
        created: { type: Date, default: Date.now },
        processed: Date,
        dispatched: Date,
        delivered: Date
    }
});

const Order = mongoose.model('Order', OrderSchema);

// API Routes
router.post('/api/orders', async (req, res) => {
    try {
        const order = new Order({
            orderId: generateOrderId(),
            ...req.body
        });
        await order.save();
        
        // Send confirmation email
        await sendOrderConfirmation(order);
        
        res.status(201).json({ 
            success: true, 
            orderId: order.orderId 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Admin Routes
router.get('/api/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort('-tracking.created');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/api/admin/orders/:orderId/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            { 
                status,
                [`tracking.${status}`]: new Date()
            },
            { new: true }
        );
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Utility Functions
function generateOrderId() {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

async function sendOrderConfirmation(order) {
    // Implement email sending logic here
    console.log(`Order confirmation sent for order ${order.orderId}`);
}

module.exports = router;