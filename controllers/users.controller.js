const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/user");
const { isEmailAvailable } = require("../helpers/db-validators");

const usuariosGet = async (req = request, res = response) => {
  let { limit = 5, page = 0 } = req.query;
  isNaN(limit) ? (limit = 5) : null;
  isNaN(page) ? (page = 0) : null;
  query = { status: true };

  const [usuarios, count] = await Promise.all([
    Usuario.find(query)
      .skip(limit ? page * limit : page)
      .limit(limit),

    Usuario.countDocuments(query),
  ]);

  res.status(201).json({
    status: "ok",
    count,
    usuarios,
  });
};

const usuariosPut = async (req, response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  //TODO validar contra DB

  if (password) {
    resto.password = bcryptjs.hashSync(password, 10);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  response.status(200).json(usuario);
};

const usuariosPost = async (req, response) => {
  const { nombre, email, password, role } = req.body;

  const cryptoPassword = bcryptjs.hashSync(password, 10);
  const usuario = new Usuario({
    nombre,
    email,
    password: cryptoPassword,
    role,
  });

  await usuario.save();

  response.json({
    usuario,
  });
};

const usuariosDelete = async (request, response) => {
  const { id } = request.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { status: false });
  
  response.json({
    status: "ok",
    msg: "Usuario borrado correctamente",
    usuario,
  });
};

const usuariosPatch = (req, response) => {
  response.json({
    status: "ok",
    msg: "patch API -- controlador",
  });
};

module.exports = {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
};
