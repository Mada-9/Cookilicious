import { Link } from "react-router-dom";

const PagePaiement = () => {
  return (
    <div style={{marginTop:"4rem",height:"20rem"}}>
      <h1>Paiement</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item  px-3">
            <Link to="/panier" style={{ width: "4rem" }}>
              Panier
            </Link>
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
