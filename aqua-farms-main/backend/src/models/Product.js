import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    volume: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    },
    // Existing fields
    inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    // New fields required by frontend
    useCase: {
        type: DataTypes.STRING,
        defaultValue: 'individual',
    },
    returnable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    minOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    badge: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tags: {
        type: DataTypes.JSON,
        defaultValue: [],
        get() {
            const rawValue = this.getDataValue('tags');
            if (typeof rawValue === 'string') {
                try {
                    return JSON.parse(rawValue);
                } catch (e) {
                    return [];
                }
            }
            return rawValue || [];
        }
    },
});

export default Product;
