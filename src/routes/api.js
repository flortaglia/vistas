const { Router } =require( 'express');
const router= Router();
const { getProductos} = require('../controllers/productsController.js') 

const {addProduct,deleteProductFromCart,
    getUserCart, cartCheckout} = require('../controllers/cartController.js') 

//Rutas Productos
router.get('/productos', getProductos)
//Rutas Carrito
router.get('/carrito/productos/:id', addProduct); 
router.get('/carrito/deleteproducto/:id', deleteProductFromCart)
router.get('/cart', getUserCart)
router.get('/carrito/checkout', cartCheckout)

module.exports = router 

// router.get('/productos/:id', getProductoId)
// router.post('/productos', postProductos)
// router.put('/productos/:id', putProduct)
// router.delete('/productos/:id', deleteProduct )
// router.get('/productos', mostrarForm) 



// router.post('/carrito', postCarrito) 
// router.delete('/carrito/:id', deleteCarrito )
// router.get('/carrito', listarCarritos)
// router.get('/carrito/:id/productos', verCarrito)
// router.delete('/carrito/deleteproducto', deleteProductFromCart) xq x ahora uso link



