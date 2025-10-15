const nodemailer = require('nodemailer');

const sendMail = async(options)=>{

    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    //console.log(transporter);

    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;