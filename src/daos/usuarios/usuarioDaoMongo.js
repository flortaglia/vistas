const {ContenedorMongo} = require("../../contenedores/contenedorMongo.js") ;
const mongoose = require("mongoose") ;

class UsuarioDaoMongo extends ContenedorMongo {
  constructor() {
    super("usuarios", new mongoose.Schema({
      username: { type: String, require: true, max: 200, unique:true},
      password: { type: String, require: true, max: 200 },
      nombre:{ type: String, require: true},
      direccion:{ type: String, require: true},
      edad:{ type: Number, require: true},
      telefono:{ type: String, require: true },
      avatar:{ type: String, require: true}
    })
    )
  }

  async newUser(username, password, nombre, direccion, edad, telefono,avatar){
    const doc = new this.collection({username, password, nombre, direccion, edad, telefono,avatar})
    await doc.save()   
    console.log(this.collection)        
  }

  async update(id, username, password, nombre, direccion, edad, telefono,avatar){
    await this.collection.updateOne({_id:id}, {username, password, nombre, direccion, edad, telefono,avatar})
    console.log(this.collection)        
  }

  async getByUsername(username){
    const doc = await this.collection.findOne({ username: username});
    return doc;
  }

}
module.exports= {UsuarioDaoMongo} ;