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
          className="navbar navbar-expand-lg navbar-light "
          style={{ left: "10rem" }}
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
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
                {/* <li class="nav-item">
                <a class="nav-link " href="#">
                  home
                </a>
              </li> */}

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
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
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                    style={{
                      backgroundColor: "#fefaef",
                      border: "rgb(222, 146, 23) 4px solid",
                      width: "13.3rem",
                    }}
                  >
                    <li>
                      <a className="dropdown-item" href="/admin">
                        dashboard home
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="/">
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
