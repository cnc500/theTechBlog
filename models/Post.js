const { Model, DataTypes } = require('sequelize');
// Still require use of connection.js file
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
	    {
                id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        allowNull: false,
                        autoIncrement: true,
                },
                title: { 
                        type: DataTypes.TEXT,
                        allowNull: false,
                },
                content: {
                        type: DataTypes.TEXT,
                        allowNull: false,
                },
                user_id: {
                        type: DataTypes.INTEGER,
                        references: {
                                model: 'user',
                                key: 'id',
                        },

                    
                },
        },
        {
                sequelize,
                timestamps: false,
                freezeTableName: true,
                underscored: true,
                modelName: 'post',
        }
);

module.exports = Post;