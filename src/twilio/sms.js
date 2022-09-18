const twilio = require ('twilio')

const accountSid = process.env.SID 
const authToken = process.env.TOKEN

const client = twilio(accountSid, authToken)

async function main() {
   await client.messages.create({
      body: 'Hola soy un SMS desde Node.js!',
      from: '+16186020225',
      to: '+5491165885070'
    },(err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent: ', info);
        }
    })
}
main()
