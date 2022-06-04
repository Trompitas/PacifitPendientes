const express = require("express");
const usuarioSchema = require("../models/usuarioModels");

const router = express.Router();

// create user
router.post("/solicitud", (req, res) => {
  const usuario = usuarioSchema(req.body);

  usuario
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users
router.get("/solicitud", (req, res) => {
  usuarioSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// search user by name
router.get("/solicitud/:name", (req, res) => {
  const { nombreCompleto } = req.params;
  const search = new RegExp(nombreCompleto, "i");
  usuarioSchema
    .find({$or: [{nombreCompleto: search}],}).lean()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/solicitud/:id", (req, res) => {
  const { id } = req.params;
  usuarioSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/solicitud/:id", (req, res) => {
  const { id } = req.params;
  const { nombreCompleto, cantidadRepeticiones, estadoSolicitud} = req.body;
  usuarioSchema
    .updateOne(
      { _id: id },
      { $set: { nombreCompleto, cantidadRepeticiones, estadoSolicitud } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;