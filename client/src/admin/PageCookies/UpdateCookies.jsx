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
      const { data, status } = await axiosinstance.get(`${URL.GET_DETAIL_COOKIE}/${id}`);
      console.log(id);

      if (status === 200) { setCookie(data); }
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
      <h2 className="dashboardHeader">Update Cookie</h2>

      <div
        className="col-8"
        style={{
          border: "2px var(--marronRouge) solid",
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
         <button 
             className="btn my-5 btn-lg px-5 rounded-pill
           fw-bold"
          style={{
            color: "var(--creme)",
            backgroundColor: "var(--marronRouge",
            border: "1px solid var(--marronRouge",
          }}
        >
            Update
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
          <Link to="/admin/cookies">Retour aux cookies</Link>
        </button>
      </div>
      </div>
    </>
  );
};

export default UpdateCookie;
