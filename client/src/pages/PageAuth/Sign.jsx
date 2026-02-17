import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../utils/context/AuthContext";
import { SIGN_FIELDS } from "../../utils/config/FormFields";

const Sign = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="container my-5 mx-auto px-3 sign">
      
      <div className="row shadow rounded overflow-hidden g-0">
        <div className="col-12 col-md-6 p-4 p-lg-5 ">
          <h2 className="text-center mb-4">Connexion</h2>
          <form onSubmit={handleSubmit}>
            {SIGN_FIELDS.map((field, index) => (
              <div className="input-group flex-nowrap mb-3" key={index}>
                <span className="input-group-text" id="addon-wrapping">
                  <i className={field.icon}></i>
                </span>
                <input
                id={field.label}
                  type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
                  className="form-control sign"
                  placeholder={field.placeholder}
                  aria-label={field.label}
                  name={field.name}
                  aria-describedby="addon-wrapping"
                  onChange={handleChange}
                />
                {field.type === "password" && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                )}
              </div>
            ))}
            <div className="d-grid mb-3">
              <button className="btn  w-100"  style={{
                  color: "var(--creme)",
                  backgroundColor: "var(--marronRouge)",
                }}
                >
                Connexion
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link to="/register" className="text-decoration-none">
              Vous n'avez pas de compte ?
            </Link>
          </div>
        </div>

        <div 
          className="col-md-6 d-none d-md-block p-0" 
          style={{backgroundColor:"var(--marronRouge)"}}
        >
        </div>
      </div>
    </div>
  );
};

export default Sign;