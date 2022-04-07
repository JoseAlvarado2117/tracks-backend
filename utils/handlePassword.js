const bcryptjs = require("bcryptjs")


const encrypt = async (text) => {
  const hash = await bcryptjs.hash(text, 10);
  return hash;
}


// TODO: Pasamos el texto sin encryptar
const compare = async ( textPlain, hash ) => {
  return await bcryptjs.compare(textPlain, hash)
}


module.exports = {
  encrypt,
  compare
}