const {ProductoDao} = require ('../daos/index.js') 

const getProductosService = async () => {
    const verProductos = await ProductoDao.getAll()
    return  verProductos
}

module.exports = {
    getProductosService
}