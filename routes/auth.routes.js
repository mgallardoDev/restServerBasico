const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router()

router.post(
  "/login",
  [
    check("email", "El correo es obligartorio").isEmail(),
    check("password", "El password es obligatorio").exists(),
    validarCampos,
  ],
  login
);

module.exports = router
