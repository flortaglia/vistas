const { Router } =require( 'express');
const router= Router();
const passport = require ('passport') 
const { getHome, getHomeAdmin, getLogin, getUserInfo,
       postLogin, getFailLogin, getSignup, postSignup, 
       getFailSignup, getLogout} = require('../controllers/usersController.js')
const upload = require ('../multer/loadFile.js')

//INICIO PASSPORT

// module.exports = function(passport){
  //cl28
  function authMiddleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/login");
    }
  }
  //INDEX
  router.get ('/', authMiddleware, getHome)
  //HOME ADMIN
  router.get('/home',authMiddleware, getHomeAdmin)
  ////////          LOGIN         ////////
  router.get('/login', getLogin)
  router.get('/info', getUserInfo)
  router.post('/login',passport.authenticate('login',
    {failureRedirect: '/fail-login',failureMessage: true}),
    postLogin
  )
  router.get('/fail-login', getFailLogin)
  ///////           SIGNUP            ///////////////////
  router.get('/signup',getSignup)
  router.post('/signup',upload.single('image'),passport.authenticate('signup',
    { failureRedirect: '/fail-signup',failureMessage: true}),
    postSignup
  )
  router.get('/fail-signup',getFailSignup)
  router.get('/logout', getLogout )

  module.exports = router 
  // router.post('/signup', upload.single('image'),
  //   (req, res)=>{
  //     // console.log('req- metodo post-login',req.body)
  //     const file=req.file
  //     if(!file){console.log('Please upload file')}
    
  //     console.log('Ok upload file')
  //   }
  // )

  // const {faker}  =require( "@faker-js/faker");
// faker.locale='es'
// module.export = router.get ('/api/productos-test', (req,res)=>{
    
//     const response = [];

//     for (let i = 0; i < 5; i++) {
//       response.push({
//         title: faker.commerce.product(),
//         price: faker.commerce.price(),
//         thumbnail: faker.image.imageUrl(),
//       });
//     }
//     // console.log(response)
//     res.json(response);
// })


