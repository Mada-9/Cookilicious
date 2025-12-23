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
    const { data, status } = await axiosinstance.get(URL.GET_ALL_COMMANDES);
    try {
      if (status === 200) setCommande(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCommande = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ?")) return;

    try {
      const { status } = await axiosinstance.delete(
        URL.DELETE_COMMANDE + "/" + id, 
      );
      if (status === 200) {
        toast.success("Commande supprimé avec succès");
        getAllCommandes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Gestion des Commandes</h1>
      <div>CRUD commandes</div>
      <div
        className=""
        style={{
          justifySelf: "center",
          alignSelf: "center",
          margin: "2rem",
          padding: "1rem",
        }}
      >
        <table className="table wx-auto">
          <thead className="thead">
            <tr>
              <th className="thTable">Commande</th>
              <th className="thTable">ID</th>
              <th className="thTable">Item</th>
              <th className="thTable">prix Total</th>
              <th className="thTable">statut</th>
              <th className="thTable">Paiement</th>
              <th className="thTable">Actions</th>
            </tr>
          </thead>
          <tbody>
            {commande.map((item, index) => (
              <tr key={item._id}>
                <td className="tdTable">{index}</td>
                <td className="tdTable">{item._id}</td>
                <td className="tdTable">{item.item}</td>
                <td className="tdTable">{item.prixTotal}</td>
                <td className="tdTable">{item.statut}</td>
                <td className="tdTable">{item.paiement}</td>

                <td className="tdActions">
                  <button
                    onClick={() =>
                      navigate(`/admin/commandedetail/${item._id}`)
                    }
                    style={{
                      color: "var(--marronRouge)",
                      border: "2px solid var(--marronRouge)",
                      width: "3rem",
                      height: "3rem",
                    }}
                    className="btn  me-2"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/updatecommande/${item._id}`)
                    }
                    style={{
                      color: "var(--marronRouge)",
                      border: "2px solid var(--marronRouge)",
                      width: "3rem",
                      height: "3rem",
                    }}
                    className="btn me-2"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    onClick={() => deleteCommande(item._id)}
                    style={{
                      color: "var(--marronRouge)",
                      border: "2px solid var(--marronRouge)",
                      width: "3rem",
                      height: "3rem",
                    }}
                    className="btn "
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>
  );
};

export default PageCommandesDashboard;
