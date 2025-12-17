

import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageMembresDashboard = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const { data, status } = await axiosinstance.get(URL.GET_ALL_PRODUITS);
    console.log(data);
    try {
      if (status === 200) setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ?")) return;

    try {
      const { status } = await axiosinstance.delete(
        URL.DELETE_PRODUIT + "/" + id
      );
      if (status === 200) {
        toast.success("Produit supprimé avec succès");
        getAllUser();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Gestion des user</h1>
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
              <th className="thTable">Titre</th>
              <th className="thTable">Prix</th>
              <th className="thTable">Description</th>
              <th className="thTable">Photo</th>
              <th className="thTable">Actions</th>
            </tr>
          </thead>
          <tbody>
            {produit.map((item) => (
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
                  <button
                    onClick={() => navigate(`/admin/produituser/${item._id}`)}
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
                    onClick={() => navigate(`/admin/updateuser/${item._id}`)}
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
                    onClick={() => deleteUser(item._id)}
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
        onClick={() => navigate("/admin/postproduit")}
        className="btnCrud"
      >
        ajouter un nouveau produit
      </button>
    </>
  );
};

export default PageMembresDashboard ;