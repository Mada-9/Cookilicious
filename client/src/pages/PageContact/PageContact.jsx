import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

import axiosinstance from "../../utils/axios/axiosinstance";
import URL from "../../utils/constant/url";

const PageContact = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

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
    <>
    <div>
      <div
        style={{
          background: "var(--marronRouge)",
          color: "var(--creme)",
          paddingBottom: "6rem",
          borderBottom:"2px var(--creme) solid"
          
        }}
        className="col-12"
      >
        {" "}
        <h2 className="p-5  titleContact text-center">Contactez nous</h2>
        <form
          onSubmit={handleSubmit}
          className="row justify-content-center g-3  pt-5  "
          style={{
            // borderLeft: "4px var(--marronRouge) solid",
            justifySelf: "center",
            borderRadius: "2rem",
            boxShadow: "0px 0px 10px -5px #c5c5c5ff",
          }}
        >
          <div className="col-9">
            <label htmlFor="inputEmail" className="form-label col-9 ">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                border: "4px solid var(--marronRouge)",
                color: "var(--marronRouge)",
              }}
            />
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
              style={{
                border: "4px solid var(--marronRouge)",
                color: "var(--marronRouge)",
              }}
            ></textarea>
          </div>
          <div className="col-9 mb-5">
            <button type="submit" className="btn btn-primary">
              Envoyer
            </button>{" "}
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default PageContact;
