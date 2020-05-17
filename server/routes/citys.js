const express = require("express");
const router = express.Router();

const {   consultar_ciudades,
    consultar_ciudad } = require("../controllers/citys");

/**
 * Obtener todos las ciudades
 */
router.get("/citys", (req, res) => {
    consultar_ciudades()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Ciudades consultadas" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener una sola ciudad
 */
router.get("/citys/:id", (req, res) => {
  let info_accion = req.params.id;
  consultar_accion(info_accion)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Ciudad consultada" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});


module.exports = router;

