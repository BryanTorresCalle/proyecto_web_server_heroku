const ServicePG = require("../services/postgres");


let consultar_ciudades = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM ciudades`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let consultar_ciudad = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM acc_ciudades WHERE id = '${id}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};


module.exports = {
  consultar_ciudades,
  consultar_ciudad
};
