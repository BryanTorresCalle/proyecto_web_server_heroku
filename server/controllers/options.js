const ServicePG = require("../services/postgres");

let validar_opcion = (opcion) => {
  if (!opcion) {
    throw {
      ok: false,
      mensaje: "La información del permiso es obligatoria.",
    };
  }

  if (!opcion.nombre) {
    throw { ok: false, mensaje: "El nombre es obligatorio." + opcion.nombre};
  }
};

let guardar_opcion = async (opcion) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.acc_opciones(
    nombre, descripcion, rol, module, accion)
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  $5);`;

  let values = [
    opcion.nombre,
    opcion.descripcion,
    opcion.rol,
    opcion.modulo,
    opcion.accion,
  ];
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let consultar_opciones = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM acc_opciones`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let consultar_opcion = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM acc_opciones WHERE id = '${id}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let eliminar_opcion = (id) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM acc_opciones WHERE id=$1`;
  let values = [id];
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let ver_opcion = async () => {
  let _service = new ServicePG();
  let sql = `SELECT acc_opciones.id, acc_opciones.nombre, acc_opciones.descripcion, acc_roles.nombre as "rol", acc_modulos.nombre as "modulo", acc_acciones.nombre as "accion" FROM acc_opciones INNER JOIN acc_roles on acc_opciones.rol = acc_roles.id INNER JOIN acc_modulos on acc_opciones.module = acc_modulos.id INNER JOIN acc_acciones on acc_acciones.id = acc_opciones.accion`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};


let eliminar_opcion_completa = async (nombre ,opcion) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM acc_opciones
  WHERE nombre= '${nombre}';`;
  /* AND rol=ANY(
  SELECT id FROM acc_roles
  WHERE nombre= '${opcion.rol}'*/
  /*let values = [
    opcion.nombre,
    opcion.rol,
    opcion.descripcion,
    opcion.modulo,
    opcion.accion,
  ];*/
 
  let respuesta = await  _service.runSql(sql);
  return respuesta;
};

let traer_permisos = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT acc_modulos.proyecto as "Proyecto", acc_modulos.nombre as "Modulo",acc_modulos.url as "Url" FROM acc_usuarios INNER JOIN acc_opciones on acc_usuarios.rol = acc_opciones.rol INNER JOIN acc_modulos on acc_modulos.id = acc_opciones.module INNER JOIN acc_acciones on acc_opciones.accion = acc_acciones.id
  WHERE acc_usuarios.id = '${id}' group by acc_modulos.proyecto,acc_modulos.nombre,acc_modulos.url`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

module.exports = {
  validar_opcion,
  guardar_opcion,
  consultar_opciones,
  consultar_opcion,
  eliminar_opcion,
  eliminar_opcion_completa,
  ver_opcion,
  traer_permisos,
};
