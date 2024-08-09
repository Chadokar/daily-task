import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
//fucntion which strict navigation

const RequireAuth = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  return token && !(token === "undefined") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
