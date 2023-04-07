const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
//DEBE COINCIDIR EL NOMBRE CON LA DB DE ROLES O NO DETECTARÁ LOS ROLES
