// Importar modulos nativos de Node
// modulo "os" nos muestra info de nuestro sistema operativo.
// ctrl + . ==> convertir
import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os'

console.log('Información del sistema operativo: ')
console.log('-----------------------')

console.log('Nombre del sistema operativo', platform())
console.log('Versión del sistema operativo', release())
console.log('Arquitectura del sistema operativo', arch())
console.log('CPUs', cpus()) // <----- Vamos a poder escalar procesos en Node
console.log('Memoria libre', freemem() / 1024 / 1024)
console.log('Memoria total', totalmem() / 1024 / 1024)
console.log('uptime', uptime() / 60 / 60) // <------ Tiempo de encendido de la pc
