const { ProductoDaoMongo } = require("./productos/productoDaoMongo.js");
const {  CarritoDaoMongo } = require("./carritos/carritoDaoMongo.js");
const { UsuarioDaoMongo } = require("./usuarios/usuarioDaoMongo.js");
let ProductoDao;
let CarritoDao;
let UsuarioDao;
ProductoDao = new ProductoDaoMongo;
CarritoDao = new CarritoDaoMongo;
UsuarioDao = new UsuarioDaoMongo;

module.exports = { ProductoDao, CarritoDao, UsuarioDao };

