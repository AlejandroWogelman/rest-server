const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
    //El trhow no frena la app. Queda atrapado en el custom
  }
};

//PONER PARÁMETRO YA QUE SE ENVÍA EXPLICITAMENTE
const emailExiste = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`El correo: ${correo} se encuentra en uso`);
    /*   return res.status(400).json({
    msg: "El correo ya está en uso",
  }); */
  }
};

const usuarioExistePorID = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id: ${id} no existe`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExistePorID,
};
