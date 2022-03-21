const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");
const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en el request",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuarioLogueado = await Usuario.findById(uid);
    if (!usuarioLogueado) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe",
      });
    }

    if (!usuarioLogueado.status) {
      return res.status(401).json({
        msg: "Token no válido - usuario borrado",
      });
    }
    req.usuarioLogueado = usuarioLogueado;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
