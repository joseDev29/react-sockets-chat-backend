const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateToken } = require("../middlewares/validate-token");

const AuthRouter = Router();

AuthRouter.post(
  "/new",
  [
    check("name", "name is required").notEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
  ],
  validateFields,
  createUser
);

AuthRouter.post(
  "/",
  [
    //verifica que venga una propiedad email y que sea de tipo email
    check("email", "email is required").isEmail(),
    //verifica que venga una propiedad password y que no este vacia
    check("password", "password is required").not().isEmpty(),
  ],
  validateFields,
  login
);

//Revalidar token
AuthRouter.get("/renew", validateToken, renewToken);

module.exports = AuthRouter;
