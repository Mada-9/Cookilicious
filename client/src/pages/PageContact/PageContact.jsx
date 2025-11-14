import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";

const PageContact = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });

  // ENVOIE FORMULAIRE

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(URL.POST_CONTACT, formData);
      console.log(formData);
      if (status === 200) {
        console.log("Données du formualire bien récupérées:");
      }
    } catch (error) {
      console.error("erreur lors de l'envoie du message:", error.message);
    }
  };
  return (
    <>
      <div>PageContact</div>
      <div className="contactHome" style={{backgroundColor:"#833f3fff", height:"40rem", }}>
        <p className="homeContactTitle">Contactez nous</p>
        <form className="homeFormContact" onSubmit={handleSubmit}>
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
          <button id="homeBtnContact" onSubmit={handleSubmit}>
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};

export default PageContact;
