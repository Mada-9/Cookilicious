import React from "react";
import { useCart } from "react-use-cart";

import "./panier.css"; // CSS spécifique

const Pagepanier = () => {
  const {
    
    isEmpty,
    totalItems,
    totalUniqueItems,
    items,
    inCart,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    
  } = useCart();

  return(
   <div>

    <h1>Panier</h1>
    {!isEmpty ?
     <p>le panier est vide</p>: 
    
    <p>Total des articles {totalUniqueItems}, total {totalItems}</p>
    }
    </div>)
};

export default Pagepanier;
