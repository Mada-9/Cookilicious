import { useEffect, useState } from "react";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduit = () => {
  const [commande, setCommande] = useState({
    statut: "",
  });

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCommande(id);
    }
  }, [id]);

  const getCommande = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_COMMANDE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setCommande(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setCommande((prevCommande) => ({ ...prevCommande, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await axiosinstance.put(
        `${URL.UPDATE_COMMANDE}/${id}`,
        commande
      );
      if (status === 200) {
        setCommande(data);
        toast.success("Commande updated!");
        navigate("/admin/commandes");
      }
      console.log("Commande updated !");
    } catch (error) {
      console.log(error.message);
      toast.error("Commande not updated!");
    }
  };

  return (
    <>
      <h2 className="dashboardHeader">Update Commande</h2>

      <div
        className="col-8"
        style={{
          border: "4px black solid",
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
          <label htmlFor="statut" className="form-label my-3">
            Statut de la commande :{" "}
          </label>

          <select
            name="statut"
            className="form-control"
            required
            onChange={handleChange}
            style={{ color: "var(--marronRouge)" }}
          >
            <option value="">{commande.statut}</option>
            <option value="en_attente">En attente</option>
            <option value="payee">Payée</option>
            <option value="expediee">Expediée</option>
            <option value="livree">Livrée</option>
            <option value="annulee">Annulee</option>
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
          <Link to="/admin/commandes">Retour aux commandes</Link>
        </button>
      </div>
      </div>
    </>
  );
};

export default UpdateProduit;
