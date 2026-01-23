import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const AvisDetail = () => {
  const { id } = useParams();
  const [detailAvis, setDetailAvis] = useState(null);

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
      if (status === 200) {
        setDetailAvis(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container py-4">
      {!detailAvis ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <div className="text-center">
          <h2 className="dashboardHeader mb-4">Détail de l'avis</h2>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              padding: "2rem",
              borderBottom: "1px solid #eee"
            }}
          >
            <p className="fw-bold fs-4 mb-0">Pseudo: {detailAvis.user?.pseudo}</p>
            
            <p className=" small">
              Posté le : {detailAvis.createdAt ? new Date(detailAvis.createdAt).toLocaleDateString('fr-FR') : "Date"}
            </p>

            <p style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
              Commentaire: {detailAvis.commentaire}
            </p>

            {detailAvis.image && (
              <img
                className="img-fluid shadow-sm"
                src={detailAvis.image}
                alt="avis client"
                style={{ width: "300px", borderRadius: "8px" }}
              />
            )}
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
          <Link to="/admin/avis">Retour aux avis</Link>
        </button>
      </div>
    </div>
  );
};

export default AvisDetail;