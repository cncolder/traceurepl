let one = 1

let [ one, ...other ] = [ 1, 2, 3, 4 ]
one
other

let fun = a => a * a
fun(3)

import path from 'path'
path.sep

console.time('promise')
new Promise( resolve => setTimeout( () => resolve(), 1000)).then( () => console.timeEnd('promise'))

let asyncFunc = async () => await new Promise( (resolve, reject) => setTimeout( () => resolve(), 1000))
