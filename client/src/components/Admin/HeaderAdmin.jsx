import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#880a0cff", display: "flex" }}>
      <header style={{ paddingLeft: "23rem", paddingTop: "3rem" }}>
        <div>
          <h1 style={{ fontSize: "6rem", color: "#fefaef" }}>DASHBOARD</h1>
        </div>
        <nav
          class="navbar navbar-expand-lg navbar-light "
          style={{ left: "10rem" }}
        >
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                {/* <li class="nav-item">
                <a class="nav-link " href="#">
                  home
                </a>
              </li> */}

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "#fefaef" }}
                  >
                    home
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                    style={{
                      backgroundColor: "#fefaef",
                      border: "rgb(222, 146, 23) 4px solid",
                      width: "13.3rem",
                    }}
                  >
                    <li>
                      <a class="dropdown-item" href="/admin">
                        dashboard home
                      </a>
                    </li>
                    
                    <li>
                      <a class="dropdown-item" href="#">
                        compte
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/admin/apropos">
                        A propos
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/admin/contact">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/admin/recette">
                        Recettes
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/admin/produit">
                        Produits
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/admin/commande">
                        Commandes
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/">
                         home
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
