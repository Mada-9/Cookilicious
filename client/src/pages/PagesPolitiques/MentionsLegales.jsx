
const Mentionslegales = () => {
  const styles = {
    textSection: {
      marginTop: "3rem",
      marginBottom: "2rem",
    },
  };
  return (
    <div className="row p-5">
      <h1>Mentions légales</h1>
      <div style={{  textAlign: "justify" }}>
        <h2 style={styles.textSection}>1. Propriété intellectuelle</h2>
        <p>
          Tout le contenu de ce site – textes, images, photos de cookies, logos,
          vidéos et créations graphiques – est la propriété exclusive de
          Cookilicious ou de ses partenaires. La reproduction ou l’utilisation
          de tout ou partie de ce contenu sans autorisation écrite est
          interdite.
        </p>
        <h2 style={styles.textSection}>2. Données personnelles</h2>
        <p>
          Lorsque vous passez commande ou vous inscrivez à notre newsletter,
          nous collectons vos informations personnelles (nom, prénom, adresse
          email, adresse de livraison, etc.). Ces données sont utilisées
          uniquement pour traiter vos commandes, améliorer nos services et vous
          informer de nos nouveautés. Conformément au RGPD, vous pouvez demander
          l’accès, la modification, la suppression ou la portabilité de vos
          données en nous contactant à contact@cookilicious.com.
        </p>
        <h2 style={styles.textSection}>3. Cookies</h2>
        <p>
          Pour rendre votre expérience gourmande encore plus agréable, ce site
          utilise des cookies pour : <br /> Analyser l’audience et améliorer le
          site <br /> Faciliter la navigation et la gestion du panier. Vous
          pouvez configurer votre navigateur pour refuser certains ou tous les
          cookies, mais certaines fonctionnalités du site pourraient être
          limitées.
        </p>
        <h2 style={styles.textSection}>4. Commandes et responsabilité</h2>
        <p>
          Nous faisons tout notre possible pour que vos cookies arrivent chauds
          et délicieux, maisCookilicious ne peut être tenu responsable : <br />
          des interruptions temporaires du site, <br />
          des erreurs lors de la saisie des commandes,
          <br />
          des dommages liés à l’utilisation du site ou à la livraison par
          transporteur.
        </p>
        <h2 style={styles.textSection}>5. Liens externes</h2>
        <p>
          Ce site peut contenir des liens vers d’autres sites. Nous ne sommes
          pas responsables de leur contenu ou de leur politique de
          confidentialité.
        </p>
        <h2 style={styles.textSection}>6. Loi applicable et juridiction</h2>
        <p>
          Ces mentions légales sont régies par la loi française. En cas de
          litige, les tribunaux compétents sont ceux du ressort du siège social
          de l’entreprise.
        </p>
      </div>
    </div>
  );
};

export default Mentionslegales;
