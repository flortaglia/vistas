const twilio = require ('twilio')

const accountSid = process.env.SID 
const authToken = process.env.TOKEN
const TEST_CEL = process.env.CEL


const client = twilio(accountSid, authToken)

module.exports = async function mainWhatsapp(body) {
   await client.messages.create({
      body: body,
      from: 'whatsapp:+14155238886',
      to: TEST_CEL
    },(err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log('whatsapp sent: ', info);
        }
    })
}
