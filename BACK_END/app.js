// IMPORT PACKAGES
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// IMPORT FILES
const ENV = require("./config/Env.js");
const connectDB = require("./config/Mongo.js");
const errorMiddleware = require("./middlewares/ErrorMiddleware.js");

// IMPORT ROUTES
const authRouter = require("./router/Auth.Router.js");
const cookiesRouter =require("./router/Cookies.Router.js");
const brookiesRouter =require("./router/Brookies.Router.js");
const contactRouter = require("./router/Contact.Router.js");
const recetteRouter = require("./router/Recette.Router.js");
const avisRouter = require("./router/Avis.Router.js");
const commandeRouter = require("./router/Commande.Router.js");
const membreRouter = require("./router/Membre.Router.js");

// CONNEXION MONGO
connectDB(ENV.MONGO_URI, ENV.DB_NAME);

// APP EXPRESS
const app = express();
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});


// MIDDLEWARES
/**
 * app.use(express.json());
 * → permet à Express de comprendre et parser automatiquement le body JSON des requêtes (sinon req.body serait undefined).
 */
app.use(express.json());
/**
 * app.use(cookieParser());
 * → lit les cookies envoyés par le client et les rend accessibles dans req.cookies.
 */
app.use(cookieParser());
/**
 * app.use(cors({...}));
 * → active le CORS (Cross-Origin Resource Sharing) pour autoriser des requêtes venant de du front.
 */
app.use(
  cors({
    origin: [ENV.WEB_APP_URL, ENV.DOMAINE_URL, 'https://cookilicious-51jq.vercel.app','https://cookilicious-d5op.vercel.app'],
    credentials: true,
  })
);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// PREFIX
app.use("/api/auth", authRouter);
app.use("/api/cookie", cookiesRouter);
app.use("/api/brookie", brookiesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/recette", recetteRouter);
app.use("/api/avis", avisRouter);
app.use("/api/commande", commandeRouter)
app.use("/api/membre", membreRouter)



console.log("APP FILE LOADED");


// Middleware d'erreurs (toujours en dernier 🚨)
app.use(errorMiddleware);

module.exports = app;
