const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks');
const customHeader = require('../middleware/customHeader');
const checkRol = require('../middleware/rol');
const authMiddleware = require('../middleware/session');
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const router = express.Router();


// TODO: http://localhost:4005/tracks   =>  GET, POST, DELETE, PUT

router.get('/',  authMiddleware, getItems)

router.post('/', authMiddleware, checkRol(["admin"]),  validatorCreateItem, createItem)

router.get('/:id', authMiddleware, validatorGetItem, getItem)

router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem)

router.delete('/:id', authMiddleware, validatorGetItem, deleteItem)

module.exports = router;