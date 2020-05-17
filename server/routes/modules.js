const express = require("express");
const router = express.Router();

const { validar_modulo,
    guardar_modulo,
    consultar_modulos,
    consultar_modulo,
    eliminar_modulo,
    editar_modulo } = require("../controllers/modules");

/**
 * Obtener todos los módulos
 */
router.get("/modules", (req, res) => {
    consultar_modulos()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Módulos consultados" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener un solo módulo
 */
router.get("/modules/:id", (req, res) => {
  let info_module = req.params.id;
  consultar_modulo(info_module)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Módulo consultado" });
  console.log(records);
  })
  .catch(error => {
    res.send(error);
  });
  
});



/**
 * Guardar un módulo
 */
router.post("/modules", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_module = req.body;

    // Valida la información, si hay un error se envia al catch
    validar_modulo(info_module);

    // Guardar el modulo en base de datos
    guardar_modulo(info_module)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Modulo guardado", info: info_module });
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
 * Eliminar un modulo
 */
router.delete("/modules/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_module = req.params.id;
  
      // Elimina el modulo en base de datos
      eliminar_modulo(info_module)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Modulo eliminado", info: info_module });
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
 * Actualizar un modulo
 */
router.put("/modules/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_module = req.body;
  
      // Actualiza el usuario en base de datos
      editar_modulo(info_module, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Modulo editado", info: info_module });
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

