import { useState, useEffect } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { toast } from "react-toastify";

import URL from "../../utils/constant/url";
import "../PageDashboard/Dashboard.css";

const PageContactDashboard = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    getMessage();
  }, []);

  const getMessage = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_CONTACT);
      if (status === 200) {
        setFormData(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ?")) return;

    try {
      const { status } = await axiosinstance.delete(
        URL.DELETE_CONTACT + "/" + id
      );

      if (status === 200) {
        toast.success("Message supprimé avec succès");
        getMessage();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 >Page Contact</h1>

      <h2>Messages récupérés</h2>
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
              <th className="thTable">Email</th>
              <th className="thTable">Message</th>
              <th className="thTable">actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((item) => (
              <tr key={item._id}>
                <td className="tdTable">{item._id}</td>
                <td className="tdTable">{item.email}</td>
                <td className="tdTable">{item.message}</td>
                <td className="tdTable" >
                  <button
                    onClick={() => deleteMessage(item._id)}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                   <button
                    onClick={() => deleteMessage(item._id)}
                    className="btn btn-warning"
                  >
                    voir message
                  </button>
                  <input
                    type="checkbox"
                    id="check"
                    name="check"
                    value="check"
                    style={{ backgroundColor: "black" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PageContactDashboard;
