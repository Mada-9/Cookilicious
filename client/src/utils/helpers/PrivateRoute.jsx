import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("auth");
  return user ? <Outlet/> : <Navigate to="/sign" />;
};

export default PrivateRoute;