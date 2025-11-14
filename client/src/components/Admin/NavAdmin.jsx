import React from "react";
import { Link } from "react-router-dom";

const NavAdmin = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="dashboard"> Dashboard</Link>
          </li>
          <li>
            <Link to="agence"> Produit</Link>
          </li>
          <li>
            <Link to="recette"> Recette</Link>
          </li>
          <li>
            <Link to="apropos"> A propos</Link>
          </li>
          <li>
            <Link to=""> Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavAdmin;
