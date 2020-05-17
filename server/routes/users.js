const express = require("express");
const router = express.Router();

const { validar_usuario,
  guardar_usuario,
  consultar_usuarios,
  consultar_usuario,
  eliminar_usuario,
  editar_usuario,
  editar_clave,
  ver_usuario } = require("../controllers/users");

/**
 * Obtener todos los usuarios
 */
router.get("/users", (req, res) => {
  consultar_usuarios()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Usuarios consultados" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener inner join de usuarios y roles
 */
router.get("/view-users", (req, res) => {
  ver_usuario()
    .then(answerDB => {
      let records = answerDB;
      res.send({ ok: true, info: records, mensaje: "Inner join realizado" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener un solo usuario
 */
router.get("/users/:id", (req, res) => {
  let info_usuario = req.params.id;
  consultar_usuario(info_usuario)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Usuario consultado" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar un usuario
 */
router.post("/users", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_usuario = req.body;

    // Valida la información, si hay un error se envia al catch
    validar_usuario(info_usuario);


    // Guardar la persona en base de datos
    guardar_usuario(info_usuario)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Usuario guardado", info: info_usuario });
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
 * Eliminar un usuario
 */
router.delete("/users/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_usuario = req.params.id;
  
      // Elimina el usuario en base de datos
      eliminar_usuario(info_usuario)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Usuario eliminado", info: info_usuario });
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
 * Actualizar un usuario
 */
router.put("/users/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_usuario = req.body;
  
      // Actualiza el usuario en base de datos

      editar_usuario(info_usuario, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Usuario editado", info: info_usuario });
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
 * Actualizar contraseña de un usuario
 */
router.put("/users/editPassword/:id", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id = req.params.id;
    let clave = req.body;
    
    
    editar_clave(clave, id)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Clave actualizada", info: clave });
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

