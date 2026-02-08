import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all settings
router.get('/', async (req, res) => {
    try {
        const settings = await SiteSettings.findAll();
        // Convert to key-value object for easier frontend consumption
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        res.json(settingsMap);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings' });
    }
});

// Bulk update settings (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const updates = req.body; // Expecting { key: value, key2: value2 }

        const promises = Object.entries(updates).map(([key, value]) => {
            return SiteSettings.upsert({
                key,
                value: String(value)
            });
        });

        await Promise.all(promises);

        // Return updated settings
        const settings = await SiteSettings.findAll();
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        res.json(settingsMap);
    } catch (error) {
        console.error('Settings update error:', error);
        res.status(500).json({ message: 'Error updating settings' });
    }
});

// Initialize default settings if needed
export const initializeDefaultSettings = async () => {
    const defaults = {
        'site_name': 'Aqua Farms',
        'contact_email': 'support@aquafarms.com',
        'contact_phone': '+91 98765 43210',
        'address_street': '123 Aqua Street',
        'address_city': 'Water City',
        'address_state': 'Delhi',
        'address_pincode': '110001',
        'social_facebook': 'https://facebook.com/aquafarms',
        'social_instagram': 'https://instagram.com/aquafarms',
        'social_twitter': 'https://twitter.com/aquafarms',
        'about_subtitle': 'Bringing pure, safe drinking water to every home and office.',
        'about_mission': 'To deliver the highest quality mineral water to homes, offices, and institutions, ensuring health and hydration for all.',
        'about_vision': 'To be the most trusted water supplier in the region, known for quality and reliability.',
        'about_team': JSON.stringify([])
    };

    try {
        const count = await SiteSettings.count();
        if (count === 0) {
            const promises = Object.entries(defaults).map(([key, value]) => {
                return SiteSettings.create({ key, value });
            });
            await Promise.all(promises);
            console.log('Default site settings initialized');
        }
    } catch (error) {
        console.error('Error initializing default settings:', error);
    }
};

export default router;
