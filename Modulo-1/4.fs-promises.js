// Esto sólo en los módulos nativos que no tienen promesas nativas
// const {promisify} = require('node:util') => Para usar promesas
// const readFilePromise = promisify(fs.readFile)

// fs.readFilePromise('./archivo.txt', 'utf-8')
// .then(text =>{
//    console.log("1er texto: ", text)
// })

const fs = require('node:fs/promises') // => para usar promesas

console.log('Leyendo el primer archivo...')

fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('1er texto: ', text)
  })

console.log('---> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('2do texto: ', text)
  })
