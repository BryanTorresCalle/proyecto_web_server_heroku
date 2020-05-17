const express = require("express");
const router = express.Router();

const {   validar_opcion,
  guardar_opcion,
  consultar_opciones,
  consultar_opcion,
  eliminar_opcion,
  eliminar_opcion_completa,
  ver_opcion,
  traer_permisos } = require("../controllers/options");

/**
 * Obtener todos las opciones
 */
router.get("/options", (req, res) => {
    consultar_opciones()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Opciones consultadas" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});


/**
 * Obtener una sola opción
 */
router.get("/options/:id", (req, res) => {
  let info_option = req.params.id;
  consultar_opcion(info_option)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Opción consultada" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Obtener inner join de opciones, modulos y roles
 */
router.get("/view-options", (req, res) => {
  ver_opcion()
    .then(answerDB => {
      let records = answerDB.rows;
      console.log(records);

      res.send({ ok: true, info: records, mensaje: "Inner join realizado" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Guardar una opción
 */
router.post("/options", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_option = req.body;
    
    // Valida la información, si hay un error se envia al catch
    validar_opcion(info_option);

    // Guardar el modulo en base de datos
    guardar_opcion(info_option)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Opción guardada", info: info_option });
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
 * Eliminar una opción
 */
router.delete("/options/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_option = req.params.id;
  
      // Elimina la opción en base de datos
      eliminar_opcion(info_option)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Opción eliminada", info: info_option });
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
 * Actualizar una opción
 */
router.put("/options/:nombre", (req, res) => {
   
    try {
      //Capturar el body desde la solicitud
      let nombre = req.params.nombre;
      let info_option = req.body;
     
      //validar_opcion(info_option);
  
      
      eliminar_opcion_completa(nombre, info_option) 
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Opción eliminada", info: answerDB });
        })
        .catch(error => {
          res.send(error);
        });
      // Responder
    } catch (error ) {
      
      res.send(error);
    }
    
  });

/**
 * Obtener los permisos
 */
router.get("/permisos/:id", (req, res) => {
  let info_option = req.params.id;
  traer_permisos(info_option)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: answerDB.rows, mensaje: "Opción consultada" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

module.exports = router;

