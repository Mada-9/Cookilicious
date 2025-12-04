import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Template = () => {
  return (
    <div>
      <div>
        <div id="monheader">
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

export default Template;
