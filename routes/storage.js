
const express = require('express');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/storage');
const router = express.Router();

const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');


// TODO: http://localhost:4005/api/storage

router.get('/', getItems)

router.post('/', uploadMiddleware.single('myfile'), createItem)

router.get('/:id', validatorGetItem, getItem)

router.put('/:id', validatorGetItem, updateItem)

router.delete('/:id', validatorGetItem, deleteItem)


module.exports = router;