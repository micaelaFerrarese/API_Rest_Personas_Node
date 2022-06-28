const express = require("express");
const gestor_personas = require("../gestores/personas");
const gestor_telefono = require("../gestores/telefonos");
const router = express.Router();

router.use(express.json());

//Consultar Todas:
router.get("/", async (req, res) => {
  res.json(await gestor_personas.consultar_todas());
  res.end();
});
//Consultar Una:
router.get("/:numero", async (req, res) => {
  let num = parseInt(req.params.numero);

  if (!isNaN(num)) {
    // Si no es NaN, es porque es un número correcto
    let persona_encontrada = await gestor_personas.consultar(num);

    if (persona_encontrada) res.json(persona_encontrada);
    else res.status(404);
  } else res.status(400).send("El parámetro debe ser numérico");

  res.end();
});
//modificar o agregar :
router.put("/:numero", async (req, res) => {
  let num = parseInt(req.params.numero);

  if (!isNaN(num)) {
    // Si no es NaN, es porque es un número correcto
    let nueva = req.body;
    nueva.documento = num;
    let persona_encontrada = await gestor_personas.consultar(num);

    if (persona_encontrada) {
      await gestor_personas.modificar(nueva);
      res.sendStatus(200);
    } else {
      await gestor_personas.agregar(nueva);
      res.sendStatus(201);
    }
  } else res.status(400).send("El parámetro debe ser numérico");

  res.end();
});
//Eliminar
router.delete("/:numero", async (req, res) => {
  const numero = req.params.numero;

  await gestor_personas.eliminar(numero);

  res.send("User deleted.");
  red.end();
});

//Consultar Telefono:
router.get("/:id/telefonos", async (req, res) => {
  let id_persona = parseInt(req.params.id);

  if (isNaN(id_persona)) {
    res.status(400).send("el parametro debe ser numerico");
  }

  const personaEncontrada = await gestor_personas.consultar(id_persona);

  if (!personaEncontrada) {
    res.status(404).send("Persona no encontrada");
  }

  const telefonos = await gestor_telefono.consultar_uno(id_persona);
  res.status(200).json(telefonos);
});

exports.router = router;
