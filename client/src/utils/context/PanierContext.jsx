import  { createContext, useState, useEffect } from "react";
import { debounce } from "lodash";
import { toast } from "react-toastify";


export const PanierContext = createContext(); // l'exportation du context

export const PanierProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  // initialise l'état de chargement à false

  const [panier, setPanier] = useState([]);
  // état représentant le tableau du panier (liste des articles)

  const [totalPrice, setTotalPrice] = useState(0);
  // état du prix total, initialisé à 0 (sera mis à jour selon le contenu du panier)

  useEffect(() => {
    const loadPanier = async () => {
      // fonction chargée de récupérer le panier depuis le localStorage

      try {
        const panierJSON = await localStorage.getItem("panier");
        // récupère la valeur associée à la clé "panier" dans le localStorage (au format JSON)

        if (panierJSON !== null) {
          // si un panier existe dans le localStorage

          const panierStorage = JSON.parse(panierJSON);
          // convertit la chaîne JSON en tableau JavaScript

          setPanier(panierStorage);
          // met à jour l'état du panier
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    loadPanier();
  }, []);

  useEffect(() => {
    let total = 0;
    // variable interne servant à calculer le total, initialisée à 0

    panier.forEach((item) => (total += item.quantite * item.prix));
    // additionne le prix total de chaque article (quantité × prix unitaire)

    setTotalPrice(parseFloat(total.toFixed(2)));
    // toFixed(2) arrondit à 2 décimales (format prix) et parseFloat enlève les zéros inutiles
  }, [panier]);

  const savePanierTotalLocalStorage = debounce((nouveauPanier) => {
    // debounce retarde l’exécution pour éviter des sauvegardes trop fréquentes
    // nouveauPanier est la nouvelle version du panier à sauvegarder

    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
    // convertit le panier en JSON puis le sauvegarde dans le localStorage
  }, 1000);

  const totalProduit = () => {
    let totalProduit = 0;
    // compteur initialisé à 0

    panier.forEach((item) => (totalProduit += item.quantite));
    // additionne la quantité de chaque article du panier

    return totalProduit;
    // renvoie le nombre total d’articles
  };

  const priceProduitByQuantity = (price, quantity) => {
    // price et quantity sont les valeurs utilisées pour le calcul

    const result = price * quantity;
    return parseFloat(result.toFixed(2));
    // toFixed(2) : arrondi à 2 décimales ; parseFloat : conversion en nombre
  };

  // a refaire
  const incremente = (index) => {
    const nouveauPanier = [...panier];
    nouveauPanier[index].quantite++;
    setPanier(nouveauPanier);
    savePanierTotalLocalStorage(nouveauPanier);
  };

  const decremente = (index) => {
    const nouveauPanier = [...panier];
    if (nouveauPanier[index].quantite > 1) {
      nouveauPanier[index].quantite--;
      setPanier(nouveauPanier);
      savePanierTotalLocalStorage(nouveauPanier);
    }
  };

  const removeProduit = (index) => {
    const nouveauPanier = [...panier];
    nouveauPanier.splice(index, 1);
    setPanier(nouveauPanier);
    savePanierTotalLocalStorage(nouveauPanier);
  };

  const addPanier = async (product) => {
    try {
      const panier = await localStorage.getItem("panier");
      let nouveauPanier = [];

      if (panier !== null) {
        // Si le panier existe déjà dans le storage, on le converti en tableau d objet
        nouveauPanier = JSON.parse(panier);
        // Verifier si l 'article selectionné existe déjà dans le panier
        const produitFinded = nouveauPanier.find(
          (item) => item._id == product._id
        );

        // si l'article existe déjà, on augmente sa quantité de 1
        if (produitFinded) {
          produitFinded.quantite += 1;
                  toast.success("Votre produit a été ajouté au panier!");
          
        } else {
          // sinon on ajoute l article dans le panier
          nouveauPanier.push({ ...product, quantite: 1 });
        }
      } else {
        // sinon on ajoutremoveArticlee l article dans le panier
        nouveauPanier.push({ ...product, quantite: 1 });
      }
      // Enregistre le nouveau panier dans le storage grace a setItem
      savePanierTotalLocalStorage(nouveauPanier);
      setPanier(nouveauPanier);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PanierContext.Provider
      value={{
        incremente,
        decremente,
        addPanier,
        removeProduit,
        priceProduitByQuantity,
        totalProduit,
        panier,
        totalPrice,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};
