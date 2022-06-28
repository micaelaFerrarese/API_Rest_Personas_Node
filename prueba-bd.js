const mariadb = require("mariadb");

const config = {
  host: "localhost",
  database: "Personas",
  user: "myuser",
  password: "mypassword",
};

const main = async () => {
  try {
    let conexion = await mariadb.createConnection(config);
    let personas = await conexion.query("select * from personas2 limit 100");
    conexion.end();
    personas.forEach((p) => {
      console.log(p);
    });
  } catch (err) {
    console.log(err);
  }
};
main();
