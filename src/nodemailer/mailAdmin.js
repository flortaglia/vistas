const { createTransport } = require ('nodemailer');

const TEST_MAIL = process.env.MAIL

module.exports = async function main(subject, html){

    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: "flortagliaferro@gmail.com",
            pass:process.env.PASS
            
        }
    });
   const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: subject,
    html: html,
    // attachments: [
    //     {
    //         path: new URL ("../public/img/carne-empa.webp",import.meta.url).pathname,
    //     }
    // ]
    };

    transporter.sendMail(mailOptions,(err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent: ' + info.response);
        }
})

}


