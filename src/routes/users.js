var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/users.controller')

//INDEX 
router.get('/', UsersController.index.bind(UsersController));

//SHOW
router.get('/:id', UsersController.show.bind(UsersController));
 
// STORE
router.post('/', UsersController.store.bind(UsersController));

// //UPDATE
router.patch('/:id', UsersController.update.bind(UsersController));
 
// //REMOVE
router.delete('/:id', UsersController.remove.bind(UsersController));


module.exports = router;
