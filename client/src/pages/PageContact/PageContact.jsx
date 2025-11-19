import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
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
      const { status } = await axios.post(URL.POST_CONTACT, formData);
      console.log(formData);
      if (formData.message.length >= 5 && status === 201 && formData.email.match(isValidEmail)) {
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
       <h1
          className="contactTitle"
          style={{
            fontSize: "5rem",
            color: "var(--marronRouge)",
          }}
        >
          Contactez nous
        </h1>
      <div
        className="contact"
        style={{
          height: "30rem",
          width:"50rem",
          margin:"3rem",
          justifyItems: "center",
          position: "relative",
          border:"4px solid var(--marronRouge)",
          justifySelf:"center"
        }}
      >
       
        <form className="homeFormContact" onSubmit={handleSubmit} style={{padding:"1rem"  }}>
          {/* FAIRE handlesubmit dans form et definir */}
          <label className="email" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="écrivez votre email"
            value={formData.email}
            onChange={handleChange}
          />
          <label className="message" htmlFor="message">
            Message:
          </label>
          <input
            type="texte"
            name="message"
            id="message"
            placeholder="Votre message"
            value={formData.message}
            onChange={handleChange}
          />
          <button
            id="homeBtnContact"
            style={{ color: "#783922" }}
            onSubmit={handleSubmit}
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};

export default PageContact;
