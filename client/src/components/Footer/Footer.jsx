import { Link } from "react-router-dom";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "var(--marronRouge)",
      color: "#fefaef",
      padding: "2rem",
    },

    mentionsGenerales: {
      display: "flex",
      textAlign: "center",
      color: "#fefaef",
      justifyContent:"center"

    },

    footerLink: {
      padding: "0.1rem",
      margin: "0 ",
      justifyContent: "center",
      width: "25rem",
      color: "#fefaef",

    },

    // mentionsP: {
    //   fontSize: "1rem",
    // },

    mentionsH3: {
      fontSize: "1.3rem !important",
      textDecoration: "underline",
      justifySelf: "center",
    },

    footerSection: {
      justifySelf: "center",
    },
  };

  return (
    <div style={styles.footer}>
      {/* <h1>MON FOOTER</h1> */}

      <div style={styles.mentionsGenerales}>
        <section style={styles.footerSection}>
          <h3 style={styles.mentionsH3}>Politique</h3>
          <Link to="/mentionslegales" style={styles.footerLink}>
            conditions générales de vente
          </Link>
          <p style={styles.footerLink}>Politique de livraison</p>
          <p style={styles.footerLink}> Politique de confidentialité</p>
        </section>

        <section style={styles.footerSection}>
          <h3 style={styles.mentionsH3}>Entreprise</h3>
          <Link to="/apropos" style={styles.footerLink}>  A propos</Link>
          <Link to="/" style={styles.footerLink}> home</Link>
          <p style={styles.footerLink}>suivez nous </p>
          <p style={styles.footerLink}>compte </p>
        </section>

        <section style={styles.footerSection}>
          <h3 style={styles.mentionsH3}>aide</h3>
          <Link to="/contact" style={styles.footerLink}>Contact</Link>
          <p style={styles.footerLink}>FAQ</p>
        </section>
      </div>
    </div>
  );
};

export default Footer;
