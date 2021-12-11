
const successResponse = require('../responses/success.response')
const errorResponse = require('../responses/error.response')
const invalidResponse = require('../responses/invalid.response')


class ResourceController {

    constructor() {
        this.model = null;
    }
    
    setModel(model) {
        this.model = model;
    }

    bindMethod(method) {
        return this[method].bind(this)
    }

    async index(req, res, next) {
       
        try {
             
             const { entities, meta } = await this.model.search( req.query )

            return successResponse(res, 200, null, entities, meta)
        
        } catch (error) {

            console.log(error);
            return errorResponse(res, 500, `Não foi possível listar entidades de ${this.model.getTableName()}`, error);
        }
    }
    

    async show(req, res, next) {

        try {

            const entity = await this.model.get(req.params.id);

            return successResponse(res, 200, null, entity)
          
        } catch (error) {

            return errorResponse(res, 500, `Não foi possível recuperar os dados da entidade de ${this.model.getTableName()} pelo ID`, error);
        }
       
    }

   async store(req, res, next) {

        try {

            const entity = await this.model.create(req.body);

            return successResponse(res, 200, `Nova intidade incluida com sucesso em ${this.model.getTableName()}`, entity)
          
        } catch (error) {

            if (error.name && error.name.includes('SequelizeValidation')) {

                return invalidResponse(res, 400, `Dados informados não sºao válidos`, error);      
            }

        }
   }
    
    
   async update(req, res, next) {

       try {

           const entityOld = await this.model.get(req.params.id);
           const entityNew = await entityOld.update(req.body)

           return successResponse(res, 200, `Intidade atualizada com sucesso em ${this.model.getTableName()}`, entityNew)
          
        } catch (error) {

           if (error.name && error.name.includes('SequelizeValidation')) {
                
               return invalidResponse(res, 400, `Dados informados não sao válidos`, error)
         
            }

           return errorResponse(res, 500, `Erro ao atualizar entidade em ${this.model.getTableName()}`)
           
        }

    }
    

  async  remove(req, res, next) {

        try {

            const entity = await this.model.get(req.params.id);
            if (!entity) {

                return invalidResponse(res, 404, `Dados informados não encontrado pelo ID`)
            
                
            }

            entity.destroy();

            return successResponse(res, 204, `Entidade excluida com sucesso em ${this.model.getTableName()}`)
            
        } catch (error) {

            return errorResponse(res, 500, `Nao foi possivel recuperar os dados da entidade de ${this.model.getTableName()} pelo ID`)
            
        }

     }
    
}

module.exports =  ResourceController;