const express = require("express");
const router = express.Router();

const ServicioArchivos = require("../services/archivos");
let _archivos = new ServicioArchivos();

const ServicioCorreo = require("../services/nodemailer");
const _correo = new ServicioCorreo();

router.post("/emails/account", (req, res) => {
  let info = req.body;
  console.log(info);

  let plantilla = _archivos
    .leerArchivo("templates/crearCuenta.html")
    .toString();

  plantilla = plantilla.replace("node_usuario", info.id);
  plantilla = plantilla.replace("node_contraseña", info.clave);

  console.log(plantilla);

  _correo
    .enviarCorreo(plantilla, info.correo, "Creación de cuenta")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/emails/recovery", (req, res) => {
  let info = req.body;
  console.log(info);

  let plantilla = _archivos
    .leerArchivo("templates/recuperarContrasena.html")
    .toString();

  plantilla = plantilla.replace("node_contraseña", info.clave);

  console.log(plantilla);

  _correo
    .enviarCorreo(plantilla, info.correo, "Recuperación de contraseña")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/emails/request", (req, res) => {
  let info = req.body;
  console.log("info");

  console.log(info);

  let plantilla = _archivos
    .leerArchivo("templates/solicitarCuenta.html")
    .toString();

  plantilla = plantilla.replace("node_usuario", info.id);
  plantilla = plantilla.replace("node_correo", info.correo);
  plantilla = plantilla.replace("node_descripcion", info.descripcion);

  console.log(plantilla);

  _correo
    .enviarCorreo(plantilla, "recursosudem@gmail.com", "Solicitud de cuenta")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = router;
