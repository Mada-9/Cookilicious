
import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";

import "../PageDashboard/Dashboard.css";

const PageAvisDashboard = () => {
  const [avis, setAvis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllAvis();
  }, []);

  const getAllAvis = async () => {
    const { data, status } = await axiosinstance.get(URL.GET_ALL_AVIS);
    console.log(data);
    try {
      if (status === 200) setAvis(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAvis = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ?")) return;

    try {
      const { status } = await axiosinstance.delete(
        URL.DELETE_AVIS + "/" + id
      );
      if (status === 200) {
        toast.success("Avis supprimé avec succès");
        getAllAvis();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h2>Gestion des avis</h2>
      <div>CRUD avis</div>
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
              <th className="thTable">user</th>
              <th className="thTable">commentaire</th>
              <th className="thTable">date</th>
              <th className="thTable">Photo</th>
           
            </tr>
          </thead>
          <tbody>
            {avis.map((item) => (
              <tr key={item._id}>
                <td className="tdTable">{item._id}</td>
                <td className="tdTable">{item.user}</td>
                <td className="tdTable">{item.commentaire}</td>
                <td className="tdTable">{item.date}</td>
                
                <td className="tdActions">
                  <button
                    onClick={() => navigate(`/admin/avisdetail/${item._id}`)}
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
                    onClick={() => deleteAvis(item._id)}
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



export default PageAvisDashboard