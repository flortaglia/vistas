require('dotenv').config()
const express = require('express')
const path = require( 'path') 
const cookieParser = require( "cookie-parser");
const {configChat} = require ('./socket/chat.js')
const passport = require( 'passport');
const yargs = require('yargs/yargs')(process.argv.slice(2)) //libreria YARGS
const initPassport = require( './passport/init.js');
//IMPORTO ROUTERS  CL28
const routes = require( "./routes/index.js");
const rutas = require( "./routes/api.js");
const configSession = require( "./session/configSession.js");
const { engine } = require('express-handlebars')
const app = express()
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Handlebars = require('handlebars')

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
//PUERTO CON YARGS  CL28
const args = yargs
        .alias({p:'puerto'})
        .default({puerto:8080})
        .argv


app.use(configSession);
//Inicializo PASSPORT
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);
app.use("/", routes);
app.use('/api', rutas);
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

const expressServer = app.listen(args.puerto, (err) => {
    if(err) {
        console.log(`Se produjo un error al iniciar el servidor: ${err}`)
    } else {
        console.log(`Servidor escuchando puerto: ${args.puerto}`)
    }
})
configChat(expressServer)

