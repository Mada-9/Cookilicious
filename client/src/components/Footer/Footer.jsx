import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container-fluid" style={styles.footer}>
      
      <div className="row justify-content-center text-center">

        {/* PRODUITS */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div style={styles.section}>
            <h3 style={styles.title}>Produits</h3>
            <Link to="/cookies" style={styles.link}>Cookies</Link>
            <Link to="/brookies" style={styles.link}>Brookies</Link>
            <Link to="/recette" style={styles.link}>Recettes</Link>
          </div>
        </div>

        {/* ENTREPRISE */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div style={styles.section}>
            <h3 style={styles.title}>Cookilicious</h3>
            <Link to="/apropos" style={styles.link}>À propos</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
            <Link to="/faq" style={styles.link}>FAQ</Link>
          </div>
        </div>

        {/* LÉGAL */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div style={styles.section}>
            <h3 style={styles.title}>Légal</h3>
            <Link to="/cgv" style={styles.link}>CGV</Link>
            <Link to="/mentionslegales" style={styles.link}>Mentions légales</Link>
            <Link to="/rgpd" style={styles.link}>RGPD</Link>
          </div>
        </div>

      </div>

      <hr style={styles.separator} />

      <div className="row">
        <div className="col text-center" style={styles.bottom}>
          ©  COOKILICIOUS - {new Date().getFullYear()}
        </div>
      </div>

    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "var(--marronRouge)",
    color: "#fefaef",
    padding: "3rem 1.5rem 2rem",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",    
    gap: "0.45rem",
  },

  title: {
    fontSize: "1rem",
    textDecoration: "underline",
    marginBottom: "0.6rem",
  },

  link: {
    color: "#fefaef",
    textDecoration: "none",
    fontSize: "0.95rem",
  },

  separator: {
    borderColor: "rgba(254,250,239,0.25)",
    margin: "2rem 0 1rem",
  },

  bottom: {
    fontSize: "0.8rem",
    opacity: 0.7,
  },
};

export default Footer;
