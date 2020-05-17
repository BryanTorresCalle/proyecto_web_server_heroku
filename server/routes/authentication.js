const express = require("express");
const router = express.Router();
const _controller = require("../controllers/authentication");
const { traer_permisos } = require("../controllers/options");

//MIDDLEWARE
router.use((req, res, next) => {
  try {
    let url = req.url;
    if (url === "/login") {
      next();
    } else {
      let token = req.headers.token;
      let verify = _controller.validar_token(token);
      next();
    }
  } catch (error) {
    res.status(401).send({ ok: false, info: error, message: "No autenticado" });
  }
});

router.post("/login", (req, res) => {
  try {
    let body = req.body;
    _controller.validar_datos(body);
    _controller
      .consultar_usuario(body)
      .then((answerDB) => {
        let usuario = answerDB.rowCount > 0 ? answerDB.rows[0] : undefined;

        if (usuario) {
          let token = _controller.generar_token(usuario);
          res.status(200).send({
            ok: true,
            info: token,
            primera_vez: usuario.primera_vez,
            rol: usuario.rol,
            message: "Persona autenticada",
          });
        } else {
          res.status(400).send({
            ok: false,
            info: {},
            message: "Documento y/o clave incorrecta.",
          });
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/verify", (req, res) => {
  try {
    let token = req.headers.token;
    let verify = _controller.validar_token(token);
    res.status(200).send({
      ok: true,
      info: verify,
      mensaje: "Autenticado.",
    });
  } catch (error) {
    res.status(401).send({
      ok: false,
      info: error,
      mensaje: "No autenticado.",
    });
  }
});

router.post("/verify", (req, res) => {
  try {
    let token = req.headers.token;
    let info = _controller.descifrar_token(token);
    let body = req.body;
    let permisos_modulo = [];
    traer_permisos(info.id)
      .then((answerDB) => {
        let permisos = answerDB.rows;
        if (permisos) {
          let tiene_permiso = false;
          for (let i in permisos) {
            if (permisos[i].Modulo == body.Modulo) {
              permisos_modulo.push(permisos[i]);
              tiene_permiso = true;
            }
          }
          if (tiene_permiso) {
            res.status(200).send({
              ok: true,
              message: "Tiene permisos",
              info: permisos,
            });
          } else {
            res.status(403).send({
              ok: false,
              info: {},
              message: "No tiene permisos para este módulo",
            });
          }
        } else {
          res.status(403).send({
            ok: false,
            info: {},
            message: "No tiene permisos para este módulo",
          });
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
