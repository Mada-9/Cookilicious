import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageMembresDashboard = () => {
  const [membre, setMembre] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMembres();
  }, []);

  const getAllMembres = async () => {
    const { data, status } = await axiosinstance.get(URL.GET_ALL_MEMBRES);
    console.log(data);
    try {
      if (status === 200) setMembre(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMembre = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ?")) return;

    try {
      const response = await axiosinstance.delete(`${URL.DELETE_MEMBRE}/${id}`);

      if (response.status === 200) {
        toast.success("Produit supprimé avec succès");
        getAllMembre();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
//  Toggle  avec PUT
  const toggleStatus = async (id, currentStatus) => {
    try {
      const { status } = await axiosinstance.put(
        `${URL.UPDATE_RECETTE}/${id}`,
        { isActive: !currentStatus } // On inverse juste isActive
      );

      if (status === 200) {
        toast.success(currentStatus ? "Recette désactivé" : "Recette activé");
        getAllRecette();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur");
    }
  };


  return (
    <>
      <h1>Gestion des membres</h1>
      <div>CRUD user</div>
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
              <th className="thTable">ID</th>
              <th className="thTable">Nom</th>
              <th className="thTable">Prénom</th>
              <th className="thTable">Pseudo</th>
              <th className="thTable">Email</th>
              <th className="thTable">Action</th>
            </tr>
          </thead>
          <tbody>
            {membre.map((item) => (
              <tr key={item._id}>
                <td className="tdTable">{item._id}</td>
                <td className="tdTable">{item.nom}</td>
                <td className="tdTable">{item.prenom}</td>
                <td className="tdTable">{item.pseudo}</td>
                <td className="tdTable">{item.email}</td>

                <td className="tdActions">
                   <span
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      backgroundColor: item.isActive ? "#28a745" : "#dc3545",
                      color: "white",
                    }}
                  >
                    {item.isActive ? "Actif" : "Désactivé"}
                  </span>

                  <button
                    onClick={() => toggleStatus(item._id, item.isActive)}
                    style={{
                      color: "var(--marronRouge)",
                      border: "2px solid var(--marronRouge)",
                      marginTop: "0.5rem",
                      padding: "0.3rem 0.8rem",
                      fontSize: "12px",
                    }}
                    className="btn"
                  >
                    {item.isActive ? "Désactiver" : "Activer"}
                  </button>
                  <button
                    onClick={() => navigate(`/admin/membredetail/${item._id}`)}
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
                    onClick={() => navigate(`/admin/updatemembre/${item._id}`)}
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
                    onClick={() => deleteMembre(item._id)}
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
        <button onClick={() => navigate("/admin/postuser")} className="btnCrud">
          ajouter un nouveau user
        </button>
      </div>
    </>
  );
};

export default PageMembresDashboard;
