const {CarritoDao,ProductoDao} = require ('../daos/index.js') 
const mainSms = require('../twilio/sms.js')
const mainWhatsapp = require('../twilio/whatsapp.js')

const addProductService = async (cantidad,id_prod,username)=>{
   
    let carrito = await CarritoDao.cartByUsername(username)
    if(!carrito) { carrito= await CarritoDao.newCart(username)}
    const indice = carrito.productos.findIndex( (prod)=> prod._id.toString() === id_prod)
    console.log(indice)
    if(indice >= 0){

        carrito.productos[indice].cantidad += cantidad
    }else{
        console.log('id_prod else',id_prod)
        let producto = await ProductoDao.getById(id_prod)
                
        console.log('producto',producto)
        carrito.productos.push({
            _id:producto._id,
            title:producto.title,
            price:producto.price,
            cantidad
        })
        
    }
    carrito = await CarritoDao.update(carrito._id,carrito.productos)
    
}

const getUserCartService = async (username)=>{ 
    let carrito = await CarritoDao.cartByUsername(username)
    return carrito  
}

const cartCheckoutService = async (user)=>{
    let carrito = await CarritoDao.cartByUsername(user.username)
    const productos = carrito.productos
    const message= carrito.productos.map(producto=>
        `PRODUCTO: ${producto.title} PRECIO UNIT.: ${producto.price} CANTIDAD: ${producto.cantidad}`  
    )
    mainWhatsapp(`Nuevo Pedido de ${user.name} - ${user.username}: ${message.join()}`)
    const recibido = `El Pedido se encuentra en proceso. Gracias por su compra`
    mainSms(user.phone, recibido)
    await CarritoDao.deleteById(carrito._id)
    return productos
}
const deleteProductFromCartService = async (id_prod,username)=>{
    let carrito = await CarritoDao.cartByUsername(username)
    if(!carrito) { 
        throw 'carrito no existe' 
    }
    carrito.productos = carrito.productos.filter((prod)=>prod._id.toString() !== id_prod)
    carrito = await CarritoDao.update(carrito._id,carrito.productos)
}

module.exports = {
    addProductService,
    getUserCartService,
    deleteProductFromCartService,
    cartCheckoutService

}