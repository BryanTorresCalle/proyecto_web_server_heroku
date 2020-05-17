const nodemailer = require("nodemailer");

class ServicioCorreo {
  constructor() {}

  async enviarCorreo(plantilla, destinatario, asunto) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "recursosudem@gmail.com", // generated gmail user
          pass: "proyectodeaula00", // generated gmail account password
        },
    });


    var mailOptions = {
        from: "U de M",
        to: destinatario,
        subject: asunto,
        html: plantilla,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Correo electrónico enviado");
      });

  }
}

module.exports = ServicioCorreo;
