import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageAvisDashboard = () => {
  const [avis, setAvis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllAvis();
  }, []);

  const getAllAvis = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_AVIS);
      if (status === 200) setAvis(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAvis = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) return;
    try {
      const { status } = await axiosinstance.delete(URL.DELETE_AVIS + "/" + id);
      if (status === 200) {
        toast.success("Avis supprimé avec succès");
        getAllAvis();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const { status } = await axiosinstance.put(
        `${URL.UPDATE_AVIS}/${id}`,
        { isActive: !currentStatus } 

      );
      if (status === 200) {
        toast.success(currentStatus ? "Avis masqué" : "Avis publié");
        getAllAvis();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur de mise à jour");
    }
  };

  return (
    <div className="container-fluid px-2 px-md-5 py-4">
      <div className="dashboardHeader text-center mb-5">
        <h2 className="fw-bold">Gestion des Avis Clients</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-xl-11">
          
          {/* --- VERSION DESKTOP = TABLEAU --- */}
          <div className="d-none d-md-block shadow-sm rounded bg-white overflow-hidden">
            <table className="table align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 thTable">Utilisateur</th>
                  <th className="thTable">Commentaire</th>
                  <th className="thTable">Date</th>
                  <th className="thTable">Statut</th>
                  <th className="text-center thTable">Actions</th>
                </tr>
              </thead>
              <tbody>
                {avis.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 tdTable">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle  text-white d-flex align-items-center justify-content-center me-3" style={{width: "40px", height: "40px",backgroundColor:"var(--marronRouge)"}}>
                           <i className="bi bi-person" ></i>
                        </div>
                        <span className="fw-bold text-dark">{item.user?._id}</span>
                      </div>
                    </td>
                    <td className="tdTable  small" style={{ maxWidth: "350px" }}>
                      <div className="text-truncate">"{item.commentaire}"</div>
                    </td>
                    <td className="tdTable small">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR') : "Date"}
                    </td>
                    <td className="tdTable">
                      <span 
                        className={`badge rounded-pill ${item.isActive ? "bg-success" : "bg-danger"}`}
                        style={{ fontSize: "10px", padding: "0.5em 1em" }}
                      >
                        {item.isActive ? "PUBLIÉ" : "MASQUÉ"}
                      </span>
                    </td>
                    <td className="tdTable">
                      <div className="d-flex justify-content-center gap-2">
                        <button onClick={() => toggleStatus(item._id, item.isActive)} className="btn btn-sm btn-outline-secondary" title="Changer statut">
                          <i className={`bi ${item.isActive ? "bi-toggle-on text-success" : "bi-toggle-off"}`}></i>
                        </button>
                        <button onClick={() => navigate(`/admin/avisdetail/${item._id}`)} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button onClick={() => deleteAvis(item._id)} className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---  VERSION MOBILE = CARTES --- */}
          <div className="d-md-none">
            {avis.map((item) => (
              <div key={item._id} className="card mb-3 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center me-2" style={{width: "35px", height: "35px"}}>
                            <i className="bi bi-person text-secondary"></i>
                        </div>
                        <div>
                            <small className="text-muted" style={{fontSize: "11px"}}>{new Date(item.date).toLocaleDateString('fr-FR')}</small>
                        </div>
                    </div>
                    <span className={`badge ${item.isActive ? "bg-success" : "bg-danger"}`} style={{fontSize: "9px"}}>
                        {item.isActive ? "PUBLIÉ" : "MASQUÉ"}
                    </span>
                  </div>
                  
                  <p className="text-muted small mb-3 italic">
                    "{item.commentaire}"
                  </p>
                  
                  <div className="d-flex justify-content-between border-top pt-3 mt-2">
                    <button onClick={() => toggleStatus(item._id, item.isActive)} className="btn btn-light btn-sm flex-grow-1 me-2 border">
                      <i className="bi bi-power me-1"></i> {item.isActive ? "Masquer" : "Publier"}
                    </button>
                    <button onClick={() => navigate(`/admin/avisdetail/${item._id}`)} className="btn btn-light btn-sm flex-grow-1 me-2 border">
                      <i className="bi bi-eye me-1"></i> Voir
                    </button>
                    <button onClick={() => deleteAvis(item._id)} className="btn btn-outline-danger btn-sm px-3">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageAvisDashboard;