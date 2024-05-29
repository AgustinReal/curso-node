const express = require('express') // require => commonJS
const crypto = require('node:crypto') // Para crear ID unicos
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()

app.use(express.json()) // Middleware para usar json

app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

// Métodos normales: GET/HEAD/POST
// Métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS => cuando es complejo

// Puertos aceptados
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://movies.com'
]

// Todos los recursos que sean MOVIES se indentifica con /MOVIES
// Recupera todas las peliculas
app.get('/movies', (req, res) => {
  const origin = req.header('origin') // Se recupera el origin de la petición

  // Arreglar CORS
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin) // Si origin esta en los puertos aceptados, no habra error en el CORS.
  }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(genreAux => genreAux.toLowerCase() === genre.toLocaleLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Recupera una pelicula por id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json({ movie })
  res.status(404).json({ message: 'Movie not found' })
})

// Crear una pelicula
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // Tambien podriamos usar el 422 Unprocessable Entity en el status porque los datos pasados en Petición son incorrectos.
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // En base de datos
  const newMovie = {
    id: crypto.randomUUID(), // Crea un uuid de versión 4
    ...result.data
  }

  // Esto no es REST, porque estamos guardando el estado de la aplicación en memoria.
  movies.push(newMovie)

  res.status(201).json(newMovie) // actualizar la caché del cliente
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin') // Se recupera el origin de la petición

  // Arreglar CORS
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin) // Si origin esta en los puertos aceptados, no habra error en el CORS.
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body) // Valido lo que pasaron Petición (req)

  if (!result.success) {
    // Si hay error en la validación de la petición
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params // recupero el ID a modificar ingresado en la petición (req)
  const movieIndex = movies.findIndex(movie => movie.id === id) // verifico que exista ese Id ingresado en la petición (req)

  if (movieIndex < 0) {
    return res.status(404).json({ message: 'Movie not found' }) // Si no existe ese id.
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  return res.json(updateMovie)
})

// Métodos complejos
app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin') // Se recupera el origin de la petición

  // Arreglar CORS
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin) // Si origin esta en los puertos aceptados, no habra error en el CORS.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }

  res.send(200)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${PORT}`)
})
