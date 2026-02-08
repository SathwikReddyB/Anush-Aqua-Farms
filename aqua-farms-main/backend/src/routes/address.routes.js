import express from 'express';
import Address from '../models/Address.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all addresses for the user
router.get('/', verifyToken, async (req, res) => {
    try {
        const addresses = await Address.findAll({
            where: { userId: req.user.id },
            order: [['isDefault', 'DESC'], ['createdAt', 'DESC']]
        });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses' });
    }
});

// Add a new address
router.post('/', verifyToken, async (req, res) => {
    try {
        const { label, street, city, state, pincode, phone, isDefault, fullName } = req.body;

        // If this is set as default, unset other defaults
        if (isDefault) {
            await Address.update(
                { isDefault: false },
                { where: { userId: req.user.id } }
            );
        }

        const address = await Address.create({
            userId: req.user.id,
            label,
            fullName,
            street,
            city,
            state,
            pincode,
            phone,
            isDefault: isDefault || false,
        });

        res.status(201).json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding address' });
    }
});

// Update an address
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { label, fullName, street, city, state, pincode, phone, isDefault } = req.body;
        const address = await Address.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        if (isDefault) {
            await Address.update(
                { isDefault: false },
                { where: { userId: req.user.id } }
            );
        }

        await address.update({
            label,
            fullName,
            street,
            city,
            state,
            pincode,
            phone,
            isDefault
        });

        res.json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error updating address' });
    }
});

// Delete an address
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const result = await Address.destroy({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!result) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.json({ message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address' });
    }
});

export default router;
