const ServicePG = require("../services/postgres");

let validar_usuario = (usuario) => {
  if (!usuario) {
    throw {
      ok: false,
      mensaje: "La información de la persona es obligatoria.",
    };
  }

  if (!usuario.id) {
    throw { ok: false, mensaje: "La cédula es obligatoria." };
  }
  if (!usuario.nombre) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }
  if (!usuario.apellido) {
    throw { ok: false, mensaje: "El apellido es obligatorio." };
  }
};

let guardar_usuario = async (usuario) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.acc_usuarios(
              id, nombre, apellidos, edad, correo, ciudad, ocupacion, rol, clave)
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  $5,
                  $6,
                  $7,
                  $8,
                  md5($9)
                  );`;

  let values = [
    usuario.id,
    usuario.nombre,
    usuario.apellido,
    usuario.edad,
    usuario.correo,
    usuario.ciudad,
    usuario.ocupacion,
    usuario.rol,
    usuario.clave,
  ];

  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let ver_usuario = async () => {
  let _service = new ServicePG();
  let sql = `SELECT acc_usuarios.id, acc_usuarios.nombre, acc_usuarios.apellidos, acc_usuarios.edad, acc_usuarios.correo, acc_usuarios.ciudad, acc_usuarios.ocupacion, acc_roles.nombre as "rol" FROM acc_usuarios INNER JOIN acc_roles on acc_usuarios.rol = acc_roles.id;`;
  let respuesta = await _service.runSql(sql);
  let result = respuesta.rows
  return result;
};

let consultar_usuarios = async () => {
  let _service = new ServicePG();
  let sql = `SELECT acc_usuarios.id, acc_usuarios.nombre, acc_usuarios.apellidos, acc_usuarios.edad, acc_usuarios.correo, acc_usuarios.ciudad, acc_usuarios.ocupacion, acc_usuarios.rol FROM acc_usuarios`;
  let answer = await _service.runSql(sql);
  return answer;
};

let consultar_usuario = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT acc_usuarios.id, acc_usuarios.nombre, acc_usuarios.apellidos, acc_usuarios.edad,
   acc_usuarios.correo, acc_usuarios.ciudad, acc_usuarios.ocupacion, acc_usuarios.rol,
    acc_usuarios.clave, acc_usuarios.primera_vez FROM acc_usuarios WHERE id = '${id}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let eliminar_usuario = (id) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM acc_usuarios WHERE id = $1`;
  let values = [id]
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let editar_usuario = async (usuario, id) => {
  let _service = new ServicePG();
  let sql = `UPDATE acc_usuarios set nombre = $1,
                 apellidos = $2,
                 edad = $3,
                 correo = $4,
                 ciudad = $5,
                 ocupacion = $6,
                 rol = $7,
                 primera_vez = $8
                 WHERE id= $9`;

  let values = [
    usuario.nombre,
    usuario.apellido,
    usuario.edad,
    usuario.correo,
    usuario.ciudad,
    usuario.ocupacion,
    usuario.rol,
    usuario.primera_vez,
    id
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let editar_clave = async (clave, id) => {
  
  let _service = new ServicePG();
  let sql = `UPDATE acc_usuarios set
                 clave = md5($1)
                 WHERE id= $2`;

  let values = [
    clave.clave_nueva,
    id
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};


module.exports = {
  validar_usuario,
  guardar_usuario,
  consultar_usuarios,
  consultar_usuario,
  eliminar_usuario,
  editar_usuario,
  ver_usuario,
  editar_clave,
};
