import { useState } from "react";
import { Link } from "react-router-dom";
import "./HeaderAdmin.css";

const Header = () => {
  return (
    <div>
      <nav className="navbar">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvasLg"
          aria-controls="navbarOffcanvasLg"
          aria-label="Toggle navigation"
          style={{ border: "none", justifyItem: "left" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="navbarOffcanvasLg"
          aria-labelledby="navbarOffcanvasLgLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <Link to="/admin/home">Dashboard</Link>{" "}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <ul className="navbar-nav">
              <li className="nav-item px-2">
              <Link to="/admin/produit" className="nav-link">
                Gestion des produits
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/admin/recette" className="nav-link">
                Gestion des recettes
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/admin/membres " className="nav-link">
                Gestion des membres{" "} 
                {/* CHANGER EN MEMBRES */}
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/admin/contact" className="nav-link">
                Gestion des messages
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/admin/commandes" className="nav-link">
                Gestion des commandes
              </Link>
            </li>
             <li className="nav-item px-2">
              <Link to="/" className="nav-link">
                Home
              

              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
