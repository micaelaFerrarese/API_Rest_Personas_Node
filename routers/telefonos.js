const express = require("express");
const gestor_telefono = require("../gestores/telefonos");
const gestor_personas = require("../gestores/personas");
const router = express.Router();
router.use(express.json());

//GET /telefonos/ = consultar todos
router.get("/", async (req, res) => {
  const resultado = await gestor_telefono.consultar_todos();
  res.end(JSON.stringify(resultado));
});

//GET /telefonos/:id = consultar uno por id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!isNaN(id)) {
    let telefono = await gestor_telefono.consultar_uno(id);

    if (telefono) {
      res.json(telefono);
    } else res.status(404).send("Telefono No encontrado");
  } else res.status(400).send("El parámetro debe ser numérico");

  res.end();
});

//DELETE /telefonos/:id  = eliminar un telefono
router.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  if (!isNaN(id)) {
    let telefono = await gestor_telefono.consultar_uno(id);

    if (telefono) {
      gestor_telefono.borrar(id);
    } else res.status(404).send("Error al eliminar");
  } else res.status(400).send("El parámetro debe ser numérico");

  res.end();
});

//PUT  /telefonos/:id    = modificar un telefono existente
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!isNaN(id)) {
    let telefono = await gestor_telefono.consultar_uno(id);

    if (telefono) {
      let tel = req.body;

      tel.id = id;
      gestor_telefono.modificar(tel);

      res.sendStatus(201).send("Telefono modificado");
    }
  } else {
    res.status(400).send("El parámetro debe ser numérico");
  }

  res.end();
});

//POST / = agregar nuevo

router.post("/", async (req, res) => {
  const telefono = req.body;
  const persona = await gestor_personas.consultar_telefonos(telefono.documento);

  if (!persona) {
    res.status(400).send("Persona no registrada");
  } else {
    await gestor_telefono.agregar(telefono);
    res.status(201).send("nuevo numero agregado");
  }
});

//GET /telefonos/?sufijo=xxx
router.get("/", async (req, res) => {
  const query = req.query;
  if (!IsNaN(query.sufijo)) {
    let sufijo = parseInt(req.query.sufijo);
    res.json(await gestor_telefono.buscarPorSufijo(sufijo));
  } else {
    res.status(400).send("el parámetro debe ser numérico");
  }
  res.end();
});

exports.router = router;
