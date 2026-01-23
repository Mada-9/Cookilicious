import { useState } from "react";
import { toast } from "react-toastify";
import axiosinstance from "../../utils/axios/axiosinstance";
import URL from "../../utils/constant/url";
import cookie from "../../assets/images/cookievelvetpistache.jpg";

const PageContact = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axiosinstance.post(URL.POST_CONTACT, formData);
      console.log(formData);
      if (
        formData.message.length >= 5 &&
        status === 201 &&
        formData.email.match(isValidEmail)
      ) {
        alert("message envoyé !");
        toast.success("message envoyé !");
      } else {
        alert("veuillez ecrire un message valide");
        toast.error("veuillez écrire un message valide !");
      }
    } catch (error) {
      console.error("erreur lors de l'envoie du message:", error.message);
    }
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "var(--creme)",  }}>
      <div className="row g-0">
        
        <h1>ACCESIBILITe FORM</h1>
        {/* CÔTÉ GAUCHE : Image avec Overlay */}
        <div  style={{ backgroundColor:"var(--jaune)"  }} className="col-lg-6 d-flex flex-column justify-content-center align-items-center p-5 text-center" 
            >
          <h2 className="display-4 fw-bold mb-3">
            Contactez nous!
          </h2>
          <p className="px-md-5">
            Notre équipe vous répond avec le sourire
          </p>
        </div>

        <div className="col-lg-6 d-flex justify-content-center align-items-center p-5">
          <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "450px" }}>
            
            <div className="mb-4">
              <label className="form-label" htmlFor="email" style={{ color: "var(--marronRouge)" }}>
                Votre Email
              </label>
              <input
              id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="nom@exemple.com"
                value={formData.email}
                onChange={handleChange}
                style={{
                  border: "none",
                  borderBottom: "2px solid var(--marronRouge)",
                  borderRadius: "0",
                  padding: "12px 0",
                  boxShadow: "none",
                  backgroundColor: "var(--creme)"
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="message" style={{ color: "var(--marronRouge)", letterSpacing: "1px" }}>
                Votre Message
              </label>
              <textarea
              id="message"
                name="message"
                className="form-control"
                placeholder="Racontez-nous tout..."
                value={formData.message}
                onChange={handleChange}
                style={{
                  border: "2px solid var(--marronRouge)",
                  borderRadius: "12px",
                  padding: "15px",
                                    backgroundColor: "var(--creme)"

                }}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn w-100 py-3 mt-2"
              style={{ 
                backgroundColor: "var(--jaune)", 
                color: "var(--marronRouge)", 
                borderRadius: "50px",
                border: "none",
                transition: "transform 0.2s"
              }}
              onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
              onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            >
              Envoyer la gourmandise 🍪
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default PageContact;