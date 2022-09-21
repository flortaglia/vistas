const { Router } =require( 'express');
const router= Router();
const { getProductos, postProductos, getProductoId, 
    putProduct,deleteProduct} = require('../controllers/productsController.js') 

const { postCarrito, deleteCarrito, 
    listarCarritos, verCarrito, addProduct,deleteProductFromCart,
    getUserCart, cartCheckout} = require('../controllers/cartController.js') 

//Rutas Productos
router.get('/productos', getProductos)

router.get('/productos/:id', getProductoId)
router.post('/productos', postProductos)
router.put('/productos/:id', putProduct)
router.delete('/productos/:id', deleteProduct )
// router.get('/productos', mostrarForm) 


//Rutas Carrito
router.post('/carrito', postCarrito) 
router.delete('/carrito/:id', deleteCarrito )
// router.get('/carrito', listarCarritos)
// router.get('/carrito/:id/productos', verCarrito)
router.get('/carrito/productos/:id', addProduct); //////
router.get('/carrito/deleteproducto/:id', deleteProductFromCart)
// router.delete('/carrito/deleteproducto', deleteProductFromCart) xq x ahora uso link

router.get('/cart', getUserCart)
router.get('/carrito/checkout', cartCheckout)

module.exports = router 