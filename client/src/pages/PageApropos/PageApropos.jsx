import React from "react";

const PageApropos = () => {
  return (
    <>
      <h1
        style={{
          borderTop: "2px solid var(--marronRouge)",
          backgroundColor:"var(--marronRouge)",
          padding: "2rem",
          color: "var(--jaune)",
          fontSize: "5rem",
        }}
      >
        À propos de Cookilicious
      </h1>

      {/* ************************************************************************************** */}

      <div
        style={{
          padding: "3rem",
          lineHeight: "40px",
          wordSpacing: "1px",
        }}
      >
        {/* PREMIER PARAGRAPHE */}
        <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
          Notre Histoire
        </h1>
        <p style={{ textAlign: "justify" }}>
          Bienvenue dans l’univers de Cookilicious, un monde plein de saveurs,
          de douceurs et de créativité sucrée ! Ici, chaque recette est une
          invitation à la gourmandise — des cookies fondants aux brookies dorés,
          en passant par des desserts fruités, moelleux ou croustillants.
        </p>

        {/* {/* ************************************************************************************** */}

        <h1 style={{ fontSize: "3rem", margin: "6rem 0 2rem  0" }}>
          Notre Mission
        </h1>
        <div style={{ display: "flex", gap: "3rem", marginBottom: "6rem" }}>
          <p style={{ textAlign: "justify", width: "50%" }}>
            Chez Cookilicious, notre mission est simple : générer du plaisir à
            chaque cookie. Nous croyons que la gourmandise n’est pas seulement
            un goût, mais une expérience qui éveille les sens et réunit les
            gens. Chaque création est pensée pour surprendre, réconforter et
            enchanter nos clients, avec des textures fondantes, <br />
            croustillantes ou moelleuses et des saveurs originales qui sortent
            de l’ordinaire.
          </p>

          <p style={{ width: "50%", textAlign: "justify" }}>
            {/* <p style={{  width:"50%", textAlign: "justify",justifySelf:"right"}}> */}
            Cookilicious est avanttout un lieu de partage et de plaisir. Notre
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
        >
          <h1
            style={{
              color: "var(--jaune)",
              textAlign: "left",
              alignSelf: "center",
              fontSize: "3rem",
            }}
          >
            Nos Cookies
          </h1>
          <p>
            Tous nos cookies sont faits maison en France, avec des ingrédients
            soigneusement sélectionnés. Nous explorons des goûts uniques et
            spéciaux, allant des classiques revisités aux associations
            audacieuses, pour offrir une expérience sucrée inoubliable. Nos
            recettes mettent un point d’honneur à allier qualité, originalité et
            gourmandise : un vrai festival de saveurs dans chaque bouchée !
          </p>
        </div>

        {/* ************************************************************************************** */}
        <div style={{ textAlign: "justify", width: "30rem" }}>
          <h1 style={{ alignSelf: "center", marginBottom: "2rem" }}>
            Restons connectés
          </h1>
          <p>
            Une question? une commande spéciale? envie d’échanger autour de la
            pâtisserie? Contactez nous ! <br />
            mail: contact@cookilicious.fr <br />
            et suivez nous sur nos réseaux sociaux!
          </p>
          <div style={{ display: "flex", width: "15rem" }}>
            <a href="https://www.instagram.com/">
              <i className="bi bi-instagram"></i>
            </a>

            <a href="https://www.facebook.com/">
              <i className="bi bi-facebook"></i>
            </a>

            <a href="https://www.tiktok.com/">
              <i className="bi bi-tiktok"></i>
            </a>
            <a href="https://fr.pinterest.com/">
              <i className="bi bi-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageApropos;
