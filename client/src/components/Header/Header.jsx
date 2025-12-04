import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { PanierContext } from "../../utils/context/PanierContext";

const Header = () => {
  const { totalProduit } = useContext(PanierContext);

  return (
    <header>
      <div className="row mx-auto">
        <nav className="navbar navbar-expand-lg  navbar-light ">
          <div className="dropdown  dropright">
            <button
              className="navbar-toggler m-3 "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item  px-2">
                  <a className="nav-link " href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown-menu-right px-2">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/produit"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Produit
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                    style={{
                      backgroundColor: "#fefaef",
                      border: "rgb(222, 146, 23) 4px solid",
                      fontSize: "1.5rem",
                    }}
                  >
                    <li>
                      <Link to="/cookies">
                        <p
                          className="dropdown-item"
                          style={{ color: "#880a0cff" }}
                        >
                          Cookies
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/brookies">
                        <p
                          className="dropdown-item"
                          style={{ color: "#880a0cff" }}
                        >
                          Brookies
                        </p>
                      </Link>
                    </li>
                    {/* Another action */}
                  </ul>
                </li>

                <li className="nav-item px-2">
                  <a className="nav-link" href="/recette">
                    Recettes
                  </a>
                </li>
                <li className="nav-item px-2">
                  <a className="nav-link" href="/apropos">
                    A propos
                  </a>
                </li>
                <li className="nav-item px-2">
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item dropdown px-2 ">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dashboard
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                    style={{
                      backgroundColor: "#fefaef",
                      border: "rgb(222, 146, 23) 4px solid",
                      width: "17rem",
                    }}
                  >
                    <li>
                      <a className="dropdown-item" href="/admin">
                        Home Dashboard
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Gestion du compte
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/connexion">
                        Connexion
                      </a>
                    </li>
                    {/* Another action */}
                    <li>
                      <a className="dropdown-item" href="#">
                        Aide
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* PANIER */}

              <Link to="/panier" className="panier ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  fill="currentColor"
                  className="bi bi-basket3 "
                  viewBox="0 0 16 16"
                >
                  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6z" />
                </svg>{" "}
                ({totalProduit()})
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
