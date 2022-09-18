const {CarritoDao,ProductoDao} = require ('../daos/index.js') 

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
    const cantidad= req.body.cant
    const id_prod=req.body._id
    // const username = req.user.username
    const username = 'Pepe@mail.com'
    let carrito = await CarritoDao.cartByUsername(username)
    if(!carrito) { carrito= await CarritoDao.newCart(username)}
    const indice = carrito.productos.findIndex( (prod)=> prod._id === id_prod)
    console.log(indice)
    if(indice >= 0){

        carrito.productos[indice].cantidad += cantidad
    }else{
        const producto = await ProductoDao.getById(id_prod)
        
        carrito.productos.push({
            _id: producto._id.toString(),
            title:producto.title,
            price:producto.price,
            cantidad
        })
        
    }
    carrito = await CarritoDao.update(carrito._id.toString(),carrito.productos)
    res.json(carrito)
}
const getUserCart = async (req, res)=>{ 
     // const username = req.user.username
     const username = 'Pepe@mail.com'
     let carrito = await CarritoDao.cartByUsername(username)
     const productos = carrito.productos
    res.render('cart.hbs',{productos})
}
const deleteProductFromCart = async (req,res)=>{
    const id_prod=req.body._id
    console.log('id_prod');
    // const username = req.user.username
    const username = 'Pepe@mail.com';
    console.log('username',username);
    let carrito = await CarritoDao.cartByUsername(username)
   console.log('carrito delete',carrito)
    if(!carrito) { 
        console.log('carrito no existe') 
        return res.json()
    }
    carrito.productos = carrito.productos.filter((prod)=>prod._id !== id_prod)
    console.log('carrito YA delete',carrito)
    carrito = await CarritoDao.update(carrito._id.toString(),carrito.productos)
    res.json(carrito)
}

module.exports = {
    postCarrito,
    verCarrito,
    deleteCarrito,
    listarCarritos,
    addProduct,
    getUserCart,
    deleteProductFromCart

}