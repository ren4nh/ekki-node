const nodemailer = require("nodemailer");

module.exports = {
  sendEmail(to, content) {
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3464b269e002f8",
        pass: "5dd3771c3bc1fe"
      }
    });
    let mailOptions = {
      from: '"Ekki" <auto@ekki.com>',
      to: to,
      subject: "Esqueci minha senha",
      text: content
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  }
};
