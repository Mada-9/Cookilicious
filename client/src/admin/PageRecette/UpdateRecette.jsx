import { useEffect, useState } from "react";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateRecette = () => {
   const [recette, setRecette] = useState({
   titre:"",
        description: "",
        image: "",
        nbPersonne:"",
        ingredients:"",
        preparation:"",
        astuce:""});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      getRecette(id);
    }
  }, [id]);

  const getRecette = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_RECETTE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setRecette(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setRecette((prevRecette) => ({ ...prevRecette, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await axiosinstance.put(
        `${URL.UPDATE_RECETTE}/${id}`,
        recette
      );
      console.log(data);
      
      if (status === 200) {
        toast.success("Recette updated");

        setRecette(data);
      }
      console.log("Recette updated !");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>Update Recette</div>

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
            Titre :
          </label>
          <input
            id="titre"
            type="text"
            name="titre"
            value={recette.titre}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="description" className="my-3">
            Description :
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={recette.description}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="nbPersonne" className="my-3">
            Nombre de personnes :
          </label>
          <input
            id="nbPersonne"
            type="text"
            name="nbPersonne"
            value={recette.nbPersonne}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="ingredients" className="my-3">
            Ingrédients :
          </label>
          <input
            id="ingredients"
            type="text"
            name="ingredients"
            value={recette.ingredients}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="preparation" className="my-3">
            Préparation :
          </label>
          <input
            id="preparation"
            type="text"
            name="preparation"
            value={recette.preparation}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="astuce" className="my-3">
            Astuce :
          </label>
          <input
            id="astuce"
            type="text"
            name="astuce"
            value={recette.astuce || ""}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="image" className="my-3">
            Image :
          </label>
          <input
            id="image"
            type="text"
            name="image"
            value={recette.image}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <button className="my-4" style={{ color: "var(--marronRouge)" }}>
            <Link to="/admin/recette"> Update</Link>
          </button>
        </form>
        <button style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/admin/recette">Retours aux recettes</Link>{" "}
        </button>
      </div>
    </>
  );
};

export default UpdateRecette;
