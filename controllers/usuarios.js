const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

//PAGINAR USUARIOS
const usuariosGet = async (req = request, res) => {
  const { limite = 5, desde = 0 } = req.query;

  if (isNaN(Number(limite))) {
    return res.status(400).json({
      msg: "El valor ingresado como 'límite' no es válido",
    });
  }

  //Al enviarle el parámetro filtra por estado
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(desde).limit(Number(limite)),
  ]);
  //REDUCIMOS EL TIEMPO AL HACER LAS PETICIONES SIMULTANEAS SIN ESPERAR A LA ANTERIOR

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body; //{google, ...rest}
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Enciptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en DB
  await usuario.save();

  res.json({ msg: "POST API", usuario });
};

const usuariosPut = async (req, res) => {
  //validar el id como válido de mongo
  const { id } = req.params;
  const { _id, password, google, correo, ...rest } = req.body;

  //Excluimos password, _id (si o si ya que es de mongo), google y correo de la actualizacion
  //Actualizamos solo rest

  //TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  //actualizacion de la data
  const usuario = await Usuario.findByIdAndUpdate(id, rest);
  console.log(usuario);

  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id)

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  //De esta forma no perdemos informacion del usuario eliminado
  //Al consultar por los usuarios se mostrará como "eliminado" gracias a la validacion del GET

  //Sabemos a qué usuario pertenece el TOKEN
  const usuarioAutenticado = req.usuario;

  //Revisamos si tiene un rol que permita la accion de eliminar
  if (usuarioAutenticado.rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "Usuario no autorizado -- ROL NO AUTORIZADO",
    });
  }

  res.json({
    usuarioBorrado: usuario,
    usuarioAutenticado,
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
};
