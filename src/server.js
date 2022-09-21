require('dotenv').config()
const express = require('express')
const path = require( 'path') 
const bodyParser = require('body-parser');
const cookieParser = require( "cookie-parser");
const {configChat} = require ('./socket/chat.js')
const logger = require('./utils/logger.js')
const passport = require( 'passport');
const yargs = require('yargs/yargs')(process.argv.slice(2)) //libreria YARGS
const initPassport = require( './passport/init.js');
//IMPORTO ROUTERS  CL28
const routes = require( "./routes/index.js");
const rutas = require( "./routes/api.js");
const configSession = require( "./session/configSession.js");
const { engine } = require('express-handlebars')
const app = express()
const compression = require ("compression")
app.use(compression())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Handlebars = require('handlebars')

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

//CLUSTER Y OS
const cluster = require("cluster");
const os = require("os");
const cpus= os.cpus() //creo workers
//PUERTO CON YARGS  CL30
const args = yargs
        .alias({p:'puerto', m: 'modo'})
        .default({puerto:8080, modo:'fork'}) //variable modo agregada cluster  o fork (x default)
        .argv
console.log('args.modo', args.modo)
app.use(configSession);
//Inicializo PASSPORT
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

//IF CLUSTER OR FORK?
let expressServer = null

if (args.modo =="cluster" && cluster.isPrimary) {
  console.log("MODO CLUSTER")
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);

    cluster.fork();
  });
} else {

  console.log("MODO FORK")
  app.use("/", routes);
  app.use('/api', rutas);
  
 
  expressServer = app.listen(process.env.PORT || 8080, (err) => {
      if(err) {
          console.log(`Se produjo un error al iniciar el servidor: ${err}`)
      } else {
          console.log(`Servidor escuchando puerto: ${process.env.PORT ||8080}`)
      }
  })
 
}
app.use(express.static(__dirname + '/public'))
app.engine('hbs', 
    engine({
        extname: '.hbs',
        defaultLayout: path.join(__dirname, '/public/views/layout/main.hbs'),
        // layoutsDir: path.join(__dirname, '/public/views/layouts'),
        // partialsDir: path.join(__dirname, '/public/views/partials')
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
)
  
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './public/views'))
configChat(expressServer)

app.use((req,res,next)=>{
  const { url, method } = req;
  logger.warn(`Método ${method} URL ${url} inexistente`);
  
} )