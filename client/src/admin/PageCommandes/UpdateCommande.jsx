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
  const navigate = useNavigate;

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
      <div>Update Commande</div>

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

          <button className="my-4" style={{ color: "var(--marronRouge)" }}>
            <button> Update</button>
          </button>
        </form>
        <button style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/admin/commandes">Retour aux commandes</Link>{" "}
        </button>
      </div>
    </>
  );
};

export default UpdateProduit;
