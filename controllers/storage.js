require('dotenv').config()
const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const handleHttpError = require('../utils/handleErrors');


 const PUBLIC_URL = process.env.PUBLIC_URL;
 const MEDIA_PATH = `${__dirname}/../storage`


// ! Obtener lista de la base de datos
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({})
    res.json({ data })
  } catch (error) {
    console.log(error);
  }
}

// ! Obtener un detalle
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req)

    console.log(id, matchedData(req))
    const data = await storageModel.findById(id)
    console.log({ data })
    res.send({ data })

  } catch (error) {
    console.log(error)
    handleHttpError(res, 'Error obteniendo detalle del item')
  }

}

// ! Insertar un registro
const createItem = async (req, res) => {

  const {body, file} = req;

  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`
  }

  try {

    const data = await storageModel.create(fileData);

    res.json({ data })

  } catch (error) {
    console.log(error);
    handleHttpError(res, 'Error creando un item')
  }
}

// ! Actualizar un registro
const updateItem = async (req, res) => {


}


// ! Eliminar un registro
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const dataFile = await storageModel.findOneAndRemove({ _id: id })

    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`
    fs.unlinkSync(filePath)

    const data = {
      filePath,
      deleted : 1
    }
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'Error eliminando el item')
  }
}




module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
}