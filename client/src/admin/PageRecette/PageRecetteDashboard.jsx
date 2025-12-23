import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageProduitDashboard = () => {
  const [recette, setRecette] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecettes();
  }, []);

  const getAllRecettes = async () => {
    const { data, status } = await axiosinstance.get(URL.GET_ALL_RECETTES);
    console.log(data);
    try {
      if (status === 200) setRecette(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteRecette = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ?")) return;

    try {
      const { status } = await axiosinstance.delete(
        URL.DELETE_RECETTE + "/" + id
      );
      if (status === 200) {
        toast.success("Recette supprimé avec succès");
        getAllRecettes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Gestion des recettes</h1>
      <div>CRUD recettes</div>
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
              <th className="thTable">Description</th>
              <th className="thTable">image</th>
              <th className="thTable">actions</th>
            </tr>
          </thead>
          <tbody>
            {recette.map((item) => (
              <tr key={item._id}>
                <td className="tdTable">{item._id}</td>
                <td className="tdTable">{item.titre}</td>
                <td className="tdTable">{item.description}</td>
                <td className="tdTable">
                  <img className="img-fluid"
                    src={item.image || "image"}
                    width={200}
                    height={200}
                    alt="images des cookies"
                  />
                </td>
                <td className="tdActions">
                  <button
                    onClick={() => navigate(`/admin/recettedetail/${item._id}`)}
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
                    onClick={() => navigate(`/admin/updaterecette/${item._id}`)}
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
                    onClick={() => deleteRecette(item._id)}
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

      <button

        onClick={() => navigate("/admin/postrecette")}
        className="btnCrud"
      >
        ajouter une nouvelle recette
      </button>
    </>
  );
};

export default PageProduitDashboard;
