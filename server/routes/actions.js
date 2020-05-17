const express = require("express");
const router = express.Router();

const { validar_accion,
    guardar_accion,
    consultar_acciones,
    consultar_accion,
    eliminar_accion,
    editar_accion } = require("../controllers/actions");

/**
 * Obtener todos los roles
 */
router.get("/actions", (req, res) => {
    consultar_acciones()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Acciones consultadas" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener un solo rol
 */
router.get("/actions/:id", (req, res) => {
  let info_accion = req.params.id;
  consultar_accion(info_accion)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Acción consultada" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar un rol
 */
router.post("/actions", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_accion = req.body;

    // Valida la información, si hay un error se envia al catch
    validar_accion(info_accion);

    // Guardar el rol en base de datos
    guardar_accion(info_accion)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Acción guardada", info: info_accion });
      })
      .catch(error => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
  
});

/**
 * Eliminar un rol
 */
router.delete("/actions/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_accion = req.params.id;
  
      // Elimina el rol en base de datos
      eliminar_accion(info_accion)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Acción eliminada", info: info_accion });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });

  /**
 * Actualizar un rol
 */
router.put("/actions/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_accion = req.body;
  
      // Actualiza el rol en base de datos
      editar_accion(info_accion, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Acción editada", info: info_accion });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });

module.exports = router;

