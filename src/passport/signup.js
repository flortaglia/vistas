const LocalStrategy   = require('passport-local').Strategy;
const User =require( '../models/user.js');
const bCrypt  =require( 'bcrypt');

// Estrategia de registro/suscripción....REGISTER
module.exports = function (passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true 
        },
        async (req, username, password, done)=> {
            try {
                // find a user in Mongo with provided username
                // llamar a UserDao. getByUsername
                const existingUser = await User.findOne({ 'username' :  username } )
                if (existingUser) {
                    return done("User already exists", false);
                }
        
                const newUser = {
                    username:username,
                    password: hashPassword(password),
                    name : req.body.name,
                    address : req.body.address,
                    age : req.body.age,
                    phone: req.body.phone,
                    avatar: req.file.originalname                    
                };
                const createdUser = await User.create(newUser);
                return done(null, createdUser);
            } catch (err) {
                console.log(err);
                done(err);
            }
        
        })
            
     );
            
    // Encriptar Password (cifrado) usando bCrypt
    function hashPassword(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }  

}