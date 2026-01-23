import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";
import { REGISTER_FIELDS } from "../../utils/config/FormFields";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(user);
  };

  return (
    <div className="container my-5 mx-auto px-3">
      <div className="row shadow rounded overflow-hidden g-0">
        <div className="col-12 col-md-6 p-4 p-lg-5 ">
          <h2 className="text-center mb-4">Inscription</h2>
          <form onSubmit={handleSubmit}>
            {REGISTER_FIELDS.map((field, index) => (
              <div className="input-group flex-nowrap mb-3" key={index}>
                <span className="input-group-text" id="addon-wrapping">
                  <i className={field.icon}></i>
                </span>
                {field.name === "civilite" ? (
                  <select
                    className="form-select register"
                    name={field.name}
                    id={field.id}
                    onChange={handleChange}
                  >
                    <option value="">{field.placeholder}</option>
                    <option value={field.opt1}>{field.opt1}</option>
                    <option value={field.opt2}>{field.opt2}</option>
                    <option value={field.opt3}>{field.opt3}</option>
                  </select>
                ) : (
                  <>
                    <input
                      type={
                        field.type === "password"
                          ? showPassword
                            ? "text"
                            : "password"
                          : field.type
                      }
                      className="form-control register"
                      placeholder={field.placeholder}
                      name={field.name}
                      aria-label={field.label}
                      aria-describedby="addon-wrapping"
                      onChange={handleChange}
                    />
                    {field.type === "password" && (
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={
                            showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                          }
                        ></i>
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn  w-100"
                style={{
                  color: "var(--creme)",
                  backgroundColor: "var(--marronRouge)",
                }}
              >
                S'inscrire
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link to="/sign" className="text-decoration-none">
              Déjà inscrit ?
            </Link>
          </div>
        </div>
        <div
          className="col-md-6 p-0"
          style={{ backgroundColor: "var(--marronRouge)" }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
