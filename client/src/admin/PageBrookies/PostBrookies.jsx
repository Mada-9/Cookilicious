import { useState } from "react";
import axiosinstance from "../../utils/axios/axiosinstance";
import { toast } from "react-toastify";

import URL from "../../utils/constant/url";
import { Link, useNavigate } from "react-router-dom";

const PostBrookie = () => {
  const [brookie, setBrookie] = useState({
    titre: "",
    prix: "",
    description: "",
    ingredients: "",
    photo: "",
  });
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setBrookie((prevBrookie) => ({ ...prevBrookie, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status } = await axiosinstance.post(URL.POST_BROOKIE, brookie);
      if (status === 201) {
        console.log("Brookie add !");
        toast.success("Brookie add!");
        navigate("/admin/brookies");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Brookie not add!");
    }
  };

  return (
    <div >
      <h2 className="dashboardHeader">Post Brookie</h2>
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
          <label htmlFor="prix" className="my-3">
            Prix :{" "}
          </label>
          <input
            id="prix"
            type="number"
            name="prix"
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
          />
          <label htmlFor="ingredients" className="my-3">
            Ingredients :{" "}
          </label>
          <input
            id="ingredients"
            type="text"
            name="ingredients"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <label htmlFor="photo" className="my-3">
            Photo :{" "}
          </label>
          <input
            id="photo"
            type="text"
            name="photo"
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
       <button 
             className="btn my-4 btn-lg px-5 rounded-pill
           fw-bold"
          style={{
            color: "var(--creme)",
            backgroundColor: "var(--marronRouge",
            border: "1px solid var(--marronRouge",
          }}
        >
            Créer
          </button>
        </form>
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
          <Link to="/admin/brookies">Retour aux brookies</Link>
        </button>
      </div>
      </div>
    </div>
  );
};

export default PostBrookie;
