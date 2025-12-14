import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import { PanierContext } from "../../utils/context/PanierContext";
import axiosinstance from "../../utils/axios/axiosinstance";

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

      {!detailProduit ? (
        <p>Chargement</p>
      ) : (
        <div>
          <div key={detailProduit._id}>
            <p
              style={{
                color: "var(--creme)",
                // backgroundColor: " #67200dff",
                backgroundColor: "var(--marronRouge)",
                height: "6rem",
                alignContent: "center",
                fontSize: "3.5rem",
                width: "90%",
              }}
            >
              {detailProduit.titre}
            </p>
            <div
              style={{
                display: "flex",
                padding: "3rem",
                justifyContent: "center",
              }}
            >
              <img
                className="detailProduitImg"
                style={{ border: "5px var(--marronRouge) solid " }}
                src={detailProduit.photo}
                alt={detailProduit.titre}
                width={460}
                height={460}
              />
              <div style={{ padding: "3rem" }}>
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
                <button
                  style={{
                    width: "30rem",
                    height: "3rem",
                    fontSize: "1.5rem",
                    color: "var(--creme)",
                    border: "var(--marronRouge) 3px solid",
                    backgroundColor: "var(--jaune)",
                    type: "submit",
                  }}
                  onClick={() => addPanier(detailProduit)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "3rem" }}>
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
            style={{ border: "5px var(--marronRouge) solid ", width: "13rem" }}
          >
            <img
              src={produit[7]?.photo}
              alt={produit.titre}
              width={160}
              height={160}
            />
            <p>{produit[7]?.titre}</p>
            <p>{produit[7]?.prix}</p>
            <button onClick={() => navigate(`/#/${produit._id}`)}>voir</button>
          </div>
          <div
            style={{ border: "5px var(--marronRouge) solid ", width: "13rem" }}
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
      </div>
    </>
  );
};

export default DetailProduit;
