const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, validaRol } = require("../middlewares");

const {
  idExistsInDB,
  idStatus,
  isValidCategory,
  fieldValueExistsInDB,
} = require("../helpers/db-validators");

const router = Router();

const { ProductsController } = require("../controllers");
const { Product, Category } = require("../models");
const categorie = require("../models/category");

router.get("/", ProductsController.getProducts);

router.get(
  "/:id",
  [
    check("id", "No es un identificador válido").isMongoId(),
    check("id").custom((id) => idExistsInDB(id, Product)),
    validarCampos,
  ],
  ProductsController.getProduct
);

router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "No es un identificador válido").isMongoId(),
    check("category", "La categoria es bligatoria").not().isEmpty(),
    check("category").custom((categoryId) =>
      idExistsInDB(categoryId, Category)
    ),
    validarCampos,
  ],
  ProductsController.createProduct
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un identificador válido").isMongoId(),
    check("id").custom((id) => idExistsInDB(id, Product)),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name").custom((name) => fieldValueExistsInDB("name", name, Product)),
    check("category", "No es un identificador válido")
      .if(check("category").exists())
      .isMongoId(),
    check("category")
      .if(check("category").exists())
      .custom((categoryId) => idExistsInDB(categoryId, Category)),
    validarCampos,
  ],
  ProductsController.updateProduct
);

router.delete(
  "/:id",
  [
    validarJWT,
    validaRol("ADMIN_ROLE"),
    check("id", "No es un identificador válido").isMongoId(),
    check("id").custom((id) => idExistsInDB(id, Product)),
    check("id").custom((id) => idStatus(id, Product)),
    validarCampos,
  ],
  ProductsController.deleteProduct
);
module.exports = router;
