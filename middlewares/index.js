const validarCampos  = require("./validar-campos");
const validarJWT  = require("./validar.jwt");
const validaRol = require("./validar-roles");

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRol
}