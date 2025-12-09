import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#880a0cff", display: "flex" }}>
      <header style={{ paddingLeft: "23rem", paddingTop: "3rem" }}>
        <div>
          <h1 style={{ fontSize: "5rem", color: "#fefaef" }}>DASHBOARD</h1>
        </div>
        <nav
          className="navbar navbar-expand-lg navbar-light "
          style={{ left: "10rem" ,fontSize:"1rem" }}
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
            <div className="collapse navbar-collapse" id="navbarNavDropdown" >
              <ul className="navbar-nav">
                <li className="nav-item dropdown" >
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "#fefaef" }}
                  >
                    home
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                    style={{
                      backgroundColor: "#fefaef",
                      border: "rgb(222, 146, 23) 4px solid",
                      width: "13.3rem", fontSize:"0.7rem"
                    }}
                  >
                    <li>
                      <Link to="/admin" className="dropdown-item">
                        dashboard home
                      </Link>
                    </li>

                    <li>
                      <Link to="/" className="dropdown-item">
                        home
                      </Link>
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
