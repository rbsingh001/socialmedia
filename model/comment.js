const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Comment = sequelize.define('comment',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    des: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Comment;