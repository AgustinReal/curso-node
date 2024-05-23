const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()

// Se recomienda desactivarlo por seguridad de tus datos.
// desactivar
app.disable('x-powered-by')

// Middleware es una función que se ejecuta entre req y el res (Petición y respuesta).
app.use((res, req, next) => {
  console.log('Mi primer maddleware')
  // Trackear la request a la base de datos
  // Revisar si el usuario tiene cookies
  next()
})

// Realizado en clase.
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // Solo llegan request que son POST y que tienen el header Content-Type: application/json
//   let body = ''

//   // Escuchar el evento data
//   // Concatena todos los datos encriptados
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   // Fin del evento data
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // Mutar la request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })

// Middleware para analizar JSON
app.use(express.json())

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en base de datos.
  console.log(req.body)
  res.status(201).json(req.body)
})

// La última a la que va a llegar y si pones cualquier url va entra a esta y puede ser cualquier tipo de metodo (POST, GET, DELETE, ETC).
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${PORT}`)
})
