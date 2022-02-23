const { request, response } = require("express");

const validaRol = (rolesArray) => {
  return (req = request, res = response, next) => {
    const { usuarioLogueado } = req.usuarioLogueado;

    if (!req.usuarioLogueado) {
      return res.status(500).json({
        msg: "se quiere verificar el rol sin validar el token primero",
      });
    }

    const { role, nombre } = req.usuarioLogueado;

    if (rolesArray.includes(role)) {
      console.log("Control de acceso: OK");
      next();
    } else {
      console.log("Control de acceso: NO AUTORIZADO");

      return res.status(401).json({
        msg: "El usuario no tiene permisos",
      });
    }
  };
};

module.exports = { validaRol };
