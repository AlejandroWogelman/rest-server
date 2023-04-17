const { request, response } = require("express");

const isAdmin = async (req = request, res = response, next) => {
  //vemos si NO es undefined
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar token primero",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es Administrador - No puede hacer esto`,
    });
  }
  next();
};

module.exports = isAdmin;

const tieneRol = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar token primero",
      });
    }

    const { rol } = req.usuario;
    if (!roles.includes(rol)) {
      return res.status(401).json({
        msg: `El servicio require alguno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = { tieneRol, isAdmin };
