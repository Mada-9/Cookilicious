import { Link } from "react-router-dom";


const Footer = () => {
 
  return (
    <div className="row" style={styles.footer}>
      <div className="col-10 mx-xl-4 justify-content-center " style={styles.mentionsGenerales}>
        <section className=" col-2 col-xs-4  col-md-4 col-lg-4 col-xl-4 col-xxl-2" style={styles.footerSection}>
          <div className="row ">
            <h3 style={styles.mentionsH3}>Politique</h3>
            <Link to="/cgv" style={styles.footerLink}>
              CGV
            </Link>
            <Link to="/mentionslegales" style={styles.footerLink}>
              Mentions légales
            </Link>
            <Link to="/rgpd" style={styles.footerLink}>
              {" "}
              RGPD
            </Link>
          </div>
        </section>

        <section className="col-2 col-xs-4  col-md-4 col-lg-4 col-xl-4 col-xxl-2 " style={styles.footerSection}>
          <h3 style={styles.mentionsH3}>Entreprise</h3>
          <div className="row ">
            <Link to="/apropos" style={styles.footerLink} >
              {" "}
              A propos
            </Link>
            <Link to="/" style={styles.footerLink}>
              {" "}
              home
            </Link>
            <Link to="/apropos" style={styles.footerLink}>
              suivez nous{" "}
            </Link>
            <Link to="/connexion" style={styles.footerLink} >
              compte{" "}
            </Link>
          </div>
        </section>

        <section className="col-2 col-xs-4 col-md-4  col-lg-5 col-xl-3  col-xxl-2 " style={styles.footerSection}>
          <h3 style={styles.mentionsH3}>aide</h3>
          <div className="row ">
            <Link to="/contact" style={styles.footerLink}>
              Contact
            </Link>
            
          </div>
        </section>
      </div>
    </div>
    
  );
  
};
 const styles = {
    footer: {
      backgroundColor: "var(--marronRouge)",
      color: "#fefaef ",
      paddingTop: "2rem",
      paddingLeft:"7rem",
      fontSize:"1rem"
    },

    mentionsGenerales: {
      display: "flex",
      textAlign: "center",
      color: "#fefaef " ,
      // justifyContent:"center"
      gap:"2rem"
    },

    footerLink: {
      // padding: "0.1rem",
      // margin: "0 ",
      justifyContent: "center",
      width: "25rem",
      color: "#fefaef " ,
    },

    // mentionsP: {
    //   fontSize: "1rem",
    // },

    mentionsH3: {
      fontSize: "1rem ",
      textDecoration: "underline",
      
      // justifySelf: "center",
    },

    footerSection: {
      // justifySelf: "center",
    },
  };


export default Footer;
