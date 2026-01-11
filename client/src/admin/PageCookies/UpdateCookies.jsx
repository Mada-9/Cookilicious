import { useEffect, useState } from "react";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCookie = () => {
  const [cookie, setCookie] = useState({
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
      getCookie(id);
    }
  }, [id]);

  const getCookie = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_COOKIE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setCookie(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setCookie((prevCookie) => ({ ...prevCookie, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await axiosinstance.put(
        `${URL.UPDATE_COOKIE}/${id}`,
        cookie
      );
      if (status === 200) {
        setCookie(data);
        toast.success("Cookie updated");
        navigate("/admin/cookies");
      }
      console.log("Cookie updated !");
    } catch (error) {
      console.log(error.message);
      toast.error("Cookie  not updated");
    }
  };

  return (
    <>
      <div>Update Cookie</div>

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
            value={cookie.titre}
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
            value={cookie.prix}
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
            value={cookie.description}
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
            value={cookie.ingredients}
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
            value={cookie.photo}
            style={{ color: "var(--marronRouge)" }}
            onChange={handleChange}
          />
          <button className="my-4" style={{ color: "var(--marronRouge)" }}>
            Update
          </button>
        </form>
        <button style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/admin/cookies"> Retour aux cookies</Link>
        </button>
      </div>
    </>
  );
};

export default UpdateCookie;
