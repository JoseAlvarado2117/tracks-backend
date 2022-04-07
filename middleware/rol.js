const handleHttpError = require("../utils/handleErrors");


const checkRol = (roles) => (req, res, next) => {

  try {
    const { user } = req;
    const rolesByUser = user.role;

    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))  // TODO: deveuelve true o false

    if (!checkValueRol) {
      handleHttpError(res, 'No tiene el rol necesario', 403)
      return ;
    }

    next()
    
  } catch (error) {
    handleHttpError(res, 'No tiene el rol necesario', 403)
  }
}


module.exports = checkRol;