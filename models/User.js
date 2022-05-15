const { Model, DataTypes } = require('sequelize');
// Still require use of connection.js file
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
	    {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                username: { 
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                            len:[2],
                    },
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [8,20],
                    },
                },
        },
        {
                sequelize,
                timestamps: false,
                freezeTableName: true,
                underscored: true,
                modelName: 'user',
        }
);

module.exports = User;