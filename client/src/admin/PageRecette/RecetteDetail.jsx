import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const RecetteDetail = () => {
  const params = useParams();
  const { id } = params;
  const [detailRecette, setDetailRecette] = useState([]);

  useEffect(() => {
    if (id) {
      getRecette(id);
    }
  }, [id]);

  const getRecette = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_RECETTE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setDetailRecette(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //ajout au panier

  return (
    <>
      {!detailRecette ? (
        <p>Chargement</p>
      ) : (
        <div>
          <div key={detailRecette._id}>
            <h1>{detailRecette.titre}</h1>
            <div
              style={{
                padding: "2rem",
                justifyContent: "center",
              }}
            >
              <img
                className="detailProduitImg"
                style={{ border: "2px var(--marronRouge) solid " }}
                src={detailRecette.image}
                alt={detailRecette.titre}
                width={300}
                height={300}
              />
              <div style={{ padding: "2rem" }}>
                <p>{detailRecette.description}</p>
                <br />
                <p>{detailRecette.nbPersonne}</p>
                <br />
                <p>{detailRecette.ingredients}</p>
                <br />

                <p>{detailRecette.preparation}</p>
                <br />
                <p>{detailRecette.astuce}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <button style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/admin/recette">Retour aux recettes</Link>{" "}
      </button>
    </>
  );
};

export default RecetteDetail;
