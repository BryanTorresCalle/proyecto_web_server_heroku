const express = require("express");
const router = express.Router();
const ServicePG = require("../services/postgres");

let recuperar_clave = async (clave, correo) => {
  
    let _service = new ServicePG();
    let sql = `UPDATE acc_usuarios set
                   clave = md5($1)
                   WHERE correo = $2`;
                   console.log(sql)
  
    let values = [
      clave,
      correo
    ]
    let respuesta = await _service.runSql(sql, values);
    return respuesta;
  };


    /**
 * Actualizar contraseña de un usuario
 */
router.put("/noPass/clave", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info = req.body;

    console.log(info)
    
    recuperar_clave(info.clave, info.correo)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Clave actualizada", info: info });
      })
      .catch(error => {
        console.log("error");
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
  
});

module.exports = router;

