const express = require('express');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const { validatorLogin, validatorRegister } = require('../validators/auth');
const router = express.Router();


// TODO: http://localhost:4005/api/auth   =>  GET, POST, DELETE, PUT


router.post('/register', validatorRegister, registerCtrl )

router.post('/login', validatorLogin, loginCtrl)


module.exports = router;