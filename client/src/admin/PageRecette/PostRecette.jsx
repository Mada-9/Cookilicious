import { useState } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { toast } from "react-toastify";

import URL from "../../utils/constant/url";
import { Link, useNavigate } from "react-router-dom";

const PostRecette = () => {
  const [recette, setRecette] = useState({
    titre: "",
    description: "",
    image: "",
    nbPersonne: "",
    ingredients: "",
    preparation: "",
    astuce: "",
  });

  const navigate = useNavigate();

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setRecette((prevRecette) => ({ ...prevRecette, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status } = await axiosinstance.post(URL.POST_RECETTE, recette);
      if (status === 201) {
        toast.success("Recette ajoutée!");
        navigate("/admin/recette");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{}}>
      <h1>Post Recette</h1>
      <div
        className="col-8"
        style={{
          border: "4px black solid",
          justifySelf: "center",
          alignSelf: "center",
          margin: "2rem",
          padding: "1rem",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            flexDirection: "column",
            display: "flex",
            justifyItems: "center",
          }}
        >
          <label htmlFor="titre" className="my-3">
            Titre :{" "}
          </label>
          <input
            id="titre"
            type="text"
            name="titre"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="description" className="my-3">
            Description :{" "}
          </label>
          <input
            id="description"
            type="text"
            name="description"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />{" "}
          <label htmlFor="nbPersonne" className="my-3">
            Nombre de personnes :{" "}
          </label>
          <input
            id="nbPersonne"
            type="text"
            name="nbPersonne"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="ingredients" className="my-3">
            Ingrédients :{" "}
          </label>
          <input
            id="ingredients"
            type="text"
            name="ingredients"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="preparation" className="my-3">
            Préparation :{" "}
          </label>
          <input
            id="preparation"
            type="text"
            name="preparation"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="astuce" className="my-3">
            Astuce :{" "}
          </label>
          <input
            id="astuce"
            type="text"
            name="astuce"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="image" className="my-3">
            Image :{" "}
          </label>
          <input
            id="image"
            type="text"
            name="image"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <button className="my-4" style={{ color: "var(--marronRouge)" }}>
            Créer
          </button>
        </form>
        <button style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/admin/recette">Retour aux recettes</Link>{" "}
        </button>
      </div>
    </div>
  );
};

export default PostRecette;
