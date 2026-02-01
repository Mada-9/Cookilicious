import { useContext} from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { PanierContext } from "../../utils/context/PanierContext";
import { AuthContext } from "../../utils/context/AuthContext";
import HEADER_LINKS from "../../utils/config/LinkHeader";

const Header = () => {
  const { totalProduit } = useContext(PanierContext);
  const { user, logout } = useContext(AuthContext);
  const isAuthenticated = user;
  const role = user?.role;


  const visibleLinks = HEADER_LINKS.filter((link) => {
    if (!link.auth) return true; // liens publics
    if (!isAuthenticated) return false; // pas connecté = pas d'accès
    if (link.auth === role) return true; // rôle correspondant
    return false; // sinon, on cache
  });

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg ">
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
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="navbarOffcanvasLg"
          aria-labelledby="navbarOffcanvasLgLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <ul className="navbar-nav">
            <ul className="navbar-nav mx-auto">
              <li>
                {" "}
                <Link to="/" className="nav-link " style={{justifyContent:"left"}}>
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown-menu-right px-2">
                <Link
                  to="/produit"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Produit
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                  style={{ color: "var(--marronRouge)", backgroundColor:"var(--creme)", border:"1px solid var(--jaune)", }}

                >
                  <li>
                    <Link to="/cookies">
                      <p
                        className="dropdown-item"
                        style={{ color: "var(--marronRouge)", backgroundColor:"var(--creme)" }}
                      >
                        Cookies
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/brookies">
                      <p
                        className="dropdown-item"
                        style={{ color: "var(--marronRouge)", backgroundColor:"var(--creme)" }}
                      >
                        Brookies
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
              <Link to="/recette" className="nav-link">
                Recettes
              </Link>
              <Link to="/apropos" className="nav-link">
                A propos
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              {visibleLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  <Link to={link.path} className="nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/sign" onClick={logout} className="nav-link">
                    Déconnexion
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/sign" className="nav-link">
                    Connexion
                  </Link>
                </li>
              )}
            </ul>
            <Link to="/panier" className="panier ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-bag-dash"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>
              ({totalProduit()})
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
