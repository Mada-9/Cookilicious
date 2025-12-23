import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const CommandeDetail = () => {
  const { id } = useParams();
  const [detailCommande, setDetailCommande] = useState(null);

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

      if (status === 200) {
        setDetailCommande(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Vérifie que la commande est chargée
  if (!detailCommande) {
    return <p>Chargement de la commande...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Commande n°{detailCommande._id}</h2>
      <br />
      <p>Nom: {detailCommande.user?.nom}</p>
      <p>Prenom: {detailCommande.user?.prenom}</p>
      <p>Email: {detailCommande.user?.email}</p>
      <hr />

      <h2>Detail de la commande</h2>
      <br />
      {detailCommande.items?.map((item) => (
        <div key={item.produit._id} style={{ marginBottom: "1rem" }}>
          <h3> {item.produit.titre}</h3>
          <p>Quantité: {item.quantity}</p>
          <p>Prix unitaire: {item.prixUnitaire} €</p>
          <hr />
        </div>
      ))}

      <p>Prix total: {detailCommande.prixTotal} €</p>
      <p>Status: {detailCommande.statut}</p>
      <p>Paiement: {detailCommande.paiement}</p>

      <button style={{ marginTop: "2rem" }}>
        <Link to="/admin/commandes">Retour aux commandes</Link>
      </button>
    </div>
  );
};

export default CommandeDetail;
