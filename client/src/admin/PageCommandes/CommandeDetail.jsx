import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const CommandeDetail = () => {
  const { id } = useParams();
  const [detailCommande, setDetailCommande] = useState(null);

  useEffect(() => {
    if (id) getCommande(id);
  }, [id]);

  const getCommande = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(`${URL.GET_DETAIL_COMMANDE}/${id}`);
      if (status === 200) setDetailCommande(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!detailCommande) return <p className="text-center mt-5">Chargement de la commande...</p>;

  return (
  <div className="container-fluid py-4 py-md-5" style={{ color: "var(--marronRouge)", maxWidth: "1000px" }}>
    
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-5 border-bottom border-3 pb-3 gap-3" 
         style={{ borderColor: "var(--marronRouge)" }}>
      <div>
        <h2 className="dashboardHeader mb-0" style={{ marginLeft:"0"}}>Suivi Commande</h2>
        <p className="mb-0 opacity-75 fw-bold small text-break">Réf : {detailCommande._id}</p>
      </div>
    </div>

    <div className="row g-4 g-md-5">

      <div className="col-12 col-md-5">
        <section className="mb-4 mb-md-5">
          <h3 className="h6 fw-bold mb-3" style={{ backgroundColor: "var(--jaune)", display: "inline-block", padding: "2px 12px" }}>L'ACHETEUR</h3>
          <div className="ps-2">
            <p className="mb-1 fw-bold">{detailCommande.user?.nom} {detailCommande.user?.prenom}</p>
            <p className="mb-0 text-muted small text-break">{detailCommande.user?.email}</p>
          </div>
        </section>

        <section>
          <h3 className="h6 fw-bold mb-3" style={{ backgroundColor: "var(--jaune)", display: "inline-block", padding: "2px 12px" }}>LIVRAISON</h3>
          <div className="ps-2 small" style={{ lineHeight: "1.6" }}>
            <p className="mb-0">{detailCommande.adresse_livraison?.adresse}</p>
            {detailCommande.adresse_livraison?.complementAddresse && <p className="mb-0">{detailCommande.adresse_livraison.complementAddresse}</p>}
            <p className="mb-0">{detailCommande.adresse_livraison?.codePostal} {detailCommande.adresse_livraison?.ville}</p>
            <p className="mb-0 text-uppercase fw-bold">{detailCommande.adresse_livraison?.pays}</p>
          </div>
        </section>
      </div>

      <div className="col-12 col-md-7">
        <h3 className="h6 fw-bold mb-4">ARTICLES</h3>
        
        <div className="border-top border-bottom border-2 py-3 mb-4" style={{ borderColor: "var(--marronRouge)" }}>
          {detailCommande.items?.map((item, index) => (
            <div key={index} className="d-flex align-items-center mb-3">
              <img
                src={item.image}
                alt={item.nom}
                style={{ width: "60px", height: "60px", minWidth: "60px", objectFit: "cover", border: "2px solid var(--marronRouge)" }}
              />
              <div className="ms-3 flex-grow-1">
                <h4 className="fw-bold mb-0" style={{ fontSize: "0.9rem" }}>{item.nom}</h4>
                <p className="mb-0 small opacity-75">Qté : {item.quantite} × {item.prixUnitaire}€</p>
              </div>
              <div className="fw-bold small ms-2">
                {(item.quantite * item.prixUnitaire).toFixed(2)}€
              </div>
            </div>
          ))}
        </div>

        {/* RÉSUMÉ FINAL */}
        <div className="p-3 p-md-4" style={{ backgroundColor: "var(--creme)", border: "1px solid var(--marronRouge)" }}>
          <div className="d-flex justify-content-between mb-2 small">
            <span>STATUT</span>
            <span className="fw-bold text-uppercase">{detailCommande.statut}</span>
          </div>
          <div className="d-flex justify-content-between mb-3 small">
            <span>PAIEMENT</span>
            <span>{detailCommande.paiement}</span>
          </div>
          <div className="d-flex justify-content-between pt-3 border-top border-2" style={{ borderColor: "var(--marronRouge)" }}>
            <span className="h5 fw-bold mb-0">TOTAL</span>
            <span className="h5 fw-bold mb-0">{detailCommande.prixTotal} €</span>
          </div>
        </div>
      </div>
    </div>
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

  );
};

export default CommandeDetail;