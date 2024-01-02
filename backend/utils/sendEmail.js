const nodeMailer = require("nodemailer");

const sendEmail = async (options)=>{
      const transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth:{
            user:process.env.SMPT_EMAIL,
            pass:process.env.SMPT_PASSWORD,
        }
      })
    //   console.log(transporter);
      const mailOptions = {
        from:process.env.SMPT_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
      }
    //   console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    // console.log(info);
}

module.exports = sendEmail;
