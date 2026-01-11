import React from "react";

const URL = {
  POST_PRODUIT: "/api/produit/post",
  GET_ALL_PRODUITS: "/api/produit/get",
  GET_DETAIL_PRODUIT: "/api/produit/get",
  DELETE_PRODUIT: "/api/produit/delete",
  UPDATE_PRODUIT: "/api/produit/update",

  POST_COOKIE: "/api/cookie/post",
  GET_ALL_COOKIES: "/api/cookie/get",
  GET_DETAIL_COOKIE: "/api/cookie/get",
  DELETE_COOKIE: "/api/cookie/delete",
  UPDATE_COOKIE: "/api/cookie/update",

  POST_BROOKIE: "/api/brookie/post",
  GET_ALL_BROOKIES: "/api/brookie/get",
  GET_DETAIL_BROOKIE: "/api/brookie/get",
  DELETE_BROOKIE: "/api/brookiesdelete",
  UPDATE_BROOKIE: "/api/brookie/update",

  POST_RECETTE: "/api/recette/post",
  GET_ALL_RECETTES: "/api/recette/get",
  GET_DETAIL_RECETTE: "/api/recette/get",
  DELETE_RECETTE: "/api/recette/delete",
  UPDATE_RECETTE: "/api/recette/update",

  POST_CONTACT: "/api/contact/post",
  GET_CONTACT: "/api/contact/get",
  DELETE_CONTACT: "/api/contact/delete",

  POST_AVIS: "/api/avis/post",
  GET_ALL_AVIS: "/api/avis/get",
  GET_DETAIL_AVIS: "/api/avis/get",
  DELETE_AVIS: "/api/avis/delete",
  UPDATE_AVIS: "/api/avis/update",

  POST_COMMANDE: "/api/commande/post",
  GET_ALL_COMMANDES: "/api/commande/get",
  GET_DETAIL_COMMANDE: "/api/commande/get",
  GET_USER_COMMANDES: "/api/commande/get/user/",
  DELETE_COMMANDE: "/api/commande/delete",
  UPDATE_COMMANDE: "/api/commande/update",

  POST_MEMBRES: "/api/membre/post",
  GET_ALL_MEMBRES: "/api/membre/get",
  GET_DETAIL_MEMBRE: "/api/membre/get",
  DELETE_MEMBRE: "/api/membre/delete",
  UPDATE_MEMBRE: "/api/membre/update",

  AUTH_REGISTER: "http://localhost:8000/api/auth/register",
  AUTH_SIGN: "http://localhost:8000/api/auth/login",
  AUTH_VERIFY_EMAIL: "http://localhost:8000/api/auth/verify",
};

// rajouter l'id ou pas?
export default URL;
