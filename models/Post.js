const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
    {
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        body: DataTypes.STRING
    },
    {
        sequelize
    }
);

module.exports = Post;