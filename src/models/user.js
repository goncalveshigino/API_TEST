'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O Nome deve ser informado'
        }
      }
    },
    description: DataTypes.STRING,
    pic: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O Email deve ser informado',
        }
      },
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A Password deve ser informado'
        }
      }
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
  });
  return User;
};