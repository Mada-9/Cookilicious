import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const AvisDetail = () => {
  const params = useParams();
  const { id } = params;
  const [detailAvis, setDetailAvis] = useState([]);

  useEffect(() => {
    if (id) {
      getAvis(id);
    }
  }, [id]);

  const getAvis = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_AVIS}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setDetailAvis(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!detailAvis ? (
        <p>Chargement</p>
      ) : (
        <div>
          <div key={detailAvis._id}>
            <div
              style={{
                padding: "2rem",
                justifyContent: "center",
              }}
            >
              <p>{detailAvis.user}</p>
              <p>{detailAvis.commentaire}</p>
              <p>{detailAvis.date}</p>
              <img
                className="detailProduitImg"
                style={{ border: "2px var(--marronRouge) solid " }}
                src={detailAvis.image}
                width={200}
                height={100}
              />
            </div>
          </div>
        </div>
      )}
      <button style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/admin/avis">Retours aux avis</Link>{" "}
      </button>
    </>
  );
};

export default AvisDetail;
