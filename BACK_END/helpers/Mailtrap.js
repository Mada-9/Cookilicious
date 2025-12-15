import nodemailer from "nodemailer";

// Crée le transporter Mailtrap
export const mailer = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST, // ex: sandbox.smtp.mailtrap.io
  port: process.env.MAILTRAP_PORT, // ex: 2525
  auth: {
    user: process.env.MAILTRAP_USER, // depuis ton .env
    pass: process.env.MAILTRAP_PASS, // depuis ton .env
  },
});
