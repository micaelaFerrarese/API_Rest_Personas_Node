const mariadb = require("mariadb");
const config = require("../config/bd");

//ABM Telefonos:
const agregar = async (nuevo) => {
  const conn = await mariadb.createConnection(config);
  const valores = [nuevo.numero, nuevo.id_tipo, nuevo.documento];
  await conn.query(
    "INSERT INTO telefonos (numero, id_tipo, documento) VALUES (?, ?, ?)",
    valores
  );
  conn.end();
};
const modificar = async (tel, id) => {
  const conn = await mariadb.createConnection(config);
  const valores = [tel.numero, tel.tipo, tel.documento, id];
  await conn.query(
    "UPDATE telefonos SET numero = ?, id_tipo = ?, documento = ? WHERE id_telefono = ?",
    valores
  );
  conn.end();
};

const eliminar = async (id) => {
  const conn = await mariadb.createConnection(config);
  await conn.query("DELETE FROM telefonos WHERE id_telefono = ?", [id]);
  conn.end();
};

const consultar_todos = async () => {
  const conn = await mariadb.createConnection(config);
  const telefonos = await conn.query("select * from telefonos");
  conn.end();
  return telefonos;
};

const consultar_uno = async (id) => {
  const conn = await mariadb.createConnection(config);
  const personas = await conn.query(
    "SELECT numero from telefonos WHERE id_telefono = ?",
    [id]
  );
  conn.end();
  return personas[0];
};

const consultar_por_dni = async (dni) => {
  const conn = await mariadb.createConnection(config);
  const telefonos = await conn.query(
    "select * from telefonos where documento = ?",
    [dni]
  );
  conn.end();
  return telefonos;
};

//GET /telefonos/?sufijo=xxx = consultar todos los telefonos cuyo número finaliza en una secuencia

const buscarPorSufijo = async (sufijo) => {
  const conn = await mariadb.createConnection(config);
  const concat = "%";
  sufijo = concat + sufijo;
  const valores = [sufijo];
  const telefonos = await conn.query(
    "select * from telefonos where numero like ? ",
    valores
  );
  conn.end();
  return telefonos;
};

exports.modificar = modificar;
exports.agregar = agregar;
exports.eliminar = eliminar;
exports.consultar_todos = consultar_todos;
exports.consultar_uno = consultar_uno;
exports.consultar_por_dni = consultar_por_dni;
exports.buscarPorSufijo = buscarPorSufijo;
