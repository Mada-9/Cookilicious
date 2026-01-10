import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import { PanierContext } from "../../utils/context/PanierContext";
import axiosinstance from "../../utils/axios/axiosinstance";
import { motion, useScroll, useTransform } from "framer-motion";

import "./DetailProduit.css";

const DetailProduit = () => {
  const {
    panier,
    addPanier,
    incremente,
    decremente,
    priceProduitByQuantity,
    totalProduit,
    totalPrice,
  } = useContext(PanierContext);

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [detailProduit, setDetailProduit] = useState(null);
  const [produit, setProduit] = useState([]);
  const [quantite, setQuantite] = useState(1);

  const { scrollY } = useScroll();

  // plus on scroll, plus ça monte lentement
  const ySlow = useTransform(scrollY, [0, 550], [0, -10]);

  useEffect(() => {
    if (id) {
      getProduit(id);
    }
  }, [id]);

  const getProduit = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_PRODUIT}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setDetailProduit(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllProduits();
  }, []);

  const getAllProduits = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_PRODUITS);
      if (status === 200) setProduit(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //ajout au panier

  return (
    <>
     

      <div style={{}}>
        {!detailProduit ? (
          <p>Chargement...</p>
        ) : (
          <div>
            <div
              key={detailProduit._id}
              style={{ padding: "3rem" }}
              className="row"
            >
               <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-3">
          
          <li className="breadcrumb-item">
            
            <Link to="/cookies" style={{ width: "6rem" }}>
              Produits
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="">{detailProduit.titre}</Link>
          </li>
        </ol>
      </nav>
              <div
                style={{ display: "flex", height: "3rem" }}
                className="detailProduitContent"
              >
                <h2 className="detailTitre col-10">{detailProduit.titre}</h2>
                <h2
                  className="produitPrix col-1"
                  style={{ marginRight: "3rem" }}
                >
                  {detailProduit.prix}€
                </h2>
              </div>

              <div className="imgBtnAjout"  >
                <motion.section style={{ y: ySlow }}>
                  <img
                    className="detailProduitImg "
                    style={{}}
                    src={detailProduit.photo}
                    alt={detailProduit.titre}
                  />
                </motion.section>
                <Link
                  style={{
                    background: "transparent",
                    border: "1px solid var(--marronFroid)",
                    color: "var(--marronRouge)",
                    borderRadius: " 50px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    alignContent: "center",
                    textAlign: "center",
                    fontSize: "1rem",
                    width: "7rem",
                  }}
                  onClick={() => addPanier({ ...detailProduit, quantite })}
                  className="btnAjout "
                  // data-back="Back"
                  // data-front="Front"
                >
                  Ajouter <br />
                  au <br />panier
                </Link>
              </div>

              <div
              className="descBtn"
                style={{
                  paddingBottom: "3rem",
                  display: "flex",
                  gap: "3rem",
                  marginTop: "3rem",
                }}
              >
                <p className="descProduit  col-sm-12 col-md-6 col-lg-8">{detailProduit.description}</p>
                <div
                  className="btnQuantite col-5 col-lg-5"
                  style={{ display: "flex", gap: "1rem" }}
                >
                  {" "}
                  <button
                    style={{
                      background: "transparent",
                      border: "1px solid var(--marronFroid)",
                      color: "var(--marronRouge)",
                      padding: "12px 28px",
                      borderRadius: " 50px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      justifySelf: "center",
                      fontSize: "1rem",
                    }}
                    onClick={() => setQuantite(quantite - 1)}
                  >
                    -
                  </button>
                  <p>{quantite}</p>
                  <button
                    style={{
                      background: "transparent",
                      border: "1px solid var(--marronFroid)",
                      color: "var(--marronRouge)",
                      padding: "12px 28px",
                      borderRadius: " 50px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      justifySelf: "center",
                      fontSize: "1rem",
                    }}
                    onClick={() => setQuantite(quantite + 1)}
                  >
                    +
                  </button>
                  <p className="col-lg-5"> Total: {detailProduit.prix * quantite} €</p>
                </div>
              </div>
              <p
                style={{
                  borderTop: "3px solid var(--marronRouge)",
                  paddingTop: "2rem",
                  marginBottom: "20rem",
                }}
                className="col-12"
              >
                {" "}
                Ingrédients :
                <br />
                {detailProduit.ingredients}
              </p>
            </div>
          </div>
        )}

        {/* <div style={{ padding: "3rem", marginTop: "20rem" }}>
          <h2
            style={{
              textAlign: "left",
              borderBottom: "3px solid var(--marronRouge)",
              width: "50rem",
            }}
          >
            Vous aimeriez aussi
          </h2>
          <div
            style={{
              justifySelf: "left",
              display: "flex",
              gap: "3rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                border: "5px var(--marronRouge) solid ",
                width: "13rem",
              }}
            >
              <img
                src={produit[7]?.photo}
                alt={produit.titre}
                width={160}
                height={160}
              />
              <p>{produit[7]?.titre}</p>
              <p>{produit[7]?.prix}</p>
              <button onClick={() => navigate(`/#/${produit._id}`)}>
                voir
              </button>
            </div>
            <div
              style={{
                border: "5px var(--marronRouge) solid ",
                width: "13rem",
              }}
            >
              <img
                src={produit[6]?.photo}
                alt={produit.titre}
                width={160}
                height={160}
              />
              <p>{produit[6]?.titre}</p>
              <p>{produit[6]?.prix}</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DetailProduit;
