const nodemailer = require("nodemailer");
require("dotenv").config();
const ENV = require("../config/Env.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

const sendEmail = async (user, verifieToken) => {
  try {
    const verificationLink = `http://localhost:5173/verify/${verifieToken}`;

    await transporter.sendMail({
      from: `"Cookilicious" <${ENV.EMAIL_USER}>`,
      to: user.email,
      subject: "Bienvenue chez Cookilicious !",
      html: `
      
        <div style="font-family: "Playfair Display" serif;
        text-align: center; padding: 40px; background-color: #fdf6e3;">
          
        <div style="font-family: Playfair Display; text-align: center; padding: 40px; background-color: #fdf6e3;">
          <h1 style="color: #73090b;font-size: 20ypx;">Bienvenue chez Cookilicious ${
            user.prenom }</h1>
          <p style="color: #5a1304; font-size: 16px;">
            Prêt pour rejoindre notre univers 100% Gourmand? Cliquez sur le bouton ci-dessous pour activer votre compte :
          </p>
          <a href="${verificationLink}" style="
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #73090b;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          ">
            Activer mon compte
          </a>
          <p style="margin-top: 30px; color: #5a1304; font-size: 12px;">
            Ce lien d'activation expire dans 1 heure.
          </p>
        </div>
  
        </div>
      `,
    });

    console.log(" Email envoyé à :", user.email);
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    throw error;
  }
};

module.exports = sendEmail;
