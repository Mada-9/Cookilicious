import React, { useState, useContext} from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../../utils/context/AuthContext";
import { REGISTER_FIELDS } from "../../utils/config/FormFields";


const Register = () => {
  const { register } = useContext(AuthContext);
  const [user, setUser] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await register(user);
  };

  return (
    <div className="container m-5">
      <div className="row shadow rounded overflow-hidden">
        <div className="col-md-6  p-5">
          <h1 className="text-center mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            {REGISTER_FIELDS.map((field, index) => (
              <div className="input-group flex-nowrap mb-3" key={index}>
                <span className="input-group-text" id="addon-wrapping">
                  <i className={field.icon}></i>
                </span>
                {field.name === "civilite" ? (
                  <select
                    className="form-select"
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
                  <input
                    type={field.type}
                    className="form-control"
                    placeholder={field.placeholder}
                    name={field.name}
                    aria-label={field.label}
                    aria-describedby="addon-wrapping"
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary w-100">
                Sign
              </button>
            </div>
          </form>
          <Link to='/sign' >Déja inscrit ?</Link>
        </div>
        <div className="col-md-6 p-0">
         image ?
        </div>
      </div>
    </div>
  );
};

export default Register;
