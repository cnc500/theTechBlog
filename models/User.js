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
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                            len:[8],
                    },
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [8],
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