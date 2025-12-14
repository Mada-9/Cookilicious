import { useContext } from "react";
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
    if (!isAuthenticated) return false; // pas connecté → pas d'accès
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
          className="offcanvas offcanvas-start"
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
                <Link to="/" className="nav-link ">
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
            
                   <Link to="/sign"  onClick={logout} className="nav-link">
                    Déconnexion
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  {" "}
                  <Link to="/sign" className="nav-link">
                    Connexion
                  </Link>
                </li>
              )}
            </ul>

            {/* PANIER */}

            <Link to="/panier" className="panier ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="37"
                fill="currentColor"
                className="bi bi-basket3 "
                viewBox="0 0 16 16"
              >
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6z" />
              </svg>{" "}
              ({totalProduit()})
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
