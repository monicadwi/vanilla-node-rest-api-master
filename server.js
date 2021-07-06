const http = require('http')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET') { // ini GET
        //ini artinya route dengan endpoint /api/product/ pakai method GET. klo mau nembak pake postman
        //http://192.168.43.30:3000 --> ini disebut base url (biasanya udah fix, gak berubah)    /api/products --> endpoint (bisa banyak contoh endpoint y lain ada dibaris2 bawah)
        getProducts(req, res)
        //getProducts --> ini artinya mangggil sebuah fungsi bernama getProuct ada parameter (req, res), req artinya request, res artinya response
        //req itu berisi data yg km kirim dari postman. ada 3 tempat km bisa taro : 1. di header, 2. di body 3. query parameter.
        // kalo di body itu ada 3 lokasi --> 1. form-data 2. www-x-urlencoded 3. raw
        // yg ke 3 itu naro nya i query parameter, formatnya : url/endpoint?key1=value1&key2=value2...
        //  getProducts(req, res) ==> res --> data yg km kirim akan ditangkap oleh res ini, kita coba yg POST + kirim data
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') { // ini GET
        //ini artinya route dengan endpoint /api/product/id, /\W+ itu kebaca sebagai id pakai method GET. klo mau nembak pake postman
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if(req.url === '/api/products' && req.method === 'POST') {
         //ini artinya route dengan endpoint /api/product/ pakai method POST. klo mau nembak pake postman, baris bwahnya mirip2 beda method nya aja.
         // kalau pake browser cmn bisa method GET, kalau PUT/POST/DELETE harus pake postman
          // klo post itu karena biasa dipake buat insert/ save data. dia ada data yg dibawa, sebelumn kesana aku jelasin ini dulu
        console.log(res); //console.log ini buat debugging di js. biar bisa keliatan di command prompt
        createProduct(req, res)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
        // ini keyboar mac sm windows beda, jd salah pencet

        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

const PORT =  process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;
