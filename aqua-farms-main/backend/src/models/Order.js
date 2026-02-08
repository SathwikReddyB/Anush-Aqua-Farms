import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';
import Address from './Address.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('placed', 'packed', 'out-for-delivery', 'delivered', 'cancelled'),
        defaultValue: 'placed',
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    deliveryDate: {
        type: DataTypes.DATEONLY,
    },
    deliverySlot: {
        type: DataTypes.STRING,
    },
    shippingAddressId: {
        type: DataTypes.UUID,
        references: {
            model: Address,
            key: 'id'
        }
    }
});

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.UUID,
        references: {
            model: Order,
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Order.belongsTo(Address, { as: 'shippingAddress', foreignKey: 'shippingAddressId' });

export { Order, OrderItem };
