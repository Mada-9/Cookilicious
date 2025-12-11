import { useState } from "react";
import {Outlet} from "react-router-dom";
import Header from "../Admin/HeaderAdmin";

const TemplateAdmin = () => {
      const [showNav, setShowNav] = useState(false);

  return (
     <div >
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
