// |----------------------------------Async----------------------------------------|
import { readFile } from 'node:fs/promises' // => para usar promesas

console.log('Leyendo el primer archivo...')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('1er texto: ', text)

console.log('---> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
const secondText = await readFile('./archivo2.txt', 'utf-8')
console.log('2do texto: ', secondText)
