const path = require("node:path")

// Como saber como es la separación de las rutas en nuestra pc (sistema operativo)
console.log(path.sep)

// Unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// Obtener el nombre del fichero
const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)

// Obtener el nombre del fichero sin la extension
const fileName = path.basename('/tmp/midu-secret-files/password.txt', '.txt')
console.log(fileName)

// Obtener la extensiom
const extensiom = path.extname('image.jpg') 
console.log(extensiom)