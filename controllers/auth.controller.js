const bcrypt = require("bcrypt");
const { response, json } = require("express");

const { googleVerify } = require("../helpers/google-verify");
const { generarJWT } = require("../helpers/generar-jwt");

const Usuario = require("../models/user");
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, status: true });
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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { email, name, picture } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ email });
    console.log(usuario);
    if (!usuario) {
      const data = {
        nombre: name,
        email,
        password: ":P",
        img: picture,
        google: true,
        role:'USER_ROLE'
      };

      usuario = new Usuario(data);
      await usuario.save();
    }
    if (!usuario.status) {
      return res.status(401).json({ msg: "Hable con el administrador, usuario bloqueado" });
    }
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "el idtoken no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
