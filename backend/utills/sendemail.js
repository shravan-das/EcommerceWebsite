const nodeMailer = require("nodemailer");


const sendemail = async (options)=>{


const transporter = nodeMailer.createTransport({
    service:process.env.SMTP_SERVICE,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD,
    }
});


const mailoptions = {
    from:process.env.SMTP_MAIL,
    to:options.email,
    subject:options.subject,
    text:options.message,
};


await transporter.sendMail(mailoptions);

};


module.exports = sendemail;