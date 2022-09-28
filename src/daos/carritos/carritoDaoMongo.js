const {ContenedorMongo} = require("../conexMongo/contenedorMongo.js") ;
// const { ProductoDaoMongo } = require("../productos/productoDaoMongo.js");
const mongoose = require("mongoose") ;
// Schema=mongoose.Schema;

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos",new mongoose.Schema( {
      username: { type: String, require: true, max: 200, unique:true},
      timestamp: { type: String, required: true },
      productos: {type: Array, required: true }, 
       // type: Array, ref: 'productos' },
   
     }))
  }

  async newCart(username){
    const doc = new this.collection({username:username, timestamp:Date.now(), productos:[]})
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