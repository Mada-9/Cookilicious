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


  return (
    <>
      {!detailRecette ? (
        <p>Chargement</p>
      ) : (
        <div>
          <div key={detailRecette._id}>
            <h2  className="dashboardHeader" style={{margin:"2rem"}}>{detailRecette.titre}</h2>
            <div
              style={{
                padding: "2rem",
                justifyContent: "center",
              }}
            >
              <img
                className="detailProduitImg"
                style={{justifySelf:"center", margin:"0" }}
                src={detailRecette.image}
                alt={detailRecette.titre}
                width={300}
                height={300}
              />
               <div style={{ padding: "2rem", borderTop: "5px var(--marronRouge) solid ", margin:"5rem" }}>
                <p> <span style={{fontStyle:"italic", textDecoration:"underLine"}}>Description</span> : <br />   {detailRecette.description}</p>
                <p><span style={{fontStyle:"italic", textDecoration:"underLine"}}>Nombre de personnes</span> : <br /> {detailRecette.nbPersonne}</p>
                <p><span style={{fontStyle:"italic", textDecoration:"underLine"}}>Ingrédients</span> :<br /> {detailRecette.ingredients}</p>
                <p><span style={{fontStyle:"italic", textDecoration:"underLine"}}>Preparation</span> :<br />{detailRecette.preparation}</p>              
                <p><span style={{fontStyle:"italic", textDecoration:"underLine"}}>Astuce</span> : <br /> {detailRecette.astuce}</p>


              </div>
            </div>
          </div>
        </div>
      )}
              <div className="text-center mt-5 mb-5">
        <button
          className="btn  btn-lg px-5 rounded-pill
           fw-bold"
          style={{
            backgroundColor: "var(--creme)",
            color: "var(--marronRouge",
            border: "1px solid var(--marronRouge",
          }}
        >
          <Link to="/admin/recette">Retour aux recettes</Link>
        </button>
      </div>
    </>
  );
};

export default RecetteDetail;
