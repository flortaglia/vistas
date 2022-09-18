const {ContenedorMongo} = require("../../contenedores/contenedorMongo.js") ;
const {ProductoDao} = require ('../daos/index.js') 
const mongoose = require("mongoose") ;

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos",new mongoose.Schema( {
      username: { type: String, require: true, max: 200, unique:true},
      timestamp: { type: String, required: true },
      productos: [{_id:String,price:Number,title:String,cantidad:Number}],
    //   type: Array, required: true },
     }))
  }

  async newCart(username){
    const doc = new this.collection({username:username, timestamp:Date.now(), products:[]})
    await doc.save() 
    return doc      
  }
  async cartByUsername(username){
    const doc = await this.collection.findOne({ username: username});
    return doc;
  }
  // async addProductToCart(id,id_product, quantity=1){

  // }
  async update(id,productos){
    await this.collection.updateOne({_id:id}, {productos})   
    const elemento = await this.getById(id)  
    return elemento
  }
}

module.exports = {CarritoDaoMongo};