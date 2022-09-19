const mongoose =require("mongoose") ;
const dbConfig = require('../config.js');

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log('Conexion establecida con la DBMongo')

class ContenedorMongo {
  constructor(nameCollection, schema) {

    this.collection = mongoose.model(nameCollection, schema);
  }

  async deleteById(id){
    await this.collection.deleteOne({_id:id});
  }
  async getById(id)  {
    const doc = await this.collection.findOne({ _id: id }, { __V: 0 });
    return doc;
  }
  async getAll(){
    const doc = await this.collection.find({ });
    return doc;
  }

}
module.exports = { ContenedorMongo }