const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto')


// const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

const User= db.define('users', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  isVet: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",
    allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('salt')
      }
    }
  })
  
  module.exports = User
  
  User.prototype.correctPassword = function(candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt()) === this.password()
  }
  
  User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }
  
  User.encryptPassword = function(plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }
  
  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
    }
  }
  
  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)
  User.beforeBulkCreate(users => {
    users.forEach(setSaltAndPassword)
  }
)
