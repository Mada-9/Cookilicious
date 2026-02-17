import { useEffect, useState } from "react";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateMembre = () => {
  const [membre, setMembre] = useState({
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    role: "",
  });

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getMembre(id);
    }
  }, [id]);

  const getMembre = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_MEMBRE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setMembre(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setMembre((prevMembre) => ({ ...prevMembre, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await axiosinstance.put(
        `${URL.UPDATE_MEMBRE}/${id}`,
        membre
      );
      if (status === 200) {
        setMembre(data);
        toast.success("User updated");
        navigate("/admin/membres");
      }
      console.log("User updated !");
    } catch (error) {
      console.log(error.message);
      toast.error("User not updated!");
    }
  };

  return (
    <>
      <h2 className="dashboardHeader ps-lg-4">Update Membre</h2>

      <div
        className="col-8"
        style={{
          border: "2px var(--marronRouge) solid",
          justifySelf: "center",
          alignSelf: "center",
          margin: "2rem",
          padding: "1rem",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            flexDirection: "column",
            display: "flex",
            justifyItems: "center",
          }}
        >
          <label htmlFor="nom" className="my-3">
            Nom :{" "}
          </label>
          <input
            id="nom"
            type="text"
            name="nom"
            value={membre.nom}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="prenom" className="my-3">
            Prenom :{" "}
          </label>
          <input
            id="prenom"
            type="text"
            name="prenom"
            value={membre.prenom}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="pseudo" className="my-3">
            pseudo :
          </label>
          <input
            id="pseudo"
            type="text"
            name="pseudo"
            value={membre.pseudo}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="email" className="my-3">
            Email :{" "}
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={membre.email}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="role" className="my-3">
            Role :{" "}
          </label>

          <select
            id="role"
            name="role"
            onChange={handleChange}
            style={{ color: "var(--marronRouge)" }}
          >
            <option value="">{membre.role}</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

           <button 
             className="btn my-5 btn-lg px-5 rounded-pill
           fw-bold"
          style={{
            color: "var(--creme)",
            backgroundColor: "var(--marronRouge",
            border: "1px solid var(--marronRouge",
          }}
        >
            Update
          </button>
        </form>
        <div className="text-center mt-5 mb-5">
        <button
          className="btn  btn-lg px-5 rounded-pill
           fw-bold"
          style={{
            backgroundColor: "var(--creme)",
            color: "var(--marronRouge",
            border: "1px solid var(--marronRouge",
          }}
        >
          <Link to="/admin/membres">Retour aux membres</Link>
        </button>
      </div>
      </div>
    </>
  );
};

export default UpdateMembre;
