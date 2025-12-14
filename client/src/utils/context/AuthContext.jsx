import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// URL
import URL from "../constant/url";
import axiosinstance from "../axios/axiosinstance";

// créeez un context d'authentifiaction
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Etat pour suivre si l'authentification est en cours
  const [isLoading, setIsLoading] = useState(false);

  // Etat pour stocker les informations de l'utilisateur connecté
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
  }, []);

  // Fonction pour gérer l'authentification de l'user
  const login = async (dataForm) => {
    try {
      setIsLoading(true);

      // requete axios
      const { data, status } = await axiosinstance.post(
        URL.AUTH_SIGN,
        dataForm
      );

      if (status === 200) {
        // Sauvegarde les données de l'utilisateur dans le localStorage pour les conserver
        localStorage.setItem("auth", JSON.stringify(data));

        // Met à jour le state avec les données de l'utilisateur connecté
        setUser(data);

        // Redirige l'utilisateur vers la page d'accueil
        navigate(`/`);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      // Désactive l'indicateur de chargement car l'authentification est terminée
      setIsLoading(false);
    }
  };

  // Fonction pour gérer l'inscription
  const register = async (dataForm) => {
    try {
      const { status } = await axiosinstance.post(URL.AUTH_REGISTER, dataForm);
      if (status === 201) toast.success("Produit supprimé avec succès");
      console.log("success register");
      navigate(`/`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      // Récupére les données de l'utilisateur depuis le stockage local.
      const userData = await localStorage.getItem("auth");

      // Met à jour l'état de l'utilisateur avec les données récupérées.
      setUser(userData ? JSON.parse(userData) : null);
    } catch (error) {
      console.log(error);
    } finally {
      // Désactive l'indicateur de chargement car l'authentification est terminée
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUser(null); // Réinitialise l'état de l'utilisateur à null

    localStorage.removeItem("auth"); // Supprime les informations de l'utilisateur du stockage local
    navigate("/");

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, user, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
