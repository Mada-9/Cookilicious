import { useState, useEffect, useContext } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { toast } from "react-toastify";
import URL from "../../utils/constant/url";
import { AuthContext } from "../../utils/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Parametres = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({ email: "", nom: "", prenom: "" });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email || "",
        nom: user.nom || "",
        prenom: user.prenom || "",
      });
    }
  }, [user]);

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axiosinstance.put(
        `${URL.UPDATE_MEMBRE}/${user._id}`,
        userData,
      );
      if (status === 200) {
        localStorage.setItem("auth", JSON.stringify(data));

        toast.success("Informations mises à jour !");
        navigate("/profil");
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Les mots de passe ne correspondent pas");
    }
    try {
      const { status } = await axiosinstance.put(URL.UPDATE_PASSWORD, {
        ...passwords,
        id: user._id,
      });
      if (status === 200) {
        toast.success("Mot de passe modifié !");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setShowPassword(false); // On cache par défaut après succès
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur mot de passe");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h3
        className="mb-4"
        style={{ color: "#5a1304", fontWeight: "bold", justifySelf: "center" }}
      >
        <i className="bi bi-gear me-2"></i>Paramètres du compte
      </h3>

      {/* SECTION INFORMATIONS */}
      <section
        className="p-4 border rounded shadow-sm mb-5"
        style={{ backgroundColor: "#fefaef" }}
      >
        <h3 className="h5 mb-3" style={{ color: "#7f1010" }}>
          Mes informations
        </h3>
        <form onSubmit={updateProfile}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={userData.email}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              name="nom"
              className="form-control"
              value={userData.nom}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Prénom</label>
            <input
              type="text"
              name="prenom"
              className="form-control"
              value={userData.prenom}
              onChange={handleUserChange}
              required
            />
          </div>
          <button
            className="btn w-100"
            style={{ backgroundColor: "#5a1304", color: "white" }}
          >
            Enregistrer les modifications
          </button>
        </form>
      </section>

      {/* SECTION MOT DE PASSE */}
      <section
        className="p-4 border rounded shadow-sm"
        style={{ backgroundColor: "#fefaef" }}
      >
        <h3 className="h5 mb-3" style={{ color: "#7f1010" }}>
          Sécurité
        </h3>
        <form onSubmit={updatePassword}>
          {/* Mot de passe actuel */}
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Mot de passe actuel"
              className="form-control"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              required
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>

          {/* Nouveau mot de passe */}
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Nouveau mot de passe"
              className="form-control"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* Confirmation */}
          <div className="input-group mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmer le nouveau mot de passe"
              className="form-control"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button
            className="btn w-100"
            style={{ backgroundColor: "#bd5505", color: "white" }}
          >
            Mettre à jour le mot de passe
          </button>
        </form>
      </section>
      <div className="text-center mt-5 mb-5">
        <button
          className="btn  btn-lg px-5 rounded-pill
                       fw-bold"
          style={{
            backgroundColor: "var(--creme)",
            color: "var(--marronRouge",
            border: "1px solid var(--marronRouge",
          }}
        >
          <Link to="/profil">Retour aux profil</Link>
        </button>
      </div>
    </div>
  );
};

export default Parametres;
