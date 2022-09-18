//no x .env cargado en server
// import dotenv from "dotenv";
// import path from'path';

// const envFile = path.join(process.cwd(), '../../.env')
// console.log('envFile',envFile )
// dotenv.config({ path: envFile });
// console.log('database',process.env.DATABASE )

let ProductoDao;
let CarritoDao;
let UsuarioDao;
// console.log('database-Dao',process.env.DATABASE )

// switch (process.env.DATABASE || 'mongo') {
//   case "firebase":
//     const { default: ProductoDaoFirebase } = await import(
//       "./productos/productoDaoFirebase.js"
//     );
//     const { default: CarritoDaoFirebase } = await import(
//       "./carritos/carritoDaoFirebase.js"
//     );

//     ProductoDao = new ProductoDaoFirebase;
//     CarritoDao = new  CarritoDaoFirebase;

//     break;
//   case "mongo":

//////////NO ES REQUIRE?????????????????????????????????????????????
    const { ProductoDaoMongo } = require(
      "./productos/productoDaoMongo.js"
    );
    const {  CarritoDaoMongo } = require(
      "./carritos/carritoDaoMongo.js"
    );
    const { UsuarioDaoMongo } = require(
      "./usuarios/usuarioDaoMongo.js"
    );
    ProductoDao = new ProductoDaoMongo;
    CarritoDao = new CarritoDaoMongo;
    UsuarioDao = new UsuarioDaoMongo;
//     break;
// }

module.exports = { ProductoDao, CarritoDao, UsuarioDao };