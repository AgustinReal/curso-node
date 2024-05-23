// |----------------------------------Async en Paralelo----------------------------------------|
import { readFile } from 'node:fs/promises' // => para usar promesas

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('1er texto: ', text)
  console.log('2do texto: ', secondText)
})
