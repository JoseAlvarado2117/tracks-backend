const handleHttpError = require("../utils/handleErrors");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require('../models')

const authMiddleware = async (req, res, next) => {
  try {
    
    if (!req.headers.authorization) {
      handleHttpError(res, 'No hay token', 401);
      return;
    }

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHttpError(res, 'Error no existe el Id en el token', 401)
      return 
    }

    const user = await usersModel.findById({ _id: dataToken._id})

    req.user = user;

    next()

  } catch (error) {
    handleHttpError(res, 'No tiene una sesion', 401)
  }
}


module.exports = authMiddleware;