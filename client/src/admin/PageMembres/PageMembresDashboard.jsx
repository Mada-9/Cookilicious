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
