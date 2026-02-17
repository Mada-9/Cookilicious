import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosinstance from "../utils/axios/axiosinstance";
import { toast } from "react-toastify";
import URL from "../utils/constant/url";

const VerifyEmail = () => {
  const { token } = useParams(); // Récupère le token depuis l'URL
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      // vérifie le token
      const { status } = await axiosinstance.get(
        `${URL.AUTH_VERIFY_EMAIL}/${token}`,
      );

      if (status === 200) {
        localStorage.removeItem("auth");
        setMessage("Email vérifié avec succès ! Redirection...");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (error) {
      console.error(error);
      setMessage(" Lien invalide ou expiré. Veuillez réessayer.");
      toast.error("Lien de vérification invalide ou expiré.");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {isVerifying ? (
          <>
            <p style={{ color: "var(--jaune)", fontSize: "18px" }}>
              Vérification de votre email en cours...
            </p>
          </>
        ) : (
          <>
            <p
              style={{
                fontSize: "20px",

                fontWeight: "bold",
                margin: "20px 0",
              }}
            >
              {message}
            </p>

            <p style={{ color: "var(--jaune)",  marginTop: "20px" }}>
              Vous allez être redirigé vers la page de connexion...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
