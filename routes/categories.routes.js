const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, validaRol } = require("../middlewares");

const { idExistsInDB, idStatus } = require("../helpers/db-validators");

const router = Router();

const { CategoryController} = require("../controllers");
const { Category } = require("../models");

//Obtener todas las categorias
router.get("/", CategoryController.getCategories);

//Obtener categoria por id
router.get(
  "/:id",
  [
    check("id", "No es un identificador válido").isMongoId(),
    check("id").custom((id) => idExistsInDB(id, Category)),
    validarCampos,
  ],
  CategoryController.getCategory
);

//crear categoria --  token valido
router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  CategoryController.createCategory
);

//actualizar categoria token validp
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un identificador válido").isMongoId(),
    check("id").custom((id) => idExistsInDB(id, Category)),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  CategoryController.updateCategory
);

//borrar categoria --Admin
router.delete(
  "/:id",
  [
    validarJWT,
    validaRol("ADMIN_ROLE"),
    check("id", "No es un identificador válido").isMongoId(),
    check("id").custom((id) => idExistsInDB(id, Category)),
    check("id").custom((id) => idStatus(id, Category)),
    validarCampos,
  ],
  CategoryController.deleteCategory
);
module.exports = router;
