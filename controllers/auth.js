const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const handleHttpError = require("../utils/handleErrors");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");


// TODO: Controlador encargado de registrar un nuevo usuario
const registerCtrl = async (req, res) => {

  try {    
    req = matchedData(req)
  
    const passwordHash = await encrypt(req.password)
    const body = {...req, password: passwordHash}
  
    const dataUser = await usersModel.create(body);
    dataUser.set('password', undefined, { strict: false });
  
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser
    }
  
    res.send( { data })
  } catch (error) {
    handleHttpError(res, 'Error al tratar de crear al usuario')
  }

}


// TODO: Este controlador es encargado de logear al usuario
const loginCtrl = async (req, res) => {
  try {

    req = matchedData(req)
    const { email, password } = req;

    const user = await usersModel.findOne({ email }).select('password name role email')

    if (!user) {
      handleHttpError(res, 'Usuario no encontrado', 404)
      return ;
    }

    const hashPassword = user.get('password');
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, 'Password Invalido', 401)
    }

    user.set('password', undefined, { strict: false })
    const data = {
      token: await tokenSign(user),
      user
    }

    res.send( { data })
    
  } catch (error) {
    handleHttpError(res, 'Error al logear al usuario')
  }
}


module.exports = { registerCtrl, loginCtrl }