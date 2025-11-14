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
        <Footer />
      </div>
    </div>
  );
};


export default TemplateAdmin;
