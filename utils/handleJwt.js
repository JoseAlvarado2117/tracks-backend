const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


// TODO: Debes pasar un objecto con los datos del usuario
const tokenSign = async (user) => {
  const sign = jsonwebtoken.sign(
    {
      _id: user._id,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );

  return sign;
}


// TODO: Debes pasar el token de sesión, el JWT
const verifyToken = async (tokenJwt) => {
  try {
    return jsonwebtoken.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
}


module.exports = {
  tokenSign,
  verifyToken
}