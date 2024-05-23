// .js => por defecto utiliza ComminJS
// .mjs => para utilizar ES Modules
// .cjs => para utilizar CommonJs

import { sum, res, multi } from "./sum.mjs";

console.log(sum(2, 3))

console.log(res(2, 3))

console.log(multi(2, 2))