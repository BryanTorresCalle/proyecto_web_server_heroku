const ServicePG = require("../services/postgres");

let validar_accion = (accion) => {
  if (!accion) {
    throw {
      ok: false,
      mensaje: "La información es obligatoria.",
    };
  }

  if (!accion.nombre) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }
};

let guardar_accion = async (accion) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.acc_acciones(
              nombre, descripcion)
              VALUES (
                  $1,
                  $2);`;

  let values = [accion.nombre, accion.descripcion];
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let consultar_acciones = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM acc_acciones`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let consultar_accion = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM acc_acciones WHERE id = '${id}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let eliminar_accion = (id) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM acc_acciones WHERE id= $1`;
  let values = [id];
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let editar_accion = async (accion, id) => {
  let _service = new ServicePG();
  let sql = `UPDATE acc_acciones set nombre = $1,
                 descripcion = $2
                WHERE id = $3`;

  let values = [accion.nombre, accion.descripcion, id];
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};
module.exports = {
  validar_accion,
  guardar_accion,
  consultar_acciones,
  consultar_accion,
  eliminar_accion,
  editar_accion,
};
