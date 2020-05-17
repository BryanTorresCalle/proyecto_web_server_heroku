const ServicePG = require("../services/postgres");


let validar_modulo = modulo => {
  if (!modulo) {
    throw {
      ok: false,
      mensaje: "La información del módulo es obligatoria.",
    };
  }

  if (!modulo.nombre) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }
};

let guardar_modulo = async modulo => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.acc_modulos(
    nombre, descripcion, proyecto)
    VALUES (
        $1,
        $2,
        $3);`;

  let values = [
    modulo.nombre,
    modulo.descripcion,
    modulo.proyecto
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let consultar_modulos = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM acc_modulos`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let consultar_modulo = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM acc_modulos WHERE id = '${id}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};


let eliminar_modulo = id => {
  let _service = new ServicePG();
  let sql = `DELETE FROM acc_modulos WHERE id = $1`;

  let values = [id];
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let editar_modulo = async (modulo, id) => {
  let _service = new ServicePG();
  let sql = `UPDATE acc_modulos set nombre = $1,
    descripcion = $2,
    proyecto = $3
    WHERE id = $4`;

  let values = [
    modulo.nombre,
    modulo.descripcion,
    modulo.proyecto,
    id
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};
module.exports = {
  validar_modulo,
  guardar_modulo,
  consultar_modulos,
  consultar_modulo,
  eliminar_modulo,
  editar_modulo
};

