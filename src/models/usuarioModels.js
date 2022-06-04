const {Schema, model} = require("mongoose");

const usuarioSchema = Schema({
  nombreCompleto: {
    type: String,
    required: true,
  },
  cantidadRepeticiones: {
    type: Number,
    requiered: true,
  },
  estadoSolicitud: {
    type: Number,
    requiered: true,
    default: 0,
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Solicitude', usuarioSchema);