import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAdmin = () => {
  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const isAdmin = user.role === 'admin';
  return isAdmin ? <Outlet/> : <Navigate to="/" />;
};

export default PrivateRouteAdmin;