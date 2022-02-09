const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
    const { nombre, edad, apellid: apellido = 'Sin apellido'} = req.query;
  res.status(201).json({
    status: "ok",
      msg: "get API -- controlador",
      nombre,
      edad,
    apellid: apellido
  });
};

const usuariosPut = (req, response) => {
  const { id } = req.params;
  response.status(400).json({
    id,
    msg: "put API -- controlador",
  });
};

const usuariosPost = (req, response) => {
  const { nombre, edad } = req.body;
  response.json({
    msg: "post API -- controlador",
    nombre,
    edad,
  });
};

const usuariosDelete = (req, response) => {
  response.json({
    status: "ok",
    msg: "delete API -- controlador",
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
