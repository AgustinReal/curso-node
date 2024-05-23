// |----------------------------------Async Con CALLBACK----------------------------------------|
const fs = require('node:fs')

console.log('Leyendo el primer archivo...')
// La función callback se ejecuta cuando el evento termina.
// Callback función que se ejecuta cuando se completa una tarea asincrona.
fs.readFile('./archivo.txt', 'utf-8', (err, text) => { // <--- ejecutas este callback
  console.log('1er texto: ', text)
})

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')

fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log('2do texto: ', text)
})
