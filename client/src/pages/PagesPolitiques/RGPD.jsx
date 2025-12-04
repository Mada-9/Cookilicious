import React from "react";

const RGPD = () => {
  const styles = {
    textSection: {
      marginTop: "3rem",
      marginBottom: "2rem",
    },
  };
  return (
    <>
      <div className="row p-5">
        <h1>Politique De Confidentialité & RGPD</h1>

        <div style={{ textAlign: "left", textAlign: "justify" }}>
          <h2 style={styles.textSection}>1. Introduction</h2>
          <p>
            La présente Politique de Confidentialité explique comment
            Cookilicious collecte, utilise, protège et traite vos données
            personnelles conformément au Règlement Général sur la Protection des
            Données (RGPD) et à la législation française applicable. En
            utilisant notre site [ Cookilicious.com], vous acceptez les
            pratiques décrites ci-dessous.
          </p>

          <h2 style={styles.textSection}>2. Données collectées</h2>
          <p>
            Nous pouvons collecter différentes catégories de données
            personnelles, notamment : Informations d’identité : nom, prénom
            Coordonnées : adresse email, adresse postale, numéro de téléphone
            Informations de commande : produits achetés, montant, mode de
            paiement Informations techniques : adresse IP, type d'appareil,
            cookies, pages consultées Informations envoyées via le formulaire de
            contact Aucune donnée sensible n’est collectée.
          </p>

          <h2 style={styles.textSection}>3. Finalité de la collecte</h2>

          <p>
            Vos données sont utilisées uniquement pour : Traiter et expédier vos
            commandes Communiquer avec vous concernant une commande ou un
            message Améliorer la navigation et les performances du site Gérer la
            facturation Prévenir les fraudes et respecter les obligations
            légales Nous ne vendons jamais vos données.
          </p>

          <h2 style={styles.textSection}>4. Base légale</h2>

          <p>
            Le traitement de vos données repose sur : L’exécution d’un contrat
            (achat, commande) Votre consentement (newsletter******, cookies non
            essentiels) Notre intérêt légitime (amélioration du service)
            Obligation légale (facturation, comptabilité)
          </p>

          <h2 style={styles.textSection}>5. Conservation des données</h2>
          <p>
            Les données sont conservées pour une durée limitée : Données de
            commande : 6 ans (obligation fiscale) Données client : 3 ans après
            le dernier contact Cookies : 6 mois à 13 mois Données du formulaire
            : 12 mois maximum
          </p>

          <h2 style={styles.textSection}>6. Partage des données</h2>

          <p>
            Vos données peuvent être partagées uniquement avec : Notre service
            de paiement sécurisé (ex : Stripe, PayPal) Notre système
            d’hébergement Nos prestataires techniques (ex : outils anti-spam)
            Aucun partage à des tiers non autorisés.
          </p>

          <h2 style={styles.textSection}>7. Sécurité</h2>

          <p>
            Nous mettons en place : Un protocole HTTPS chiffré Une protection
            serveur renforcée Un accès limité aux données Une surveillance
            continue du site
          </p>

          <h2 style={styles.textSection}>8. Vos droits (RGPD)</h2>
          <p>
            Vous pouvez, à tout moment : Accéder à vos données Les rectifier
            Demander leur suppression (sauf obligations légales) Vous opposer à
            un traitement Demander la portabilité Retirer votre consentement
            (cookies, newsletter) Pour exercer vos droits :
            rgpd@cookilicious.com
          </p>
          <h2 style={styles.textSection}>9. Cookies</h2>
          <p>
            Le site utilise des cookies nécessaires et optionnels. Lors de votre
            première visite, vous pouvez : Tout accepter Tout refuser
            Personnaliser vos choix Plus de détails dans la section « Gestion
            des cookies ».
          </p>
          <h2 style={styles.textSection}>10. Contact</h2>
          <p>
            Pour toute question relative à cette Politique :
            rgpd@cookilicious.com <br />
            Paris
          </p>
        </div>
        <a
          href="/produit"
          style={{ width: "30rem", marginBottom: "1rem", paddingLeft: "2rem" }}
        >
          <i className="bi bi-arrow-left"> Home</i>
        </a>
      </div>
    </>
  );
};

export default RGPD;
