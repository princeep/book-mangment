const express = require("express");
const { signup, Login, login } = require("../controller/user");
const userRoute = express.Router();

userRoute.post("/signup",signup);
userRoute.post("/login",login);

module.exports = userRoute;
