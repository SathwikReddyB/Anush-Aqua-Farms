import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Address = sequelize.define('Address', {
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
    label: {
        type: DataTypes.STRING, // e.g., 'Home', 'Office'
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    street: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

export default Address;
