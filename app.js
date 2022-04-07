require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectionDB = require('./config/mongo');

const app = express();

connectionDB()

app.use(cors())

app.use(express.json({ extended: true }));

app.use(express.static('storage'))

// * Aqui invocamos las rutas
// TODO: localhost:4005/api/

app.use('/api', require('./routes'))

const port = process.env.PORT || 4001

app.listen(port, () => {
  console.log(`Tu app esta lista por http://localhost:${port}`)
})