let products = require('../data/products') // manggil ke sini, yang ternyata isinya adalah sebuah file json
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {//disini pake nya return, return itu artinya mengembalikan nilai ke yang gmanggil, yaitu si controller, yg dikembalikan addalah resolve(product)
        resolve(products) // ini resolvve udah bawaan library js nya. km gak perlu buka. yg penting km tau fungsinya resolve itu untuk menampilkan data
        //resolve product berarti menampilkan data isinya product yang hasil dari manggil di baris ke 1
    })
}

function findById(id) { //fungsi yg glain km bisa pelajari senddiri maksudnya, dari nama fungsi nya aja udah ketauan. klo findbbyId bearti mencari data denggan id tertentu
    //km pernah pake query mysql kan, itu sama kayak WHERE id=... gitu

    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/products.json', products);
        }
        resolve(newProduct)
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {id, ...product}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/products.json', products);
        }
        resolve(products[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/products.json', products);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}