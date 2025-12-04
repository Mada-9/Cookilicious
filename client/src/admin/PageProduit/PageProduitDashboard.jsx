import { useState, useEffect, use } from "react";
import axios from "axios";
import URL from "../../utils/constant/url";

const PageProduitDashboard = () => {
  const [produit, setProduit] = useState([]);

  useEffect(() => {
    getAllProduit();
  }, []);

  const getAllProduit = async () => {
    const { data, status } = await axios.get(URL.GET_ALL_PRODUIT);
    console.log(data);
    try {
      if (status === 200) setProduit(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>CRUD produits</div>
      <h1>Gestion des produits</h1>

      {produit.map((item) => (
        <div key={item._id}>
          <div>{item.titre}</div>


          <img src={item.photo} alt="" width={135} height={135} />
        </div>
      ))}
    </>
  );
};

export default PageProduitDashboard;
