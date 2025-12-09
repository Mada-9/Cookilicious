import {Outlet} from "react-router-dom";
import Header from "../Admin/HeaderAdmin";

const TemplateAdmin = () => {
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
