const express = require("express");
const { body, header } = require("express-validator");
const { validate } = require("../services/validator");
const { login, getUser, getfriend, getUsers } = require("../controllers/auth");
const { verify } = require("../middlewares/verify");

const Router = express.Router();
// auth
Router.post(
  "/login",
  [
    body("email", "Email required").exists().isEmail(),
    body("password", "Password length should be atleast 8 characters").isLength(
      {
        min: 8,
      }
    ),
  ],
  validate,
  login
);

Router.get(
  "/profile",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getUser
);

Router.get(
  "/friend",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getfriend
);

Router.get(
  "/users",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getUsers
);

module.exports = Router;
