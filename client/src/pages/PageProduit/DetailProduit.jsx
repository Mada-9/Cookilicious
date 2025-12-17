import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import { PanierContext } from "../../utils/context/PanierContext";
import axiosinstance from "../../utils/axios/axiosinstance";
import { motion, useScroll, useTransform } from "framer-motion";


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
     const { scrollY } = useScroll();

  // plus on scroll, plus ça monte lentement
  const ySlow = useTransform(scrollY, [0, 600], [0, -90]);

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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item  px-3">
            <Link to="/" style={{ width: "3rem" }}>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/produit" style={{ width: "6rem" }}>
              Produits
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="">Produit</Link>
          </li>
        </ol>
      </nav>

      <div style={{}}>
        {!detailProduit ? (
          <p>Chargement...</p>
        ) : (
          <div>
            <div key={detailProduit._id} style={{ padding: "3rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyItems: "center",
                  paddingBottom: "2rem",
                }}
                className=""
              >
                <h2 style={{ fontSize: "3rem" }} className="">
                  {detailProduit.titre}
                </h2>
                            <motion.section style={{ y: ySlow }}>

                <img
                  className="detailProduitImg "
                  style={{
                    display: "flex",
                    justifySelf: "center",
                    alignSelf: "center",
                  }}
                  src={detailProduit.photo}
                  alt={detailProduit.titre}
                  width={460}
                  height={460}
                />  </motion.section>
                {/* <div style={{ padding: "3rem" }}>
                <div style={{ fontSize: "1rem", display: "flex", gap: "1rem" }}>
                  <p style={{ fontSize: "2rem" }}> {detailProduit.prix} €</p>
                  <button onClick={() => decremente(index)}>-</button>
                  <p
                    style={{ backgroundColor: "var(--creme)", border: "none" }}
                  >
                    quantité
                  </p>
                  <p>{detailProduit.index}</p>
                  <button onClick={() => incremente(index)}>+</button>
                </div>
                <p>{detailProduit.description}</p>
                
              </div> */}{" "}
                <h2
                  className=""
                  style={{ paddingLeft: "9rem", paddingRight: "1rem" }}
                >
                  {detailProduit.prix}€
                </h2>
                <Link
                  style={{
                    background: "transparent",
                    border: "1px solid var(--marronFroid)",
                    color: "var(--marronRouge)",
                    padding: "12px 28px",
                    borderRadius: " 50px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    justifySelf: "center",
                    alignContent: "center",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                  className="btnFlip"
                  data-back="Back"
                  data-front="Front"
                  onClick={() => addPanier(detailProduit)}
                >
                  {" "}
                  Ajouter au panier
                </Link>
              </div>
              <div
                style={{ paddingBottom: "3rem", display: "flex", gap: "3rem" }}
              >
                <p className="col-9">{detailProduit.description}</p>
                <div
                  className="btnQuantite col-3"
                  style={{ display: "flex", gap: "1rem" }}
                >
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
                    onClick={() => decremente(index)}
                  >
                    -
                  </button>
                  <p style={{ fontSize: "1rem" }}>{produit.index}6</p>
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
                    onClick={() => incremente(index)}
                  >
                    +
                  </button>
                </div>
              </div>
              <p
                style={{
                  borderTop: "3px solid var(--marronRouge)",
                  paddingTop: "2rem",
                  marginBottom: "20rem",
                }}
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
