import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../utils/context/AuthContext";

import { SIGN_FIELDS } from "../../utils/config/FormFields";

const Sign = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="container m-5">
      <div className="row shadow rounded overflow-hidden">
        <div className="col-md-6  p-5">
          <h1 className="text-center mb-4">Sign</h1>
          <form onSubmit={handleSubmit}>
            {SIGN_FIELDS.map((field, index) => (
              <div className="input-group flex-nowrap mb-3" key={index}>
                <span className="input-group-text" id="addon-wrapping">
                  <i className={field.icon}></i>
                </span>
                <input
                  type={field.type}
                  
                  className="form-control"
                  placeholder={field.placeholder}
                  aria-label={field.label}
                  name={field.name}
                  aria-describedby="addon-wrapping"
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="d-grid">
              <button className="btn btn-primary w-100">
           Sign
              </button>
            </div>
          </form>
          <Link to="/register">Vous n'avez pas de compte ?</Link>
        </div>
        <div className="col-md-6 p-0">image ?</div>
      </div>
    </div>
  );
};

export default Sign;
