import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SiteSettings = sequelize.define('SiteSettings', {
    key: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true
});

export default SiteSettings;
