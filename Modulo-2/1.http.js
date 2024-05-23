const http = require('node:http') // para el protocolo HTTP
const fs = require('node:fs')
const path = require('node:path')

const desiredPort = process.env.PORT ?? 12340

// req => lo que recibimos.
// res => nuestra respuesta.
const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200 // Ok
    res.setHeader('Content-Type', 'text/html; charset=utf-8') // contenido va ser del tipo texto plano y charset (codificación de los caracteres) es para que te deje escribir con acentos en Español.
    res.end('<h1>Bienvenido a mi página de inicio</h1>') // terminamos la respuesta.
  } else if (req.url === '/imagen-estadio-boca.png') {
    const filePath = path.join(__dirname, 'image.png') // Construye una ruta de archivo absoluta al archivo : 'boss.png'

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // ok
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 400 // Not Found
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Error 404</h1>')
  }
}

// Un servidor puede hacer 2 cosas, recibir una petición o devolver una respuesta.
const server = http.createServer(processRequest)

// El servidor escucha el puerto "desiredPort == 1234".
server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
