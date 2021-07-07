const Product = require('../models/productModel') // var product kalau ini digant namanya yg bawahnya jg harus diganti
//ngasih nama bebbas2 aja, tp yg muadh dimengerti maksudnya

const { getPostData } = require('../utils')

// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(req, res) {
    //getProduct --> nama fungsinya
    //req, res ini adalahn parameter yg  diterima dari route. karena cmn ada 2, disini jg ada 2.
    //saat km nembak ke url GGET ygg pertama tadi, dari route akan menjalankan fungsi ini.
    //isi fungsinya :

    try {
        const products = await Product.findAll()
        // disini dia udah pake model untuk baca ke database nya. Product --> ini adalah nama variabel yang mengacu ke file model nya. model adalah perwakilan dari sebuah tabel di database
        // lokasi model ada di folder models
        // disini dia mangggil fungsi findAll di file model
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getProduct(req, res, id) {
    // nah ini contoh ada 3( req, res, id) karena ari route yg gjg ada 3
    try {
        const product = await Product.findById(id)
        console.log(id); // ini id yg dikirim, muncun di console nya , sekarang kita coba tambahkan ngecek dengan data yg di hardcode
        if (id == "2"){
            if(!product) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Product Not Found' }))
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(product))
            }    
        }else{
            res.writeHead(200, { 'Content-Type': 'test' })
            res.end("bukan 2")
        }
        
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Product
// @route   POST /api/products
async function createProduct(req, res) {
    try {
        const body = await getPostData(req)

        const { name, description, price } = JSON.parse(body)



        const product = {
            name,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            const body = await getPostData(req)

            const { name, description, price } = JSON.parse(body)

            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Product
// @route   DELETE /api/product/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}