const { readFile } = require('node:fs/promises'); // => para usar promesas

// |----------------------------------Async Secuencial----------------------------------------|
// IIFE - Inmediatly Invoked Function Expression (Expresión de función invocada inmediatamente)

(
  async () => {
    console.log('Leyendo el primer archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('1er texto: ', text)

    console.log('---> Hacer cosas mientras lee el archivo...')

    console.log('Leyendo el segundo archivo...')
    const secondText = await readFile('./archivo2.txt', 'utf-8')
    console.log('2do texto: ', secondText)
  }
)()

// Como es IIFE para entenderlo.
async function init () {
  console.log('Leyendo el primer archivo...')
  const text = await readFile('./archivo.txt', 'utf-8')
  console.log('1er texto: ', text)

  console.log('---> Hacer cosas mientras lee el archivo...')

  console.log('Leyendo el segundo archivo...')
  const secondText = await readFile('./archivo2.txt', 'utf-8')
  console.log('2do texto: ', secondText)
}
init()
