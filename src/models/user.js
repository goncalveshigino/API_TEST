'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'ksjdhgdw9er73739r8iewkd08wdysdghsdgcusdoff457687i623749o';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // define association here
    }


    static async search(query) {
      


      const limit = query.limit ? parseInt(query.limit) : 20
      const offset = query.offset ? parseInt(query.offset) : 0

      let where = {}

      if (query.name) where.name = {
        [Op.like]: `%${query.name}%`
      }
      if (query.email) where.email = q.query.email
        
      const entities = await User.findAndCountAll({
        where: where,
        limit: limit,
        offset: offset,
      })
      
      return { entities: entities.rows, meta: {
          count: entities.count,
          limit: limit,
          offset: offset,
      }
    };
  
    }

    static async get(id) {
      return await User.findByPk(id, {})
    }

    static async verifyLogin(email, password) {
      
      try {
        let user = await User.findOne({
          where: {
            email: email
          },
        })

        if (!user) {
          throw new Error('Email não encontrado.');
        }

        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error('Senha nao confere.')
        }

        let token = jwt.sign({
          id: user.id
        }, SECRET, {
          expiresIn: '5h'
        })

        return {
          user: user.toJSON(),
          token: token
        }
        
      } catch (error) {
        throw error;
      }

    }

    // transform() {
    //   return {
    //     id: this.id,
    //     name: this.name,
    //     description: this.description,
    //     pic: this.pic,
    //     email: this.email
    //   }
    // }
    
    toJSON() {
      const values = Object.assign({}, this.get());
      delete values.password;
      return values;
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
      isEmail: {
        msg: "Não é um email válido"
      }
      
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
    underscored: false,
    modelName: 'User',
    hooks: {
      beforeSave: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }
  });
  return User;
};