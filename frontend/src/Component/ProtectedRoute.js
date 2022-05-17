import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({CheckAdmin}) => {
  let isAuthenticated  = useSelector((state)=> state.Products.User?.success)
  let auth = JSON.parse(localStorage.getItem("user"))
 console.log(isAuthenticated,auth)
  

if(CheckAdmin){
  const isUserAuthenticated = JSON.parse(localStorage.getItem("user"));
  const isAdminAuthenticated = JSON.parse(localStorage.getItem("user"));
  return isUserAuthenticated?.success && isAdminAuthenticated.user.role === 'admin' ? <Outlet /> : <Navigate to={"/"} />
}
  return auth?.success ? <Outlet /> : <Navigate to={"/signinout"} />;
};

export default ProtectedRoute;
