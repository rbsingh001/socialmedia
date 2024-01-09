const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Post = sequelize.define('post',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    des: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Post;