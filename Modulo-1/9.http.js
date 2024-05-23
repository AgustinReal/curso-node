const http = require('node:http') // para el protocolo HTTP
const { findAvailablePort } = require('./10.free-port')

const desiredPort = process.env.PORT ?? 3000

// Un servidor puede hacer 2 cosas, recibir una petición o devolver una respuesta.
// req => lo que recibimos.
// res => nuestra respuesta.
const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})
findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
