<<<<<<< HEAD
import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Admin/HeaderAdmin";
import Footer from "../Footer/Footer";

const TemplateAdmin = () => {
  return (
     <div>
      <div>
        <div id="monHeaderAdmin">
        <Header />
        </div>
        <section>
          <Outlet />
        </section>
      
      </div>
    </div>
  );
};


export default TemplateAdmin;
=======
import React from 'react'
import NavAdmin from '../Admin/NavAdmin'
import { Outlet } from 'react-router-dom'


const TemplateAdmin = () => {
  return (
    <div>
        <NavAdmin/>
        <section>
            <Outlet/>
        </section>
    
    </div>
  )
}

export default TemplateAdmin
>>>>>>> 1b20691f17c33f2ba5dd0f904bf7942c6deb498e
