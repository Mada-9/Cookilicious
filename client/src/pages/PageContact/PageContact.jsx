import { useState} from "react";
import { useMediaQuery } from "react-responsive";
import axiosinstance from "../../utils/axios/axiosinstance";
import URL from "../../utils/constant/url";

const PageContact = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isMobile = useMediaQuery({ query: "(max-width: 525px)" });

  const styles = {
    titleContact: {
      fontSize: isMobile
        ? "3rem"
        :"4.5rem"
        
    },}

  // ENVOIE FORMULAIRE

  const handleChange = (e) => {
    // const { name, value } = e.target;
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
      } else {
        alert("veuillez ecrire un message valide");
      }
    } catch (error) {
      console.error("erreur lors de l'envoie du message:", error.message);
    }
  };

  return (
    <>
      <h1 className="pt-3 mb-5 " style={styles.titleContact}>Contactez nous</h1>
      <form
      onSubmit={handleSubmit}
        className="row g-3 d-flex justify-content-center  pt-3 mb-5 "
        style={{
          border: "4px var(--marronRouge) solid",
          justifySelf: "center",
        }}
      >
        <div className="col-9">
          <label htmlFor="inputEmail4" className="form-label col-9 ">
            Email
          </label>
          <input type="email" className="form-control" id="inputEmail4" name="email"  autoComplete="email"  value={formData.email}
              onChange={handleChange} style={{ border: "4px solid var(--marronRouge)",
                  color: "var(--marronRouge)",}}/>
        </div>
        <div className="col-9">
          <label htmlFor="message" className="form-label col-9">
            Votre message
          </label>
          <textarea
            type="text"
            className="form-control mb-1"
            name="message"
            id="message"
            autoComplete="message"
             value={formData.message}
              onChange={handleChange}
               style={{ border: "4px solid var(--marronRouge)",
                  color: "var(--marronRouge)",}}
          >
          </textarea>
        </div>
        <div className="col-12 mb-5">
          <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
            Envoyer
          </button>
        </div>
      </form>
    </>
  );
};

export default PageContact;
