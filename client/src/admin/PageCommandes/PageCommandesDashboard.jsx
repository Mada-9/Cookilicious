import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageCommandesDashboard = () => {
  const [commande, setCommande] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCommandes();
  }, []);

  const getAllCommandes = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_COMMANDES);
      if (status === 200) setCommande(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCommande = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) return;
    try {
      const { status } = await axiosinstance.delete(URL.DELETE_COMMANDE + "/" + id);
      if (status === 200) {
        toast.success("Commande supprimée avec succès");
        getAllCommandes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-fluid px-2 px-md-5 py-4">
      <div className="dashboardHeader text-center mb-5">
        <h2 className="fw-bold">Gestion des Commandes</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-xl-11">
          
          {/* --- 1. VERSION DESKTOP : TABLEAU --- */}
          <div className="d-none d-md-block shadow-sm rounded bg-white overflow-hidden">
            <table className="table align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 thTable">#</th>
                  <th className="thTable">ID Commande</th>
                  <th className="thTable">Articles</th>
                  <th className="thTable">Total</th>
                  <th className="thTable">Statut</th>
                  <th className="thTable">Paiement</th>
                  <th className="text-center thTable">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commande.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 tdTable fw-bold text-muted">{index + 1}</td>
                    <td className="tdTable small">{item._id.substring(0, 8)}...</td>
                    <td className="tdTable">
                      <div className="text-truncate" style={{ maxWidth: "200px" }}>
                        {item.item}
                      </div>
                    </td>
                    <td className="tdTable fw-bold text-marron">{item.prixTotal} €</td>
                    <td className="tdTable">
                      <span className="badge bg-info text-dark" style={{fontSize: "10px"}}>
                        {item.statut}
                      </span>
                    </td>
                    <td className="tdTable small">{item.paiement}</td>
                    <td className="tdTable">
                      <div className="d-flex justify-content-center gap-2">

                        <button onClick={() => navigate(`/admin/commandedetail/${item._id}`)} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button onClick={() => navigate(`/admin/updatecommande/${item._id}`)} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button onClick={() => deleteCommande(item._id)} className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- 2. VERSION MOBILE : CARTES --- */}
          <div className="d-md-none">
            {commande.map((item, index) => (
              <div key={item._id} className="card mb-3 border-0 shadow-sm rounded-4">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">Commande #{index}</span>
                    <span className="badge bg-primary text-dark">{item.statut}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="small text-muted mb-1">ID: {item._id}</p>
                    <p className="mb-1"><strong>Articles:</strong> {item.item}</p>
                    <p className="mb-0"><strong>Total:</strong> <span className="text-marron fw-bold">{item.prixTotal} €</span></p>
                  </div>

                  <div className="d-flex justify-content-between border-top pt-3 gap-2">
                    <button onClick={() => navigate(`/admin/commandedetail/${item._id}`)} className="btn btn-light btn-sm flex-grow-1 border">
                      <i className="bi bi-eye me-1"></i> Détails
                    </button>
                    <button onClick={() => navigate(`/admin/updatecommande/${item._id}`)} className="btn btn-light btn-sm flex-grow-1 border">
                      <i className="bi bi-pencil me-1"></i> Modif
                    </button>
                    <button onClick={() => deleteCommande(item._id)} className="btn btn-outline-danger btn-sm px-3">
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

export default PageCommandesDashboard;