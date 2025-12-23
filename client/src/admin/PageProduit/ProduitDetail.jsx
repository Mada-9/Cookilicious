import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const ProduitDetail = () => {
  const params = useParams();
  const { id } = params;
  const [detailProduit, setDetailProduit] = useState([]);

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


  return (
    <>
      {!detailProduit ? (
        <p>Chargement</p>
      ) : (
        <div>
          <div key={detailProduit._id}>
            <h1>{detailProduit.titre}</h1>
            <div
              style={{
                padding: "2rem",
                justifyContent: "center",
              }}
            >
              <img
                className="detailProduitImg"
                style={{ border: "2px var(--marronRouge) solid " }}
                src={detailProduit.photo}
                alt={detailProduit.titre}
                width={300}
                height={300}
              />
              <div style={{ padding: "2rem" }}>
                <p>{detailProduit.description}</p>
                <p>{detailProduit.ingredients}</p>
                <p>{detailProduit.prix}€</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <button style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/admin/produit">Retours aux produits</Link>{" "}
      </button>
    </>
  );
};

export default ProduitDetail;
