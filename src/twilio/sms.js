const twilio = require ('twilio')

const accountSid = process.env.SID 
const authToken = process.env.TOKEN

const client = twilio(accountSid, authToken)

module.exports = async function mainSms(to,body) {
   await client.messages.create({
      body: body,
      from: '+16186020225',
      to: `+${to}`
    },(err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log('sms sent: ', info);
        }
    })
}

