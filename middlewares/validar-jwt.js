const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

// EL "TOKEN" VA EN EL HEADER
const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // console.log(payload);  => { uid: '63d9ab8f755d791f4670517a', iat: 1680748754, exp: 1680763154

    //leer usuario autenticado
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      //validamos si no se encuentra usuario
      return res.status(401).json({
        msg: "Token no válido  --- Usuario no existe en DB",
      });
    }

    //Validamos si el usuario tiene estado FALSE/eliminado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido  --- Usuario estado false",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
