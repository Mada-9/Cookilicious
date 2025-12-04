const PagePaiement = () => {
  return (
    <div>
      <h1>Paiement</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item  px-3">
            <a href="/panier" style={{ width: "4rem" }}>
              Panier
            </a>
          </li>

          <li className="breadcrumb-item" aria-current="page">
            Paiement
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PagePaiement;
