'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

// gsa 15/10/2018
// De acuerdo a https://stackoverflow.com/questions/42661252/mongoose-mpromise-mongooses-default-promise-library-is-deprecated
// hay que colocar lo siguiente ANTES del connect para evitar el error:
// (node:22687) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your
// own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise
// gsa 14/10/2018 usé createConnection en lugar de connect para que desaparezca el error que daba con el
// código original: 
// (node:17036) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` 
// instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. 
// See http://mongoosejs.com/docs/4.x/docs/connections.html#use-mongo-client
// mongoose.createConnection(config.db, (err, res) => {
// pero con createConnection no funciona el post por ejemplo de un nuevo user (colocando el global.Promise
// de arriba, asi que para que funcione tuve que volver a colocar connect y nuevamente aparece el warning 
// de deprecación arriba mencionado.
mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')

  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})
