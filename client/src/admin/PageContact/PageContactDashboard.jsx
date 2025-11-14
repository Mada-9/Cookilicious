import React from "react";
import { useState, useEffect, useParams } from "react";
import axios from "axios";

import URL from "../../utils/constant/url";

const PageContactDashboard = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    getMessage();
  }, []);

  const getMessage = async () => {
    try {
      const { data, status } = await axios.get(URL.GET_CONTACT);
      if (status === 200) {
        setFormData(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const { status } = await axios.delete(URL.DELETE_CONTACT + "/" + id);
      if (status === 200) {
        console.log("Message deleted!");
        getMessage();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div style={{ fontSize: "4rem", padding:"3rem"  }}>Page Contact</div>

      <h1 style={{ fontSize: "1.5rem" }}>Messages récupérés</h1>
      <div style={{ margin: "3rem 5px" }}>
        <table className="table">
          <thead className="table-red">
            <tr>
               <th
                style={{
                  backgroundColor: "#9f1619",
                  border: "2px solid  #6f0002",
                  color: "#fefaef",
                  fontSize: "2rem",
                }}
              >
                ID
              </th>
              <th
                style={{
                  backgroundColor: "#9f1619",
                  border: "2px solid  #6f0002",
                  color: "#fefaef",
                  fontSize: "2rem",
                }}
              >
                email
              </th>
              <th
                style={{
                  backgroundColor: "#9f1619",
                  border: "2px solid #6f0002",
                  color: "#fefaef",
                  fontSize: "2rem",
                }}
              >
                message
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.map((item) => (
              <tr key={item._id}>
                <td
                  style={{
                    color: " #9f1619",
                    border: "2px solid  #6f0002",
                    backgroundColor: "#fefaef",
                    fontSize: "1.2rem",
                    letterSpacing: "0.04rem",
                  }}
                >
                  {item._id}
                </td>
                <td
                  style={{
                    color: " #9f1619",
                    border: "2px solid  #6f0002",
                    backgroundColor: "#fefaef",
                    fontSize: "1.2rem",
                    letterSpacing: "0.04rem",
                  }}
                >
                  {item.email}
                </td>
                <td
                  style={{
                    color: "#9f1619",
                    border: "2px solid #6f0002",
                    backgroundColor: "#fefaef",
                    wordSpacing: "0.1rem",
                    letterSpacing: "0.04rem",
                  }}
                >
                  {item.message}
                </td>
                <td
                  style={{
                    border: "2px solid #6f0002",
                    backgroundColor: "#fefaef",
                  }}
                >
                  <button
                    onClick={() => deleteMessage(item._id)}
                    className="btn btn-danger"
                    style={{
                      color: "#9f1619",
                      border: "2px solid #6f0002",
                      backgroundColor: "#fefaef",
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <input
                    type="checkbox"
                    id="check"
                    name="check"
                    value="check"
                    style={{ backgroundColor: "black" }}
                  />
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PageContactDashboard;
