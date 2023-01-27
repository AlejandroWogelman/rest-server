const { response, request } = require("express");

const usuariosGet = (req = request, res) => {
  const { nombre = "No name", apellido, id, page = 1, limit } = req.query;
  res.json({
    msg: "get API - controlaador",
    nombre,
    apellido,
    id,
    page,
    limit,
  });
};
const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API",
    nombre,
    edad,
  });
};
const usuariosPut = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "put API",
    id,
  });
};
const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};
const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
};
