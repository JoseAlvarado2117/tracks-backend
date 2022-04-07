
const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === 'josealvarado') {
      next()
    } else {
      res.status(403).send({ error: 'apiKey no conecta'})
    }
    
  } catch (error) {
    res.status(403).send({ error: 'Algo ocurrio enj el custom headers'})
  }
}


module.exports = customHeader;