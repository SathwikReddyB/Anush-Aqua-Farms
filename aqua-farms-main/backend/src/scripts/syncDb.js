import sequelize from '../config/database.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Address from '../models/Address.js';
import { Order, OrderItem } from '../models/Order.js';

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await sequelize.sync({ alter: true }); // Use alter to update tables without dropping
        console.log('Database synced successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1);
    }
};

syncDatabase();
