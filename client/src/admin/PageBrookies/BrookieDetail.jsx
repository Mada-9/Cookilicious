import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const BrookieDetail = () => {
  const params = useParams();
  const { id } = params;
  const [detailBrookie, setDetailBrookie] = useState([]);

  useEffect(() => {
    if (id) {
      getBrookie(id);
    }
  }, [id]);

  const getBrookie = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_BROOKIE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setDetailBrookie(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
      {!detailBrookie ? (
        <p>Chargement</p>
      ) : (
        <div>
          <div key={detailBrookie._id}>
            <h2 className="dashboardHeader">{detailBrookie.titre}</h2>
            <div
              style={{
                padding: "2rem",
                justifyContent: "center",
              }}
            >
              <img
                className="detailProduitImg"
                style={{justifySelf:"center", margin:"0" }}
                src={detailBrookie.photo}
                alt={detailBrookie.titre}
                width={300}
                height={300}
              />
              <div style={{ padding: "2rem", borderTop: "5px var(--marronRouge) solid ", margin:"5rem" }}>
                <p> <span style={{fontStyle:"italic", textDecoration:"underLine"}}>Description</span> : <br />  {detailBrookie.description}</p>
                <p><span style={{fontStyle:"italic", textDecoration:"underLine"}}>Ingrédients</span> : <br /> {detailBrookie.ingredients}</p>
                <p><span style={{fontStyle:"italic", textDecoration:"underLine"}}>Prix</span> :<br /> {detailBrookie.prix}€</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mt-5 mb-5">
        <button
          className="btn btn-dark btn-lg px-5 rounded-pill
           fw-bold"
          style={{
            backgroundColor: "var(--creme)",
            color: "var(--marronRouge",
            border: "1px solid var(--marronRouge",
          }}
        >
          <Link to="/admin/brookies">Retour aux brookies</Link>
        </button>
      </div>
    </>
  );
};

export default BrookieDetail;
