
const User = require('../models').User
const ResourceController = require('./resource.contoller')
const successResponse = require('../responses/success.response')
const errorResponse = require('../responses/error.response')



class UsersController extends ResourceController{

    constructor() {
        super()
        this.setModel(User)
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await User.verifyLogin(email, password)
             console.log(req.boy, email, password)
            successResponse(res, 200, 'Usuário autenticado com sucess', result);
        } catch (error) {
            console.log(error);
            errorResponse(res, 500, 'Não foi possível autenticar.');
        }
    }

}

module.exports = new UsersController;