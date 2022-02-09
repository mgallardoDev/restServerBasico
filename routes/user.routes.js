const { Router } = require('express')
const controladorUsuarios = require('../controllers/users.controller')

const router = Router()

router.get("/", controladorUsuarios.usuariosGet);

router.put("/:id", controladorUsuarios.usuariosPut);

router.post("/", controladorUsuarios.usuariosPost);

router.delete("/", controladorUsuarios.usuariosDelete);

router.patch("/", controladorUsuarios.usuariosPatch);


module.exports = router