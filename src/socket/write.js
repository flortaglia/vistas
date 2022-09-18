const fs = require( 'fs')
const path = require( 'path') 

async function escribir(messagesNormalizar){
    try{
        await fs.promises.writeFile(path.join(__dirname,'/chat'), JSON.stringify(messagesNormalizar))
        console.log('guardado',path.join(__dirname,'/chat'))
    }catch(err){
        console.log('no se pudo guardar el chat', err)
    }

}
module.exports = {escribir}