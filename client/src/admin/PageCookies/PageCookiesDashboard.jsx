import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageCookiesDashboard = () => {
  const [cookie, setCookie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCookies();
  }, []);

  const getAllCookies = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_COOKIES);
      console.log(data);
      if (status === 200) setCookie(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCookie = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ?")) return;

    try {
      const { status } = await axiosinstance.delete(
        URL.DELETE_COOKIE + "/" + id
      );
      if (status === 200) {
        toast.success("Cookie supprimé avec succès");
        getAllCookies();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //  Toggle  avec PUT
  const toggleStatus = async (id, currentStatus) => {
    try {
      const { status } = await axiosinstance.put(
        `${URL.UPDATE_COOKIE}/${id}`,
        { isActive: !currentStatus } // On inverse juste isActive
      );

      if (status === 200) {
        toast.success(currentStatus ? "Cookie désactivé" : "Cookie activé");
        getAllCookies();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur");
    }
  };

  return (
    <>
      <h2>Gestion des cookies</h2>
      <div>CRUD cookies</div>
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
            {cookie.map((item) => (
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
                    alt="images des cookies"
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
                    onClick={() => navigate(`/admin/cookiedetail/${item._id}`)}
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
                    onClick={() => navigate(`/admin/updatecookie/${item._id}`)}
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
                    onClick={() => deleteCookie(item._id)}
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

      <button onClick={() => navigate("/admin/postcookie")} className="btnCrud">
        ajouter un nouveau cookie
      </button>
    </>
  );
};

export default PageCookiesDashboard;
