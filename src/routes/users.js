var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/users.controller')

//LOGIN 
router.post('/login', UsersController.bindMethod('login'));


//INDEX 
router.get('/', UsersController.bindMethod('index'));

//SHOW
router.get('/:id', UsersController.bindMethod('show'));
 
// STORE
router.post('/', UsersController.bindMethod('store'));

// //UPDATE
router.patch('/:id', UsersController.bindMethod('update'));
 
// //REMOVE
router.delete('/:id', UsersController.bindMethod('remove'));


module.exports = router;
