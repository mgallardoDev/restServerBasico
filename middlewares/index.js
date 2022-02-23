const validarCampos  = require("../middlewares/validar-campos");
const validarJWT  = require("../middlewares/validar.jwt");
const validaRol = require("../middlewares/validar-roles");

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRol
}