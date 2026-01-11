import { useEffect, useState } from "react";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBrookie = () => {
  const [brookie, setBrookie] = useState({
    titre: "",
    description: "",
    ingredients: "",
    prix: "",
    photo: "",
  });

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBrookie(id);
    }
  }, [id]);

  const getBrookie = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_BROOKIE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setBrookie(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBrookie((prevBrookie) => ({ ...prevBrookie, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await axiosinstance.put(
        `${URL.UPDATE_BROOKIE}/${id}`,
        brookie
      );
      if (status === 200) {
        setBrookie(data);
        toast.success("Brookie updated!");
        navigate("/admin/brookies");
      }
      console.log("Brookie updated !");
    } catch (error) {
      console.log(error.message);
      toast.error("Brookie not updated!");
    }
  };

  return (
    <>
      <div>Update Brookie</div>

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
            value={brookie.titre}
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
            value={brookie.prix}
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
            value={brookie.description}
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
            value={brookie.ingredients}
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
            value={brookie.photo}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <button className="my-4" style={{ color: "var(--marronRouge)" }}>
            Update
          </button>
        </form>
        <button style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/admin/brookies">Retour aux brookies</Link>{" "}
        </button>
      </div>
    </>
  );
};

export default UpdateBrookie;
