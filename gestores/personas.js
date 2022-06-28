const mariadb = require("mariadb");
const config = require("../config/bd");

const agregar = async (nueva) => {
  const conn = await mariadb.createConnection(config);
  const valores = [nueva.documento, nueva.nombre, nueva.apellido, nueva.edad];
  await conn.query(
    "insert into personas2(documento, nombre, apellido, edad) values(?,?,?,?) ",
    valores
  );
  conn.end();
};

const consultar_todas = async () => {
  const conn = await mariadb.createConnection(config);
  let personas = await conn.query("select * from personas2");
  conn.end();
  return personas;
};

const consultar = async (num) => {
  const conn = await mariadb.createConnection(config);
  let personas = await conn.query(
    "select * from personas2 where documento = ?",
    [num]
  );
  conn.end();
  return personas[0];
};

const modificar = async (persona) => {
  const conn = await mariadb.createConnection(config);
  const valores = [
    persona.nombre,
    persona.apellido,
    persona.edad,
    persona.documento,
  ];
  await conn.query(
    "update personas2 set nombre = ?, apellido = ?, edad = ? where documento = ?",
    valores
  );
  conn.end();
};
const eliminar = async (num) => {
  const conn = await mariadb.createConnection(config);
  await conn.query("delete from personas2 where documento = ?", [num]);
  conn.end();
};
//Peticiones en relacion con la Tabla Telefonos:
const consultar_telefonos = async (documento) => {
  const conn = await mariadb.createConnection(config);
  const valores = [documento.numero];
  let telefonos = await conn.query(
    "select * from telefonos where documento = ?",
    valores
  );
  conn.end();
  return telefonos;
};

exports.agregar = agregar;
exports.consultar_todas = consultar_todas;
exports.consultar = consultar;
exports.modificar = modificar;
exports.eliminar = eliminar;
exports.consultar_telefonos = consultar_telefonos;
