import express from 'express';
import { Order, OrderItem } from '../models/Order.js';
import Product from '../models/Product.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create Order (User)
router.post('/', verifyToken, async (req, res) => {
    try {
        const { items, totalAmount, deliveryDate, deliverySlot, shippingAddressId } = req.body;

        // Create Order
        const order = await Order.create({
            userId: req.user.id,
            totalAmount,
            deliveryDate,
            deliverySlot,
            shippingAddressId,
            status: 'placed'
        });

        // Create Order Items
        const orderItems = items.map(item => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        await OrderItem.bulkCreate(orderItems);

        res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order' });
    }
});

// Get My Orders (User)
router.get('/my-orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [
                { model: OrderItem, include: [Product] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Get All Orders (Admin)
router.get('/all', verifyToken, isAdmin, async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: OrderItem, include: [Product] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Update Order Status (Admin)
router.patch('/:id/status', verifyToken, isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status' });
    }
});

export default router;
