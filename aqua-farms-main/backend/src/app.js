import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import userRoutes from './routes/user.routes.js';
import addressRoutes from './routes/address.routes.js';
import siteSettingsRoutes, { initializeDefaultSettings } from './routes/site-settings.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/settings', siteSettingsRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

app.get('/api/health', (req, res) => {
    res.send('Aqua Farms Backend API is running');
});

// For any other route, serve the frontend index.html (SPA)
app.get(/(.*)/, (req, res) => {
    if (req.path.startsWith('/auth') || req.path.startsWith('/products') || req.path.startsWith('/orders')) {
        // Assume API 404
        return res.status(404).json({ message: 'API route not found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
});

import mysql from 'mysql2/promise';

// Sync Database and Start Server
const PORT = process.env.PORT || 5000;

const createDbIfNotExists = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        await connection.end();
        console.log(`Database '${process.env.DB_NAME}' checked/created successfully.`);
    } catch (error) {
        console.error('Error creating database:', error);
        // We continue anyway, in case it was a permission error but DB exists
    }
};

const startServer = async () => {
    try {
        await createDbIfNotExists();
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync({ alter: true });
        console.log('Database models synced.');
        await initializeDefaultSettings();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();

export default app;
