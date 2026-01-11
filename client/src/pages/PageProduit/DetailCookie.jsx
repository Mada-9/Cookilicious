import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import { PanierContext } from "../../utils/context/PanierContext";
import axiosinstance from "../../utils/axios/axiosinstance";
import { motion, useScroll, useTransform } from "framer-motion";

import "./DetailProduit.css";

const DetailCookie = () => {
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
  const [detailCookie, setDetailCookie] = useState(null);
  const [cookie, setCookie] = useState([]);
  const [quantite, setQuantite] = useState(1);

  const { scrollY } = useScroll();

  // plus on scroll, plus ça monte lentement
  const ySlow = useTransform(scrollY, [0, 600], [0, -120]);

  useEffect(() => {
    if (id) {
      getCookie(id);
    }
  }, [id]);

  const getCookie = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_COOKIE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setDetailCookie(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllCookies();
  }, []);

  const getAllCookies = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_COOKIES);
      if (status === 200) setCookie(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //ajout au panier

  return (
    <>
      <div style={{}}>
        {!detailCookie ? (
          <p>Chargement...</p>
        ) : (
          <div>
            <div
              key={detailCookie._id}
              style={{ padding: "3rem" }}
              className="row"
            >
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb my-3">
                  <li className="breadcrumb-item">
                    <Link to="/cookies" style={{ width: "6rem" }}>
                      cookies
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="">{detailCookie.titre}</Link>
                  </li>
                </ol>
              </nav>
              <div
                style={{ display: "flex", height: "3rem" }}
                className="detailProduitContent"
              >
                <h2 className="detailTitre col-10">{detailCookie.titre}</h2>
                <h2
                  className="produitPrix col-1"
                  style={{ marginRight: "3rem" }}
                >
                  {detailCookie.prix}€
                </h2>
              </div>

              <div className="imgBtnAjout">
                <motion.section style={{ y: ySlow }}>
                  <img
                    className="detailProduitImg "
                    style={{}}
                    src={detailCookie.photo}
                    alt={detailCookie.titre}
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
                  onClick={() => addPanier({ ...detailCookie, quantite })}
                  className="btnAjout "
                  // data-back="Back"
                  // data-front="Front"
                >
                  Ajouter <br />
                  au <br />
                  panier
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
                <p className="descProduit  col-sm-12 col-md-6 col-lg-8">
                  {detailCookie.description}
                </p>
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
                  <p className="col-lg-5">
                    {" "}
                    Total: {detailCookie.prix * quantite} €
                  </p>
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
                {detailCookie.ingredients}
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

export default DetailCookie;
