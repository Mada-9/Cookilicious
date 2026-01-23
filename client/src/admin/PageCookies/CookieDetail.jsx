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
            <h2 className="dashboardHeader">{detailCookie.titre}</h2>
            <div
              style={{
                padding: "2rem",
                justifyContent: "center",
              }}
            >
              <img
                className="detailProduitImg"
                style={{
                  justifySelf: "center",
                  margin: "0",
                }}
                src={detailCookie.photo}
                alt={detailCookie.titre}
                width={300}
                height={300}
              />
              <div
                style={{
                  padding: "2rem",
                  borderTop: "5px var(--marronRouge) solid ",
                  margin: "5rem",
                }}
              >
                <p>
                  <span style={{ fontStyle: "italic", textDecoration:"underLine" }}>
                    Description
                  </span> : <br /> {detailCookie.description}
                </p>
                <p>
                  <span style={{ fontStyle: "italic", textDecoration:"underLine" }}>Ingrédients</span> :
                  <br /> {detailCookie.ingredients}
                </p>
                <p>
                  <span style={{ fontStyle: "italic", textDecoration:"underLine" }}>Prix</span> :<br />{" "}
                  {detailCookie.prix}€
                </p>
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
          <Link to="/admin/cookies">Retour aux cookies</Link>
        </button>
      </div>
    </>
  );
};

export default CookieDetail;
