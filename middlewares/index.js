const validarCampos = require("../middlewares/validar-campos");
const validateJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");

module.exports = {
  ...validarCampos,
  ...validateJWT,
  ...validaRoles,
};
