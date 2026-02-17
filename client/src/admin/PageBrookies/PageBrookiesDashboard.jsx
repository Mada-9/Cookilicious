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
      if (status === 200) setBrookie(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBrookie = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce brookie ?"))
      return;
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

  const toggleStatus = async (id, currentStatus) => {
    try {
      const { status } = await axiosinstance.put(
        `${URL.UPDATE_BROOKIE}/${id}`,
        { isActive: !currentStatus }
      );
      if (status === 200) {
        toast.success(currentStatus ? "Brookie désactivé" : "Brookie activé");
        getAllBrookies();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur de mise à jour");
    }
  };

  return (
    <div className="container-fluid px-2 px-md-5 py-4">
      <div
        className="dashboardHeader text-center mb-5 col-12  border-4 ps-lg-4"
        style={{ borderColor: "var(--jaune) !important" }}
      >
        <h2 >Gestion du Catalogue Brookies</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-xl-11">
          {/* ---  VERSION DESKTOP = TABLEAU --- */}
          <div className="d-none d-md-block shadow-sm rounded bg-white overflow-hidden">
            <table className="table align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 thTable">Produit</th>
                  <th className="thTable">Prix</th>
                  <th className="thTable">Description</th>
                  <th className="thTable">Statut</th>
                  <th className="text-center thTable">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brookie.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 tdTable">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.photo || "https://via.placeholder.com/150"}
                          alt={item.titre}
                          className="rounded me-3 shadow-sm"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <span >{item.titre}</span>
                      </div>
                    </td>
                    <td className="tdTable">
                      <span className="badge border" style={{color:"var(--marronRouge)"}}>
                        {item.prix} €
                      </span>
                    </td>
                    <td
                      className="text-muted small tdTable"
                      style={{ maxWidth: "250px" }}
                    >
                      <div className="text-truncate">{item.description}</div>
                    </td>
                    <td className="tdTable">
                      <span
                        className={`badge rounded-pill ${
                          item.isActive ? "bg-success" : "bg-danger"
                        }`}
                        style={{ fontSize: "10px", padding: "0.5em 1em" }}
                      >
                        {item.isActive ? "ACTIF" : "INACTIF"}
                      </span>
                    </td>
                    <td className="tdTable">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() => toggleStatus(item._id, item.isActive)}
                          className="btn btn-sm btn-outline-secondary"
                          title="Changer statut"
                        >
                          <i
                            className={`bi ${
                              item.isActive
                                ? "bi-toggle-on text-success"
                                : "bi-toggle-off"
                            }`}
                          ></i>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/brookiedetail/${item._id}`)
                          }
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/updatebrookie/${item._id}`)
                          }
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => deleteBrookie(item._id)}
                          className="btn btn-sm btn-outline-danger"
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

          {/* ---  VERSION MOBILE = CARTES --- */}
          <div className="d-md-none" style={{color:"var(--marronRouge)"}}>
            {brookie.map((item) => (
              <div
                key={item._id}
                className="card mb-3 border-0 shadow-sm rounded-4 overflow-hidden"
              >
                <div className="card-body p-3" style={{color:"var(--marronRouge)"}}>
                  <div className="d-flex align-items-center mb-3" >
                    <img
                      src={item.photo}
                      alt={item.titre}
                      className="rounded-3 shadow-sm me-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h6 className=" mb-1">{item.titre}</h6>
                      <p className="text-marron mb-0">{item.prix} €</p>
                      <span
                        className={`badge ${
                          item.isActive ? "bg-success" : "bg-danger"
                        }`}
                        style={{ fontSize: "9px" }}
                      >
                        {item.isActive ? "VISIBLE" : "MASQUÉ"}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between border-top pt-3 mt-2" >
                    <button
                      onClick={() => toggleStatus(item._id, item.isActive)}
                      className="btn btn-sm flex-grow-1 me-2 border"style={{color:"var(--marronRouge)"}}
                    >
                      <i className="bi bi-power me-1"></i> Statut
                    </button>{" "}
                    <button
                      onClick={() =>
                        navigate(`/admin/brookiedetail/${item._id}`)
                      }
                      className="btn  btn-sm flex-grow-1 me-2 border" style={{color:"var(--marronRouge)"}}
                    >
                      <i className="bi bi-eye me-1"></i> voir
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/updatebrookie/${item._id}`)
                      }
                      className="btn btn-sm flex-grow-1 me-2 border"style={{color:"var(--marronRouge)"}}
                    >
                      <i className="bi bi-pencil me-1"></i> Modif.
                    </button>
                    <button
                      onClick={() => deleteBrookie(item._id)}
                      className="btn btn-outline-danger btn-sm px-3"style={{color:"var(--marronRouge)"}}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-5 mb-5">
        <button
          className="btn btn-lg px-5 rounded-pill"
          style={{
            backgroundColor: "var(--marronRouge)",
            color: "var(--creme)",
          }}
          onClick={() => navigate("/admin/postbrookie")}
        >
          <i className="bi bi-plus-circle me-2"></i> Ajouter un brookie
        </button>
      </div>
    </div>
  );
};

export default PageBrookiesDashboard;
