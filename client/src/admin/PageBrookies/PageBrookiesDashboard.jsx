import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageBrookiesDashboard = () => {
  const [brookie, setBrookie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBrookies();
  }, []);

  const getAllBrookies = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_BROOKIES);
      console.log(data);
      if (status === 200) setBrookie(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBrookie = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ?")) return;

    try {
      const { status } = await axiosinstance.delete(
        URL.DELETE_BROOKIE + "/" + id
      );
      if (status === 200) {
        toast.success("Brookie supprimé avec succès");
        getAllBrookies();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //  Toggle  avec PUT
  const toggleStatus = async (id, currentStatus) => {
    try {
      const { status } = await axiosinstance.put(
        `${URL.UPDATE_BROOKIE}/${id}`,
        { isActive: !currentStatus } // On inverse juste isActive
      );

      if (status === 200) {
        toast.success(currentStatus ? "Brookie désactivé" : "Brookie activé");
        getAllBrookies();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur");
    }
  };

  return (
    <>
      <h2>Gestion des brookies</h2>
      <div>CRUD brookies</div>
      <div
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
              <th className="thTable">Titre</th>
              <th className="thTable">Prix</th>
              <th className="thTable">Description</th>
              <th className="thTable">Photo</th>
              <th className="thTable">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brookie.map((item) => (
              <tr key={item._id}>
                <td className="tdTable">{item._id}</td>
                <td className="tdTable">{item.titre}</td>
                <td className="tdTable">{item.prix}€</td>
                <td className="tdTable">{item.description}</td>
                <td className="tdTable">
                  <img
                    className="img-fluid"
                    src={
                      item.photo ||
                      "https://static.wixstatic.com/media/82955a_99098664b7034f9b876c2b43ac70d615~mv2.jpg/v1/crop/x_71,y_71,w_938,h_938/fill/w_938,h_938,al_c,q_85,enc_avif,quality_auto/Cooies_Puffy2.jpg"
                    }
                    width={200}
                    height={200}
                    alt="images des brokies"
                  />
                </td>

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
                    onClick={() => navigate(`/admin/brookiedetail/${item._id}`)}
                    style={{
                      color: "var(--marronRouge)",
                      border: "2px solid var(--marronRouge)",
                      width: "3rem",
                      height: "3rem",
                    }}
                    className="btn me-2"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    onClick={() => navigate(`/admin/updatebrookie/${item._id}`)}
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
                    onClick={() => deleteBrookie(item._id)}
                    style={{
                      color: "var(--marronRouge)",
                      border: "2px solid var(--marronRouge)",
                      width: "3rem",
                      height: "3rem",
                    }}
                    className="btn"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => navigate("/admin/postbrookie")} className="btnCrud">
        ajouter un nouveau brookie
      </button>
    </>
  );
};

export default PageBrookiesDashboard;
