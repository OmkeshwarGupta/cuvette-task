const nodemailer = require('nodemailer');

require('dotenv').config();

const mailSender = async (companyEmail, title, body) => {

    console.log(companyEmail, title, body);

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: "Cuvette Tech",
            to: `${companyEmail}`,
            subject: `${title}`,
            html: `${body}`
        });
        console.log(info);

        return info;
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = mailSender;