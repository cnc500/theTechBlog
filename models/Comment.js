const { Model, DataTypes } = require('sequelize');
// Still require use of connection.js file
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
	    {
                id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        allowNull: false,
                        autoIncrement: true,
                },
                comment: { 
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
                post_id: {
                        type: DataTypes.INTEGER,
                        references: {
                                model: 'post',
                                key: 'id',
                        },
                },
        },
        {
                sequelize,
                freezeTableName: true,
                underscored: true,
                modelName: 'comment',
        }
);

module.exports = Comment;