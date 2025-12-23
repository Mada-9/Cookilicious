import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosinstance from "../../utils/axios/axiosinstance";

const UserDetail = () => {
  const params = useParams();
  const { id } = params;
  const [detailUser, setDetailUser] = useState([]);

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  const getUser = async (id) => {
    try {
      const { data, status } = await axiosinstance.get(
        `${URL.GET_DETAIL_MEMBRE}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setDetailUser(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <div key={detailUser._id}>
          <div
            style={{
              padding: "2rem",
              justifyItems: "center",
            }}
          >
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2> User n°{detailUser._id}</h2>
              <p> Nom: {detailUser.nom}</p>
              <p>Prenom: {detailUser.prenom}</p>
              <p> Pseudo: {detailUser.pseudo}</p>
              <p>Email: {detailUser.email}</p>
            </div>
          </div>
        </div>
        <button style={{ display: "flex", justifySelf: "center" }}>
          <Link to="/admin/membres">Retours aux membres</Link>{" "}
        </button>
      </div>
    </>
  );
};

export default UserDetail;
