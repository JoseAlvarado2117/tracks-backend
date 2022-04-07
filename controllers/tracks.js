 const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');
const handleHttpError = require('../utils/handleErrors');



// ! Obtener lista de la base de datos
const getItems = async (req, res) => {
  
  try {
    const user = req.user;
    
    const data = await tracksModel.find({})
    res.json({ data, user })
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'Error en get items')
  }

}

// ! Obtener un detalle
const getItem = async (req, res) => {

  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findById(id);

    res.send({ data })

  } catch (error) {
    handleHttpError(res, 'Error en get Item')
  }

}

// ! Insertar un registro
const createItem = async (req, res) => {
  
  try {
    const body = matchedData(req)
    const data = await tracksModel.create(body);
    res.json( { data })
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'Error creando items')
  }

}

// ! Actualizar un registro
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(
      id,
      body,
      { new: true}
    );
    res.json( { data })
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'Error update items')
  }
}


// ! Eliminar un registro
const deleteItem = async (req, res) => {

  try {
    req = matchedData(req);
    const {id} =  req;
    await tracksModel.findOneAndDelete({ _id: id })
    res.send({ message: 'Delete'})
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'Error delete items')
  }
}




module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
}