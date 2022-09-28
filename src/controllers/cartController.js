const main = require('../nodemailer/mailAdmin.js')
const {addProductService, getUserCartService,cartCheckoutService,
    deleteProductFromCartService } = require ('../service/cart.service.js')

const addProduct = async (req,res)=>{
    const cantidad= req.body.cant || 1
    const id_prod=req.params.id
    const username = req.user.username
    addProductService(cantidad,id_prod,username)
    res.redirect('/api/productos')
    //res.json(carrito)
}
const getUserCart = async (req, res)=>{ 
    const username = req.user.username
    let carrito = await getUserCartService(username)
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
    let user= req.user
    let productos = await cartCheckoutService(user)
    res.render('mail.hbs',{productos,layout: null}, (error, html) => {
        
        sendOrderEmail(req.user, html)
    })
    res.redirect('/')
}
const deleteProductFromCart = async (req,res)=>{  
    const id_prod=req.params.id
        console.log('id_prod',id_prod);
    const username = req.user.username
        console.log('username',username);
    await   deleteProductFromCartService(id_prod,username)
    res.redirect('/api/cart') 
}
module.exports = {
    addProduct,
    getUserCart,
    deleteProductFromCart,
    cartCheckout

}
// const postCarrito = async (req, res)=>{
//     const elemento = await CarritoDao.newCart(username)
//     res.json(elemento)
// }
// const verCarrito = async (req, res) => {
//     const id = req.params.id
//     const elemento = await CarritoDao.getById(id)
//     if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
//     res.json(elemento)
// }
// const deleteCarrito = async (req, res) => {
//     const id = req.params.id
//     const elemento = await CarritoDao.getById(id)
//     if(!elemento){return res.status(404).json({error: "Carrito no encontrado"})}
//     await CarritoDao.deleteById(id)
//     res.json(await CarritoDao.getAll())
// }
// const listarCarritos =  async (req, res) => {
//     const verCarritos = await CarritoDao.getAll()
//     res.json(verCarritos)
// }
