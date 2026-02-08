import sequelize from '../config/database.js';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const products = [
    {
        name: "Classic Aqua Small",
        category: "small",
        size: "Small Bottle",
        volume: "500ml",
        price: 20,
        unit: "bottle",
        useCase: "individual",
        returnable: false,
        description: "Perfect for on-the-go hydration. Fits easily in bags and cup holders.",
        image: "https://images.unsplash.com/photo-1616118132534-381148898bb8?auto=format&fit=crop&q=80&w=1000",
        minOrder: 24,
        inStock: true,
        badge: "Bestseller",
        tags: ["travel", "gym", "daily"]
    },
    {
        name: "Family Pack Dispenser",
        category: "large",
        size: "Large Can",
        volume: "20L",
        price: 90,
        unit: "can",
        useCase: "family",
        returnable: true,
        description: "Ideal for daily home consumption. Purity guaranteed with every drop.",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000",
        minOrder: 1,
        inStock: true,
        badge: "Eco-Friendly",
        tags: ["home", "sustainable", "family"]
    },
    {
        name: "Corporate Event Pack",
        category: "pocket",
        size: "Mini Bottle",
        volume: "250ml",
        price: 15,
        unit: "bottle",
        useCase: "event",
        returnable: false,
        description: "Small serving size perfect for corporate meetings and events.",
        image: "https://images.unsplash.com/photo-1602143407151-011141959309?auto=format&fit=crop&q=80&w=1000",
        minOrder: 50,
        inStock: true,
        tags: ["events", "meeting", "corporate"]
    },
    {
        name: "Office Water Cooler",
        category: "large",
        size: "Standard Can",
        volume: "20L",
        price: 85,
        unit: "can",
        useCase: "office",
        returnable: true,
        description: "Keep your workforce hydrated and productive. Regular refill service available.",
        image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=1000",
        minOrder: 5,
        inStock: true,
        badge: "Bulk Value",
        tags: ["office", "work", "bulk"]
    }
];

const seed = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync();

        console.log('Seeding products...');

        for (const p of products) {
            await Product.findOrCreate({
                where: { name: p.name },
                defaults: p
            });
        }

        console.log('Seeding admin user...');
        const adminEmail = 'admin@aquafarms.com';
        const adminPassword = 'admin123';
        const adminName = 'Admin User';

        // Check if admin exists
        const User = (await import('../models/User.js')).default;
        const [admin, created] = await User.findOrCreate({
            where: { email: adminEmail },
            defaults: {
                name: adminName,
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
                phone: '0000000000'
            }
        });

        if (created) {
            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }

        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
