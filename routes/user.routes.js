const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos} = require('../middlewares/validar-campos');
const { isRoleValid, isEmailAvailable, idExistsInDB} = require("../helpers/db-validators");

const controladorUsuarios = require("../controllers/users.controller");
const Usuario = require("../models/usuario");


const router = Router();

router.get("/", controladorUsuarios.usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un identificador válido").isMongoId(),
    check("id").custom((id) => idExistsInDB(id, Usuario)),
    check("role").custom(isRoleValid),
    validarCampos,
  ],
  controladorUsuarios.usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    check("email", "El formato del correo no es válido").isEmail(),
    check("role").custom(isRoleValid),
    check("email").custom(isEmailAvailable),
    validarCampos,
  ],
  controladorUsuarios.usuariosPost
);

router.delete(
  "/:id",
  [
    check("id", "No es un identificador válido").isMongoId(),
    check("id").custom((id) => idExistsInDB(id, Usuario)),
    validarCampos
  ],
  controladorUsuarios.usuariosDelete
);

router.patch("/", controladorUsuarios.usuariosPatch);

module.exports = router;
