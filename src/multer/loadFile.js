const multer = require ("multer")
const path = require( 'path');

//GUARDAR FILE
let fileStorageEngine = multer.diskStorage({
  destination: (req, file,cb)=>{
    cb(null, path.join(__dirname, "../public/image"))
  },
  filename:(req, file ,cb)=>{
    cb(null,file.originalname)
  }
})
let upload = multer({storage:fileStorageEngine})

// module.export = router.post('/single', upload.single('image'),
// (req, res)=>{
//   // console.log('req- metodo post-login',req.body)
//   const file=req.file
//   if(!file){console.log('Please upload file')}
 
//   res.send('Ok upload file')
// }
// )

module.exports = upload