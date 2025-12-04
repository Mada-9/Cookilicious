import React from "react";
import {useNavigate} from "react-router-dom"

const PageConnexion = () => {
    const navigate = useNavigate()
  return (
    <>
      <div>PageConnexion</div>

      <form action="submit">
        <label htmlFor="email" id="email">email</label>
        <input type="text"  />
        <label htmlFor="password" id="password">Mot de passe</label>
        <input type="password"  />
        <button type="submit" onClick={()=>navigate("/produit")}>connexion</button>
      </form>
    </>
  );
};

export default PageConnexion;
