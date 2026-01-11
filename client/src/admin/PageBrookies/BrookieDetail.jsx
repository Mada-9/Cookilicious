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
            <h1>{detailBrookie.titre}</h1>
            <div
              style={{
                padding: "2rem",
                justifyContent: "center",
              }}
            >
              <img
                className="detailProduitImg"
                style={{ border: "2px var(--marronRouge) solid " }}
                src={detailBrookie.photo}
                alt={detailBrookie.titre}
                width={300}
                height={300}
              />
              <div style={{ padding: "2rem" }}>
                <p>{detailBrookie.description}</p>
                <p>{detailBrookie.ingredients}</p>
                <p>{detailBrookie.prix}€</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <button style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/admin/brookies">Retour aux brookies</Link>{" "}
      </button>
    </>
  );
};

export default BrookieDetail;
