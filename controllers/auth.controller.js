const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");

const Usuario = require("../models/usuario");
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, state: true });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario incorrecto",
      });
    }

    const valisPassword = bcrypt.compareSync(password, usuario.password);
    if (!valisPassword) {
      return res.status(400).json({
        msg: "password incorrecto",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

module.exports = {
  login,
};
