import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageRecetteDashboard = () => {
  const [recette, setRecette] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecettes();
  }, []);

  const getAllRecettes = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_RECETTES);
      if (status === 200) setRecette(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteRecette = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) return;
    try {
      const { status } = await axiosinstance.delete(URL.DELETE_RECETTE + "/" + id);
      if (status === 200) {
        toast.success("Recette supprimée avec succès");
        getAllRecettes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const { status } = await axiosinstance.put(
        `${URL.UPDATE_RECETTE}/${id}`,
        { isActive: !currentStatus }
      );
      if (status === 200) {
        toast.success(currentStatus ? "Recette désactivée" : "Recette activée");
        getAllRecettes();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur de mise à jour");
    }
  };

  return (
    <div className="container-fluid px-2 px-md-5 py-4">
      <div className="dashboardHeader text-center mb-5">
        <h2 className="fw-bold">Gestion des Recettes</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-xl-11">
          
          {/* --- 1. VERSION DESKTOP : TABLEAU --- */}
          <div className="d-none d-md-block shadow-sm rounded bg-white overflow-hidden">
            <table className="table align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 thTable">Recette</th>
                  <th className="thTable">ID</th>
                  <th className="thTable">Description</th>
                  <th className="thTable">Statut</th>
                  <th className="text-center thTable">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recette.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 tdTable">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image }
                          alt={item.titre}
                          className="rounded me-3 shadow-sm"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                        <span className="fw-bold text-dark">{item.titre}</span>
                      </div>
                    </td>
                    <td className="tdTable"><span className="badge bg-light text-dark border small">{item._id.substring(0, 8)}...</span></td>
                    <td className="text-muted small tdTable" style={{ maxWidth: "250px" }}>
                      <div className="text-truncate">{item.description}</div>
                    </td>
                    <td className="tdTable">
                      <span 
                        className={`badge rounded-pill ${item.isActive ? "bg-success" : "bg-danger"}`}
                        style={{ fontSize: "10px", padding: "0.5em 1em" }}
                      >
                        {item.isActive ? "ACTIF" : "INACTIF"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button onClick={() => toggleStatus(item._id, item.isActive)} className="btn btn-sm btn-outline-secondary" title="Changer statut">
                          <i className={`bi ${item.isActive ? "bi-toggle-on text-success" : "bi-toggle-off"}`}></i>
                        </button>
                        <button onClick={() => navigate(`/admin/recettedetail/${item._id}`)} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button onClick={() => navigate(`/admin/updaterecette/${item._id}`)} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button onClick={() => deleteRecette(item._id)} className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- 2. VERSION MOBILE : CARTES  --- */}
          <div className="d-md-none">
            {recette.map((item) => (
              <div key={item._id} className="card mb-3 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={item.image}
                      alt={item.titre}
                      className="rounded-3 shadow-sm me-3"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="fw-bold mb-1">{item.titre}</h6>
                      <p className="text-muted small mb-1">ID: {item._id.substring(0, 8)}...</p>
                      <span className={`badge ${item.isActive ? "bg-success" : "bg-danger"}`} style={{fontSize: "9px"}}>
                        {item.isActive ? "VISIBLE" : "MASQUÉ"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between border-top pt-3 mt-2">
                     <button onClick={() => toggleStatus(item._id, item.isActive)} className="btn btn-light btn-sm flex-grow-1 me-2 border">
                      <i className="bi bi-power me-1"></i> Statut
                    </button><button onClick={() => navigate(`/admin/recettedetail/${item._id}`)} className="btn btn-light btn-sm flex-grow-1 me-2 border">
                      <i className="bi bi-eye me-1"></i> voir
                    </button>
                   
                    <button onClick={() => navigate(`/admin/updaterecette/${item._id}`)} className="btn btn-light btn-sm flex-grow-1 me-2 border">
                      <i className="bi bi-pencil me-1"></i> Modif.
                    </button>
                    <button onClick={() => deleteRecette(item._id)} className="btn btn-outline-danger btn-sm px-3">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="text-center mt-5 mb-5">
        <button
          className="btn btn-lg px-5 rounded-pill  fw-bold"
          style={{ backgroundColor: "var(--marronRouge)", color:"var(--creme)" }}
          onClick={() => navigate("/admin/postrecette")}
        >
          <i className="bi bi-plus-circle me-2"></i> Ajouter une recette
        </button>
      </div>
    </div>
  );
};

export default PageRecetteDashboard;