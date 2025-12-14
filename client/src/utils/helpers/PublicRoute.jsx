import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = localStorage.getItem("auth");
  return user ?  <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;