import React, {  useState, useEffect } from "react";

const Profil = () => {
  const [user, setUser] = useState([]);
  const [commande, setCommande] = useState([]);

  return (
    <>
      <h1>Profil</h1>
      <div>mes commandes</div>
      <p>toutes les commandes effectuées</p>
      <div>mon compte</div>
      <p>gestion de son compte (supp, modifier) </p>
    </>
  );
};

export default Profil;
