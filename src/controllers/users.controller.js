

const User = require('../models').User
const Sequelize = require('sequelize')
const Op = Sequelize.op


class UsersController {

    async index(req, res, next) {
      
        try {
            const limit  = req.query.limit   ? parseInt(req.query.limit) : 20;
            const offset = req.query.offset ? parseInt(req.query.offset) : 0;

            let where = {}

            if (req.query.name) where.name = {
                [Op.like]: `%${req.query.name}%`
            }
            if (req.query.email) where.email = q.query.email
            
            const entities = await USer.findAndCounrAll({
                where: where,
                limit: limit,
                offset: offset,
            })


            return res.status(200).json({
                status: "SUCCESS",
                data: entities,
                meta: {
                    limit: limit,
                    offset: offset,
                }
            })

        } catch (error) {

            return res.status(500).json({
                status: "ERROR",
                msg: 'Nao foi possivel listar entidades de Usuarios'
            })
            
        }
    }
    

    async show(req, res, next) {

        try {

            const entity = await User.findByPk(req.params.id);
            return res.status(200).json({
                status: "SUCCESS",
                data: entity
            })
            
        } catch (error) {

            return res.status(500).json({
                status: "ERROR",
            msg: 'Nao foi possivel recuperar os dados da entidade de Usuario pelo ID'
            })
            
        }
       
    }

   async store(req, res, next) {


        try {

            const entity = await User.create(req.body);
            return res.status(200).json({
                status: "SUCCESS",
                msg: `Nova intidade incluida com sucesso em Usuarios`,
                data: entity
            })
            
        } catch (error) {

            if (error.name && error.name.includes('SequelizeValidation')) {
            return res.status(404).json({
                status: "Invalid",
                msg: 'Dados Invalidos',
                error: error.errors.map(err => {
                    
                    return {
                        msg: err.msg,
                        field: err.path,
                        value: err.value
                    }

                })
             })
                
            }

        }
   }
    
    
   async update(req, res, next) {

       try {

           const entityOld = await User.findByPk(req.params.id);
           const entityNew = await entityOld.update(req.body)
            return res.status(200).json({
                status: "SUCCESS",
                msg: `Intidade atualizada com sucesso em Usuarios`,
                data: entity
            })
            
        } catch (error) {

            if (error.name && error.name.includes('SequelizeValidation')) {
            return res.status(404).json({
                status: "Invalid",
                msg: 'Dados Invalidos',
                error: error.errors.map(err => {
                    
                    return {
                        msg: err.msg,
                        field: err.path,
                        value: err.value
                    }

                })
            })
            }

           return res.status(500).json({
                status: "ERROR",
                msg: `Erro ao atualizar entidade em Usuarios`
             })
           
            
        }

    }
    

  async  remove(req, res, next) {

        try {

            const entity = await User.findByPk(req.params.id);
            if (!entity) {

                return res.status(404).json({
                status: "INVALID",
                msg: `Dados Invalidos`
             })
                
            }
            return res.status(204).json({
                status: "SUCCESS",
                msg: `Entidade excluida com sucesso em usuarios`
            })
            
        } catch (error) {

            return res.status(500).json({
                status: "ERROR",
            msg: 'Nao foi possivel recuperar os dados da entidade de Usuario pelo ID'
            })
            
        }

     }
    
}

module.exports = new UsersController;