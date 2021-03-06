const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

module.exports = db.define('message', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  defaultScope: {
    include: [
      { model: User
       }
    ]
  }
});
