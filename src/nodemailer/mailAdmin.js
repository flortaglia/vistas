const { createTransport } = require ('nodemailer');

const TEST_MAIL = 'flortagliaferro@gmail.com'

async function main(){

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
    subject: `Nuevo Pedido de ${req.user.name} - ${req.user.username}`,
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
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

main()
