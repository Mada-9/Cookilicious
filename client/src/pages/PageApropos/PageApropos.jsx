import { Link } from "react-router-dom";

import "./PageApropos.css"

const PageApropos = () => {
  return (
    <>
      <h2
        style={{
          padding: "2rem",
          color: "var(--jaune)",
          fontSize:"3rem", justifySelf:"center"
        }}
        className="titreApropos"
      >
        À propos  de  Cookilicious
      </h2>

      {/* ************************************************************************************** */}

      <div
        style={{
          padding: "3rem",
          lineHeight: "40px",
          wordSpacing: "1px",
        }}
      >
        {/* PREMIER PARAGRAPHE */}
        <h2 style={{  marginBottom: "2rem" }}>
          Notre Histoire
        </h2>
        <p style={{ textAlign: "justify" }}>
          Bienvenue dans l’univers de Cookilicious, un monde plein de saveurs,
          de douceurs et de créativité sucrée ! Ici, chaque recette est une
          invitation à la gourmandise — des cookies fondants aux brookies dorés,
          en passant par des desserts fruités, moelleux ou croustillants.
        </p>

        {/* {/* ************************************************************************************** */}

        <h2 style={{  margin: "6rem 0 2rem  0", justifySelf:"center" }} >
          Notre Mission
        </h2>
        <div style={{ display: "flex", gap: "5rem", marginBottom: "6rem", }}className="textApropos">
          <p style={{ textAlign: "justify",  }}>
            Chez Cookilicious, notre mission est simple : générer du plaisir à
            chaque cookie. Nous croyons que la gourmandise n’est pas seulement
            un goût, mais une expérience qui éveille les sens et réunit les
            gens. Chaque création est pensée pour surprendre, réconforter et
            enchanter nos clients,<br /> avec des textures fondantes, 
            croustillantes ou moelleuses et des saveurs originales qui sortent
            de l’ordinaire.
          </p>

          <p style={{  textAlign: "justify" }}>
            {/* <p style={{  width:"50%", textAlign: "justify",justifySelf:"right"}}> */}
            Cookilicious est avant tout un lieu de partage et de plaisir. Notre
            but ? Faire découvrir des créations simples, faites avec amour, qui
            éveillent les papilles et réchauffent les cœurs. Que tu sois fan de
            biscuits, de gâteaux, ou simplement curieux de goûter à de nouvelles
            saveurs, tu trouveras ici ton bonheur.
          </p>
        </div>

        {/* ************************************************************************************** */}

        <div
          style={{
            textAlign: "justify",
            marginBottom: "6rem",
            display: "flex",
            gap: "8rem",
          }}
          className="textApropos"
        >
          <h2
            style={{
              color: "var(--jaune)",
              textAlign: "left",
              alignSelf: "center",
          }}
          >
            Nos Cookies
          </h2>
          <p>
            Tous nos cookies sont faits maison en France, avec des ingrédients
            soigneusement sélectionnés. Nous explorons des goûts uniques et
            spéciaux, allant des classiques revisités aux associations
            audacieuses, pour offrir une expérience sucrée inoubliable. Nos
            recettes mettent un point d’honneur à allier qualité, originalité et
            gourmandise: un vrai festival de saveurs dans chaque bouchée !
          </p>
        </div>

        {/* ************************************************************************************** */}
        <div style={{ textAlign: "justify", maxWidth: "30rem" }}>
          <h2 style={{ alignSelf: "center", marginBottom: "2rem",}}>
            Restons connectés
          </h2>
          <p>
            Une question? une commande spéciale? envie d’échanger autour de la
            pâtisserie? Contactez nous ! <br />
            mail: contact@cookilicious.fr <br />
            et suivez nous sur nos réseaux sociaux!
          </p>
          <div style={{ display: "flex", width: "15rem", gap:"2rem" }}>
            <Link to="https://www.instagram.com/">
              <i className="bi bi-instagram"></i>
            </Link>

            <Link to="https://www.facebook.com/">
              <i className="bi bi-facebook"></i>
            </Link>

            <Link to="https://www.tiktok.com/">
              <i className="bi bi-tiktok"></i>
            </Link>
            <Link to="https://fr.pinterest.com/">
              <i className="bi bi-pinterest"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageApropos;
