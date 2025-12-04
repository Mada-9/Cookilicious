import { Link } from "react-router-dom";


const CGV = () => {
  const styles = {
    textSection: {
      marginTop: "3rem",
      marginBottom: "2rem",
    },
  };
  return (
    <>
      <div className="row p-5">
        <h1 style={{ fontSize: "4.5rem" }}>Conditions Générales de Vente </h1>
        <div style={{  textAlign: "justify" }}>
          <h2 style={styles.textSection}> 1.Préambule</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) s’appliquent à
            toutes les commandes passées sur le site VotreSite.com. En
            commandant, le client déclare avoir lu et accepté l’ensemble des
            dispositions ci-dessous.
          </p>
          <h2 style={styles.textSection}>2. Produits</h2>

          <p>
            Les cookies, brownies et pâtisseries proposés sont fabriqués
            artisanalement. Malgré le soin apporté, de légères variations de
            forme, de texture ou de couleur peuvent apparaître. Les
            photographies ne sont pas contractuelles. Les produits peuvent
            contenir les allergènes suivants : gluten, œufs, lait, fruits à
            coque, soja, arachide.
          </p>

          <h2 style={styles.textSection}>3. Prix</h2>
          <p>
            Les prix sont indiqués en euros (€), toutes taxes comprises. Les
            frais de livraison sont appliqués lors de la validation de commande.
            [Votre Marque] se réserve le droit de modifier ses prix, mais les
            produits sont facturés sur la base du tarif affiché lors de la
            commande.
          </p>

          <h2 style={styles.textSection}>4. Commande</h2>

          <p>
            Le client doit fournir des informations exactes au moment de sa
            commande. L’entreprise peut annuler une commande en cas de suspicion
            de fraude, d'erreur manifeste ou de problème de paiement.
          </p>

          <h2 style={styles.textSection}>5. Paiement</h2>

          <p>
            Le règlement s’effectue via les moyens de paiement sécurisés
            proposés sur le site. La commande n’est validée qu’après réception
            du paiement intégral.
          </p>

          <h2 style={styles.textSection}>6. Livraison</h2>

          <p>
            Les produits sont expédiés à l’adresse renseignée par le client. Les
            délais sont indicatifs et peuvent varier selon les transporteurs.{" "}
            <br />
            En cas de dommage visible sur le colis, le client doit émettre une
            réserve auprès du livreur et contacter l’entreprise sous 24h avec
            photos.
          </p>

          <h2 style={styles.textSection}>7. Droit de rétractation</h2>

          <p>
            Conformément à l’article L221-28 du Code de la consommation, le
            droit de rétractation ne s’applique pas aux produits alimentaires
            périssables. <br />
            Une commande expédiée ne peut donc être ni annulée ni retournée.
          </p>

          <h2 style={styles.textSection}>8. Remboursements</h2>

          <p>
            Un remboursement n'est possible que si : la commande n’a pas encore
            été fabriquée ou expédiée, un défaut avéré est constaté (preuve
            photo nécessaire). Aucun remboursement n’est effectué en cas
            d’erreur d’adresse, absence lors de la livraison, retard
            transporteur ou mauvaise conservation du produit.
          </p>

          <h2 style={styles.textSection}>9. Propriété intellectuelle</h2>

          <p>
            Tous les éléments du site (textes, photos, recettes, logo, charte
            graphique) sont la propriété exclusive de [Votre Marque]. Toute
            reproduction est interdite.
          </p>

          <h2 style={styles.textSection}>10. Données personnelles</h2>

          <p>
            Les données du client sont utilisées uniquement pour la gestion des
            commandes. Conformément au RGPD, le client peut demander l’accès, la
            modification ou la suppression de ses informations à [email].
          </p>

          <h2 style={styles.textSection}>11. Droit applicable</h2>

          <p>
            Les présentes CGV sont soumises au droit français. Tout litige fera
            l’objet d’une tentative de résolution amiable avant une action
            judiciaire.
          </p>
        </div>
        <Link to="/produit"
          style={{ width: "30rem", marginBottom: "1rem", paddingLeft: "2rem" }}
        >
          <i className="bi bi-arrow-left"> Home</i>
        </Link>
      </div>
    </>
  );
};

export default CGV;
