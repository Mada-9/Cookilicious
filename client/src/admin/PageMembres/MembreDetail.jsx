import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const UserDetail = () => {
  const { id } = useParams();
  const [detailUser, setDetailUser] = useState(null);

  useEffect(() => {
    if (id) getUser(id);
  }, [id]);

  const getUser = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(`${URL.GET_DETAIL_MEMBRE}/${id}`);
      if (status === 200) setDetailUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!detailUser) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container py-5" style={{ color: "var(--marronRouge)" }}>
      
      <div className="row mb-5">
        <div className="col-12 border-4 ps-4" style={{ borderLeft: "2px solid var(--jaune)" }}>
          <h2 className="display-6 fw-bold" style={{ color: "var(--marronRouge)" }}>
            {detailUser.prenom} {detailUser.nom}
          </h2>
          <span className="badge rounded-0" style={{ backgroundColor: "var(--marronRouge)", color: "white" }}>
            COMPTE {detailUser.role}
          </span>
        </div>
      </div>

      <div className="row mt-5" style={{justifyContent:"center"}}>
        <div className="col-md-8">
          
          <div className="py-3 border-bottom d-flex align-items-center justify-content-between">
            <span className="fw-bold small opacity-75">PSEUDO</span>
            <span className="h5 mb-0">{detailUser.pseudo}</span>
          </div>

          <div className="py-3 border-bottom d-flex align-items-center justify-content-between">
            <span className="fw-bold small opacity-75">ADRESSE EMAIL</span>
            <span className="h5 mb-0">{detailUser.email}</span>
          </div>

          <div className="py-3 border-bottom d-flex align-items-center justify-content-between">
            <span className="fw-bold small opacity-75">IDENTIFIANT UNIQUE</span>
            <span className="text-muted font-monospace small">{detailUser._id}</span>
          </div>

          <div className="py-3 border-bottom d-flex align-items-center justify-content-between">
            <span className="fw-bold small opacity-75">STATUT DU COMPTE</span>
            <span className="text-success fw-bold">Actif</span>
          </div>

        </div>
      </div>

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
          <Link to="/admin/membres">Retour aux membres</Link>
        </button>
      </div>
    </div>
  );
};

export default UserDetail;