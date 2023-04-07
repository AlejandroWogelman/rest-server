const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const {
  usuariosGet,
  usuariosPut,
  usuariosDelete,
  usuariosPost,
  usuariosPatch,
} = require("../controllers/usuarios");
const {
  esRoleValido,
  emailExiste,
  usuarioExistePorID,
} = require("../helpers/db-validators");

const router = Router();

// "VALIDARCAMPOS" = Si hay un error no continúa a la ruta/conotrolador si hay error en los checks

router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExistePorID),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

//Middleware como segundo parametro si hay 3
router.post(
  "/",
  [
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    check("nombre", "El nombre es requrido").not().isEmpty(),
    check("password", "El password debe contener más de 6 letras").isLength({
      min: 6,
    }),
    /* check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]) */
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExistePorID),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);

module.exports = router;
