import { useEffect, useState } from "react";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";
import {  Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const UpdateProduit = () => {
  const [produit, setProduit] = useState({
    titre: "",
    description: "",
    prix: "",
    photo: "",
  });

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      getProduit(id);
    }
  }, [id]);

  const getProduit = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_PRODUIT}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setProduit(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setProduit((prevProduit) => ({ ...prevProduit, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await axiosinstance.put(
        `${URL.UPDATE_PRODUIT}/${id}`,
        produit
      );
      if (status === 200) {    toast.success("Produit modifié");

        setProduit(data);
      }
      console.log("Produit ajouté !");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>Update Produit</div>

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
            value={produit.titre}
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
            value={produit.prix}
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
            value={produit.description}
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
            value={produit.photo}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <button className="my-4" style={{ color: "var(--marronRouge)" }}>
            <Link to="/admin/produit"> Update</Link>
          </button>
        </form>
        <button style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/admin/produit">Retours aux produits</Link>{" "}
        </button>
      </div>
    </>
  );
};

export default UpdateProduit;
