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
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;
    try {
      const { status } = await axiosinstance.delete(URL.DELETE_CONTACT + "/" + id);
      if (status === 200) {
        toast.success("Message supprimé avec succès");
        getMessage();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-fluid px-2 px-md-5 py-4">
      <div className="dashboardHeader text-center mb-5 ps-lg-4">
        <h2 >Messages reçus</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-xl-11">
          
          {/* --- 1. VERSION DESKTOP : TABLEAU --- */}
          <div className="d-none d-md-block shadow-sm rounded bg-white overflow-hidden">
            <table className="table align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 thTable">ID</th>
                  <th className="thTable">Email</th>
                  <th className="thTable">Message</th>
                  <th className="text-center thTable">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 tdTable">
                      <span className="badge  border small" style={{color:"var(--marronRouge)"}}>
                        {item._id.substring(0, 8)}...
                      </span>
                    </td>
                    <td className="tdTable fw-bold">{item.email}</td>
                    <td className="tdTable text-muted small" style={{ maxWidth: "400px" }}>
                      <div className="text-truncate">{item.message}</div>
                    </td>
                    <td className="tdTable">
                      <div className="d-flex justify-content-center">
                        <button 
                          onClick={() => deleteMessage(item._id)} 
                          className="btn btn-sm"
                          style={{ 
                            color: "var(--marronRouge)", 
                            border: "2px solid var(--marronRouge)",
                            width: "3rem",
                            height: "3rem"
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- 2. VERSION MOBILE : CARTES  --- */}
          <div className="d-md-none">
            {formData.map((item) => (
              <div key={item._id} className="card mb-3 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-3" style={{color:"var(--marronRouge)"}}>
                  <div className="mb-2 d-flex justify-content-between align-items-start" >
                    <span className="badge  border mb-2" style={{fontSize: "10px",color:"var(--marronRouge)"}}>
                      ID: {item._id.substring(0, 8)}...
                    </span>
                    <button 
                      onClick={() => deleteMessage(item._id)} 
                      className="btn btn-sm text-danger border-0 p-0"
                    >
                      <i className="bi bi-trash fs-5"></i>
                    </button>
                  </div>
                  
                  <h6 className=" mb-1">{item.email}</h6>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.4" }}>
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageContactDashboard;