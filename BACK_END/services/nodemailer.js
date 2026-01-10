const nodemailer = require("nodemailer");
require("dotenv").config();

const ENV = require("../config/Env.js");

console.log("VÉRIFICATION SMTP :", ENV.EMAIL_USER);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

const sendEmail = async (user, verifieToken) => {
  try {
    const backgroundImage =
      "https://img.freepik.com/photos-gratuite/texture-creme-glacee-vanille_23-2149450747.jpg?semt=ais_hybrid&w=740&q=80";
    const verificationLink = `http://localhost:5173/verify/${verifieToken}`;

    await transporter.sendMail({
      from: `"Cookilicious" <${ENV.EMAIL_USER}>`,
      to: user.email,
      subject: "Bienvenue dans l'univers Cookilicious",
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Delight&display=swap');
            
            @font-face {
              font-family: 'Kaftus';
              src: local('Impact'), local('Arial Black');
              font-weight: 900;
            }
          </style>
        </head>
        <body>
          <div style="
            background-image: url('${backgroundImage}');
            background-size: cover;
            background-color: #fefaef;
            padding: 60px 20px;
            font-family: 'Delight', 'Georgia', serif;
            text-align: center;
          ">
            <!-- Container principal avec ombre premium -->
            <div style="
              max-width: 650px;
              margin: 0 auto;
              background: linear-gradient(180deg, #73090b 0%, #6f2b06 100%);
              overflow: hidden;
              box-shadow: 0 30px 80px rgba(115, 9, 11, 0.5);
            ">
              
              <!-- Bordure dorée supérieure -->
              <div style="height: 4px; background: linear-gradient(90deg, transparent, rgb(222, 146, 23), transparent);"></div>
              
              <!-- Header avec titre énorme -->
              <div style="padding: 80px 50px 60px; text-align: center;">
                <h2 style="
                  margin: 0;
                  color: #fefaef;
                  font-size: 75px;
                  font-weight: 900;
                  letter-spacing: 18px;
                  line-height: 0.9;
                  text-transform: uppercase;
                  text-shadow: 4px 4px 15px rgba(0, 0, 0, 0.4);
                  font-family: 'Kaftus', 'Impact', 'Arial Black', sans-serif;
                ">
                  COOKILICIOUS
                </h2>
                <div style="width: 100px; height: 2px; background: rgb(222, 146, 23); margin: 35px auto 20px;"></div>
                <p style="margin: 0; color: rgba(222, 146, 23, 0.95); font-size: 13px; letter-spacing: 5px; text-transform: uppercase; font-weight: 400;">
                  L'Excellence Gourmande
                </p>
              </div>
              
              <!-- Section crème avec message -->
              <div style="padding: 60px 50px; background-color: #fefaef; text-align: center;">
                
                <p style="margin: 0 0 15px 0; color: rgb(222, 146, 23); font-size: 12px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600;">
                  Bienvenue
                </p>
                
                <h2 style="margin: 0 0 35px 0; color: #73090b; font-size: 42px; line-height: 1.2; font-weight: 700; letter-spacing: 2px;">
                  ${user.username || "Cher Gourmand"}
                </h2>
                
                <p style="margin: 0 0 30px 0; color: #5a1304; font-size: 16px; line-height: 1.8; letter-spacing: 0.5px; max-width: 450px; margin-left: auto; margin-right: auto;">
                  Vous venez de rejoindre une communauté d'amateurs de <strong style="color: #73090b;">créations artisanales d'exception</strong>.
                </p>
                
                <p style="margin: 0 0 45px 0; color: #6f2b06; font-size: 15px; line-height: 1.7; letter-spacing: 0.5px; max-width: 450px; margin-left: auto; margin-right: auto;">
                  Chaque cookie, chaque brookie est pensé pour éveiller vos sens.
                </p>
                
                <!-- Bouton premium avec bordure -->
                <div style="margin: 0 auto; display: inline-block; border: 3px solid #73090b;">
                  <a href="${verificationLink}" style="
                    display: inline-block;
                    padding: 20px 55px;
                    background: linear-gradient(135deg, #73090b 0%, #9f1619 100%);
                    color: #fefaef;
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                  ">
                    Activer mon compte
                  </a>
                </div>
                
              </div>
              
              <!-- Section jaune avec citation -->
              <div style="padding: 55px 50px; background: linear-gradient(135deg, rgb(222, 146, 23) 0%, rgb(195, 128, 20) 100%); text-align: center;">
                
                <p style="margin: 0 0 12px 0; color: #73090b; font-size: 28px; line-height: 1.5; font-weight: 600; letter-spacing: 1px; font-style: italic;">
                  "Texture fondante,<br/>cœur ultra gourmand"
                </p>
                
                <div style="width: 70px; height: 2px; background: rgba(115, 9, 11, 0.4); margin: 30px auto;"></div>
                
                <p style="margin: 0; color: rgba(115, 9, 11, 0.8); font-size: 12px; letter-spacing: 3px; text-transform: uppercase; font-weight: 500;">
                  100% Fait Maison — Chaque Jour
                </p>
                
              </div>
              
              <!-- Section avantages sur fond marron foncé -->
              <div style="padding: 60px 50px; background-color: #5a1304; text-align: center;">
                
                <h3 style="margin: 0 0 45px 0; color: rgb(222, 146, 23); font-size: 32px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">
                  Votre Expérience
                </h3>
                
                <!-- Avantage 1 -->
                <div style="padding: 30px 15px; text-align: center; border-top: 1px solid rgba(222, 146, 23, 0.3);">
                  <div style="font-size: 42px; margin-bottom: 15px;">📖</div>
                  <p style="margin: 0 0 8px 0; color: rgb(222, 146, 23); font-size: 12px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">
                    Recettes Exclusives
                  </p>
                  <p style="margin: 0; color: rgba(254, 250, 239, 0.8); font-size: 14px; letter-spacing: 0.5px; font-weight: 300; line-height: 1.6;">
                    Accédez à nos créations secrètes<br/>et techniques de chef
                  </p>
                </div>
                
                <!-- Avantage 2 -->
                <div style="padding: 30px 15px; text-align: center; border-top: 1px solid rgba(222, 146, 23, 0.3);">
                  <div style="font-size: 42px; margin-bottom: 15px;">🎁</div>
                  <p style="margin: 0 0 8px 0; color: rgb(222, 146, 23); font-size: 12px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">
                    Éditions Limitées
                  </p>
                  <p style="margin: 0; color: rgba(254, 250, 239, 0.8); font-size: 14px; letter-spacing: 0.5px; font-weight: 300; line-height: 1.6;">
                    Soyez les premiers informés<br/>de nos nouveautés
                  </p>
                </div>
                
                <!-- Avantage 3 -->
                <div style="padding: 30px 15px; text-align: center; border-top: 1px solid rgba(222, 146, 23, 0.3); border-bottom: 1px solid rgba(222, 146, 23, 0.3);">
                  <div style="font-size: 42px; margin-bottom: 15px;">🍪</div>
                  <p style="margin: 0 0 8px 0; color: rgb(222, 146, 23); font-size: 12px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">
                    Savoir-Faire Artisanal
                  </p>
                  <p style="margin: 0; color: rgba(254, 250, 239, 0.8); font-size: 14px; letter-spacing: 0.5px; font-weight: 300; line-height: 1.6;">
                    Découvrez nos secrets<br/>de fabrication
                  </p>
                </div>
                
              </div>
              
              <!-- Footer élégant -->
              <div style="padding: 50px 50px; text-align: center; background-color: #73090b;">
                
                <p style="margin: 0 0 20px 0; color: rgb(222, 146, 23); font-size: 15px; letter-spacing: 7px; text-transform: uppercase; font-weight: 600; font-family: 'Kaftus', 'Impact', sans-serif;">
                  COOKILICIOUS
                </p>
                
                <p style="margin: 0 0 12px 0; color: rgba(254, 250, 239, 0.7); font-size: 12px; letter-spacing: 1px; line-height: 1.8;">
                  Ce lien d'activation expire dans <strong>1 heure</strong>
                </p>
                
                <div style="width: 50px; height: 1px; background: rgba(222, 146, 23, 0.5); margin: 25px auto;"></div>
                
                <p style="margin: 0; color: rgba(254, 250, 239, 0.5); font-size: 10px; letter-spacing: 2px;">
                  © 2025 Cookilicious — La passion du fait-maison
                </p>
                
              </div>
              
              <!-- Bordure dorée inférieure -->
              <div style="height: 4px; background: linear-gradient(90deg, transparent, rgb(222, 146, 23), transparent);"></div>
              
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log("📧 Email envoyé à :", user.email);
  } catch (error) {
    console.error("❌ Erreur d'envoi d'email:", error);
    throw error;
  }
};

module.exports = sendEmail;
