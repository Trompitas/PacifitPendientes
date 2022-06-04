const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const usuarioRoutes = require("./routes/usuarioRoutes");

// settings
const app = express();
const port = 9000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// middlewares
app.use(express.json());
app.use("/.netlify/functions/api", usuarioRoutes);

// routes
app.get("/.netlify/functions/", (req, res) => {
  res.send("Solicitud");
});

// mongodb connection
const MONGODB_URI =
  "mongodb+srv://trompitas:O0CVY7ZmeeUYJ7Y3@cluster0.d8fcj.mongodb.net/pacifitRegistro?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Conexión a la base de datos establecida"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("Server listening to", port));
module.exports.handler = serverless(app);
