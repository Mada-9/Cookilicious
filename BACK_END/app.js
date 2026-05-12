const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// IMPORT FILES & CONFIG
const ENV = require("./config/Env.js");
const connectDB = require("./config/Mongo.js");
const errorMiddleware = require("./middlewares/ErrorMiddleware.js");

// IMPORT ROUTES
const authRouter = require("./router/Auth.Router.js");
const cookiesRouter = require("./router/Cookies.Router.js");
const brookiesRouter = require("./router/Brookies.Router.js");
const contactRouter = require("./router/Contact.Router.js");
const recetteRouter = require("./router/Recette.Router.js");
const avisRouter = require("./router/Avis.Router.js");
const commandeRouter = require("./router/Commande.Router.js");
const membreRouter = require("./router/Membre.Router.js");

// CONNEXION MONGO
connectDB(ENV.MONGO_URI, ENV.DB_NAME);

const app = express();

app.use(
  cors({
    origin: [
      "https://cookilicious-51jq.vercel.app", // Ton URL Front actuelle
      "http://localhost:5173",                // Pour tes tests locaux
    ],
    credentials: true, // Autorise l'envoi des cookies/sessions
  })
);

// Dans app.js, juste après les imports
console.log("Vérification MONGO_URI :", process.env.MONGO_URI ? "Reçue" : "ABSENTE");
console.log("Vérification DB_NAME :", process.env.DB_NAME ? "Reçue" : "ABSENTE");

connectDB(process.env.MONGO_URI, process.env.DB_NAME);


// --- 2. PARSING MIDDLEWARES ---
app.use(express.json());
app.use(cookieParser());


// Route de test pour vérifier que le backend est en ligne
app.get("/", (req, res) => {
  res.json({ message: "Le backend Cookilicious est en ligne !" });
});



// --- 4. PREFIXES API ---
app.use("/api/auth", authRouter);
app.use("/api/cookie", cookiesRouter);
app.use("/api/brookie", brookiesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/recette", recetteRouter);
app.use("/api/avis", avisRouter);
app.use("/api/commande", commandeRouter);
app.use("/api/membre", membreRouter);

// --- 5. GESTION DES ERREURS ---
app.use(errorMiddleware);

module.exports = app;