import React from "react";

const URL = {
  POST_PRODUIT: "/api/produit/post",
  GET_ALL_PRODUITS: "/api/produit/get",
  GET_DETAIL_PRODUIT: "/api/produit/get",
  DELETE_PRODUIT: "/api/produit/delete",
  UPDATE_PRODUIT: "/api/produit/update",

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
  GET_DETAIL_AVIS: "/api/avis/get/:id",
  DELETE_AVIS: "/api/avis/delete",
  UPDATE_AVIS: "/api/avis/update",

  AUTH_REGISTER: "http://localhost:8000/api/auth/register",
  AUTH_SIGN: "http://localhost:8000/api/auth/login",
};


  // rajouter l'id ou pas?
export default URL;
