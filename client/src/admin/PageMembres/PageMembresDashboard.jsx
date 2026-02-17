import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageMembresDashboard = () => {
  const [membres, setMembres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMembres();
  }, []);

  const getAllMembres = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_MEMBRES);
      if (status === 200) setMembres(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMembre = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) return;
    try {
      const response = await axiosinstance.delete(`${URL.DELETE_MEMBRE}/${id}`);
      if (response.status === 200) {
        toast.success("Membre supprimé avec succès");
        getAllMembres();
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  
  const toggleStatus = async (id, currentStatus) => {
    try {
      const { status } = await axiosinstance.put(
        `${URL.UPDATE_MEMBRE}/${id}`,
        { isActive: !currentStatus }
      );
      if (status === 200) {
        toast.success(currentStatus ? "Membre désactivée" : "Membre activée");
        getAllMembres();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur de mise à jour");
    }
  };


  return (
    <div className="container-fluid px-2 px-md-5 py-4" style={{ color: "var(--marronRouge)" }}>
      
      <div className="row mb-5 mt-4">
          <h2 className="dashboardHeader display-6  mb-0 ps-lg-4">Gestion des Membres</h2>
     
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-xl-11">
          
          {/* VERSION TABLEAU (Desktop) */}
          <div className="d-none d-md-block shadow-sm bg-white overflow-hidden" style={{ border: "1px solid #eee" }}>
            <table className="table align-middle mb-0">
              <thead style={{ backgroundColor: "var(--creme)" }}>
                <tr>
                  <th className="py-3 px-4 thTable">Utilisateur</th>
                  <th className="thTable">Email</th>
                  <th className="thTable">Rôle</th>
                  <th className="thTable text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {membres.map((item) => (
                  <tr key={item._id} className="border-bottom">
                    <td className="px-4 py-3 tdTable">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                             style={{ width: "40px", height: "40px", backgroundColor: "var(--jaune)", color: "var(--marronRouge)", fontWeight: "bold" }}>
                          {item.pseudo?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold">{item.prenom} {item.nom}</div>
                          <div className="small text-muted">@{item.pseudo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="tdTable">{item.email}</td>
                    <td className="tdTable">
                      <span className="badge rounded-0 px-2" 
                            style={{ 
                              backgroundColor: item.role === "admin" ? "var(--marronRouge)" : "var(--creme)", 
                              color: item.role === "admin" ? "white" : "var(--marronRouge)",
                              border: "1px solid var(--marronRouge)"
                            }}>
                        {item.role?.toUpperCase()}
                      </span>
                    </td>
                   
                    <td className="tdTable">

                      <div className="d-flex justify-content-center gap-2" >
                         <button
                          onClick={() => toggleStatus(item._id, item.isActive)}
                          className="btn btn-sm btn-outline-secondary"
                          title="Changer statut"
                        >
                          <i
                            className={`bi ${item.isActive ? "bi-toggle-on text-success" : "bi-toggle-off"}`}
                          ></i>
                        </button>
                      
                        <button onClick={() => navigate(`/admin/membredetail/${item._id}`)} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button onClick={() => navigate(`/admin/updatemembre/${item._id}`)} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button onClick={() => deleteMembre(item._id)} className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VERSION CARTES (Mobile) */}
          <div className="d-md-none">
            {membres.map((item) => (
              <div key={item._id} className="card mb-3 border-0 shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-start mb-2" style={{color:"var(--marronRouge)"}}>
                  <h6 className=" mb-0">{item.prenom} {item.nom}</h6>
                  <span className="badge  border small" style={{color:"var(--marronRouge)"}}>{item.role}</span>
                </div>
                <p className="small text-muted mb-3">{item.email}</p>
                  <button onClick={() => toggleStatus(item._id, item.isActive)} className="btn btn-light btn-sm flex-grow-1 me-2 border" style={{color:"var(--marronRouge)"}}>
                      <i className="bi bi-power me-1"></i> Statut
                    </button>
                <div className="d-flex gap-2">
                  <button onClick={() => navigate(`/admin/membredetail/${item._id}`)} className="btn btn-sm flex-grow-1 border" style={{color:"var(--marronRouge)"}}>Voir</button>
                  <button onClick={() => navigate(`/admin/updatemembre/${item._id}`)} className="btn btn-sm flex-grow-1 border" style={{color:"var(--marronRouge)"}}>Modif</button>
                  <button onClick={() => deleteMembre(item._id)} className="btn btn-sm btn-outline-danger px-3"><i className="bi bi-trash"></i></button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageMembresDashboard;