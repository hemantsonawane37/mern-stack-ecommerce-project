const express = require("express");
const Router = express.Router();
const {
  RegisterUser,
  LoginUser,
  LogOutUser,
  ForgotPassword,
  ResetPassword,
  GetUserDetails,
  UpdatePassword,
  UpdateUserDetails,
  GetAllUsers,
  GetUserDetailsAdmin,
  DeleteUser,
  EditUserDetails,
} = require("../controllers/usercontroller");
const { isAuthenticated,autherizedRole } = require("../middleware/auth");

Router.post("/register", RegisterUser);
Router.post("/login", LoginUser);
Router.get("/logout", LogOutUser);
Router.post("/password/forgot", ForgotPassword);
Router.put("/password/reset/:token", ResetPassword);
Router.get("/me",isAuthenticated ,GetUserDetails);
Router.put("/password/update",isAuthenticated ,UpdatePassword);
Router.put("/me/update",isAuthenticated ,EditUserDetails);
Router.get("/admin/users/",isAuthenticated,autherizedRole("admin"),GetAllUsers)
Router.get("/user/:id",isAuthenticated,autherizedRole("admin"),GetUserDetailsAdmin)
Router.put("/user/update/:id",isAuthenticated,autherizedRole("admin"),UpdateUserDetails)
Router.delete("/user/delete/:id",isAuthenticated,autherizedRole("admin"),DeleteUser)









module.exports = Router;
