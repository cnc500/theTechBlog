const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
                hooks: {
                    beforeCreate: async (newUserData) => {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                    },
                },
          
                sequelize,
                timestamps: false,
                freezeTableName: true,
                underscored: true,
                modelName: 'user',
        }
);

module.exports = User;