import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const CookieDetail = () => {
  const params = useParams();
  const { id } = params;
  const [detailCookie, setDetailCookie] = useState([]);

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


  return (
    <>
      {!detailCookie ? (
        <p>Chargement</p>
      ) : (
        <div>
          <div key={detailCookie._id}>
            <h1>{detailCookie.titre}</h1>
            <div
              style={{
                padding: "2rem",
                justifyContent: "center",
              }}
            >
              <img
                className="detailProduitImg"
                style={{ border: "2px var(--marronRouge) solid " }}
                src={detailCookie.photo}
                alt={detailCookie.titre}
                width={300}
                height={300}
              />
              <div style={{ padding: "2rem" }}>
                <p>{detailCookie.description}</p>
                <p>{detailCookie.ingredients}</p>
                <p>{detailCookie.prix}€</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <button style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/admin/cookies">Retour aux cookies</Link>{" "}
      </button>
    </>
  );
};

export default CookieDetail;
