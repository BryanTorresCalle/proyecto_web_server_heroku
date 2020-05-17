const ServicePG = require("../services/postgres");
const jwt = require('jsonwebtoken');

const SECRET_KEY = '746f4325c687b8823db156b7c9e98dd665a1e3777f501997345b19d9bd99e118754928e78011b5b1bfd66482a17f87bab58bd0d4311f8a9141359a42ddfea07f'

let validar_datos = (usuario) => {
  if (!usuario) {
    throw {
      ok: false,
      message: "La información es obligatoria.",
    };
  }

  if (!usuario.id) {
    throw { ok: false, message: "La cédula es obligatoria." };
  }
  if (!usuario.clave) {
    throw { ok: false, message: "La clave es obligatoria." };
  }

}

//Consultar usuario con documento y clave
let consultar_usuario = async (usuario) => {
    let _service = new ServicePG();
    let sql = `SELECT * FROM acc_usuarios WHERE id = $1 AND clave = md5($2)`;
    let values = [usuario.id, usuario.clave]
    let respuesta = await _service.runSql(sql, values);
    return respuesta;
  };

  let generar_token = (usuario) =>{
    delete usuario.clave;
    let token = jwt.sign(usuario, SECRET_KEY, {expiresIn: "4h"});
    return token;
  }

  let descifrar_token = (token) => {
    return jwt.decode(token, SECRET_KEY);      
  }

  let validar_token = (token) => {
    return jwt.verify(token, SECRET_KEY);
  }

module.exports = { validar_datos, consultar_usuario, generar_token, validar_token, descifrar_token };
