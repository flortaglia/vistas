const {CarritoDao,ProductoDao} = require ('../daos/index.js') 
const main = require('../nodemailer/mailAdmin.js')
const mainSms = require('../twilio/sms.js')
const mainWhatsapp = require('../twilio/whatsapp.js')



const postCarrito = async (req, res)=>{
    const elemento = await CarritoDao.newCart(username)
    res.json(elemento)
}

const verCarrito = async (req, res) => {
    const id = req.params.id
    const elemento = await CarritoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
    res.json(elemento)
}
const deleteCarrito = async (req, res) => {
    const id = req.params.id
    const elemento = await CarritoDao.getById(id)
    if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
    await CarritoDao.deleteById(id)
    res.json(await CarritoDao.getAll())
}
const listarCarritos =  async (req, res) => {
    const verCarritos = await CarritoDao.getAll()
    res.json(verCarritos)
}
const addProduct = async (req,res)=>{
    const cantidad= req.body.cant || 1
    const id_prod=req.params.id
    const username = req.user.username
    let carrito = await CarritoDao.cartByUsername(username)
    if(!carrito) { carrito= await CarritoDao.newCart(username)}
    const indice = carrito.productos.findIndex( (prod)=> prod._id.toString() === id_prod)
    console.log(indice)
    if(indice >= 0){

        carrito.productos[indice].cantidad += cantidad
    }else{
        let producto = await ProductoDao.getById(id_prod)
        const quantity = {cantidad : cantidad}
        
        console.log('producto cantidad',producto)
        carrito.productos.push({
            _id:producto._id,
            title:producto.title,
            price:producto.price,
            cantidad
        })
        
    }
    carrito = await CarritoDao.update(carrito._id,carrito.productos)

    res.redirect('/api/productos')
    //res.json(carrito)
}

const getUserCart = async (req, res)=>{ 
    const username = req.user.username
    let carrito = await CarritoDao.cartByUsername(username)
    if(!carrito){
        res.render('cart.hbs', false)
    }else{
        const productos = carrito.productos 
        res.render('cart.hbs',{productos})
    }
    
}


function sendOrderEmail(user, body){
    main(`Nuevo Pedido de ${user.name} - ${user.username}`, body)
    
}

const cartCheckout = async (req, res)=>{
    // console.log('req- metodo post-login',req.body)
    
    let user= req.user
    let carrito = await CarritoDao.cartByUsername(user.username)
    console.log('carrito._id',carrito._id)
    const productos = carrito.productos
    res.render('mail.hbs',{productos,layout: null}, (error, html) => {
        
        sendOrderEmail(req.user, html)
    })
    const message= carrito.productos.map(producto=>
        `PRODUCTO: ${producto.title} PRECIO UNIT.: ${producto.price} CANTIDAD: ${producto.cantidad}`  
    )
    console.log('username', )
    mainWhatsapp(`Nuevo Pedido de ${user.name} - ${user.username}: ${message.join()}`)
    
    const recibido = `El Pedido se encuentra en proceso. Gracias por su compra`
    mainSms(req.user.phone, recibido)
    await CarritoDao.deleteById(carrito._id)
    res.redirect('/')
}
const deleteProductFromCart = async (req,res)=>{
    
    const id_prod=req.params.id
        console.log('id_prod',id_prod);
    const username = req.user.username
        console.log('username',username);
    let carrito = await CarritoDao.cartByUsername(username)
    if(!carrito) { 
        console.log('carrito no existe') 
        return res.json()
    }
    carrito.productos = carrito.productos.filter((prod)=>prod._id.toString() !== id_prod)
    carrito = await CarritoDao.update(carrito._id,carrito.productos)
    
    res.redirect('/api/cart') 
}

module.exports = {
    postCarrito,
    verCarrito,
    deleteCarrito,
    listarCarritos,
    addProduct,
    getUserCart,
    deleteProductFromCart,
    cartCheckout

}