import React from "react";
// import TemplateAdmin from "../../components/Template/TemplateAdmin";

const PageDashboard = () => {

  const styles ={
    a:{
      color: "#fefaef",
      fontSize:"2rem",
      width:"10rem"
    }
  }
  return (
    <>
      <div style={{ backgroundColor: "#880a0cff", color: "#fefaef",  }}>
        
        <ul style={{display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:"5rem", margin:"0"}}>
          
          <li>
            <a style={styles.a} href="#">compte</a>
          </li>
          <li>
            <a style={styles.a} href="/admin/apropos">
              A propos
            </a>
          </li>
          <li>
            <a style={styles.a}  href="/admin/contact">
              Contact
            </a>
          </li>
          <li>
            <a style={styles.a}  href="/admin/recette">
              Recettes
            </a>
          </li>
          <li>
            <a style={styles.a}  href="/admin/produit">
              Produits
            </a>
          </li>
          <li>
            <a style={styles.a}  href="/admin/commande">
              Commandes
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PageDashboard;
