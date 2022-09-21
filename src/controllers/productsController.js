const {ProductoDao} = require ('../daos/index.js') 

const getProductos = async (req, res) => {
    const verProductos = await ProductoDao.getAll()
    // const {username, name, address, age, phone, avatar} = req.user
    // console.log('verProductos', verProductos)
    // res.json(verProductos)
    res.render('productos.hbs',{verProductos})
}

const postProductos = async (req, res) => {
    const {title, description, code, price, thumbnail, stock} = req.body 
    const elemento = await ProductoDao.newProduct(title, description, code, price, thumbnail, stock)
    console.log('elemento',elemento)
    res.json(elemento)
}
const getProductoId = async (req, res) => {
    const id = req.params.id
    console.log('id', id)
    const elemento = await ProductoDao.getById(id)
    console.log('elemento', elemento)
    if(!elemento){return res.status(404).json({error: "Producto no encontrado"})}
    res.json(elemento)
}
const putProduct = async (req, res) => {
    const {title, description, code, price, thumbnail, stock} = req.body
    const id = req.params.id
    const elemento = await ProductoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Producto no encontrado"})}
    const elementChanged = await ProductoDao.update(id,title, description, code, price, thumbnail, stock)
    res.json(elementChanged)
    
}
const deleteProduct = async (req, res) => {
    const id = req.params.id
    if(!id){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    await ProductoDao.deleteById(id)
    res.json(await ProductoDao.getAll())
}

module.exports = {
    getProductos,
    postProductos,
    getProductoId,
    putProduct,
    deleteProduct

}