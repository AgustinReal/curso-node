const fs = require('node:fs/promises')
const path = require('node:path')
const picocolor = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.log(picocolor.red(`No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // status - información del archivo
    } catch {
      console.log(`No se pudo leer el archivo ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleDateString()

    // ${fileType} => MUESTRA F SI ES UNARCHIVO O D SI ES UN DIRECTORIO
    // ${file.padEnd(20)} => NOMBRE DEL ARCHIVO
    // ${fileSize.toString().padStart(10)} => TAMAÑO DEL ARCHIVO
    // ${fileModified} => FECHA DE ULTIMA MODIFICACIÓN
    return `${fileType} ${picocolor.blue(file.padEnd(20))} ${picocolor.green(fileSize.toString().padStart(10))} ${picocolor.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
