const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: Number, required: true },
  senha: { type: String, min: 6, max: 12, required: true }
});

module.exports = mongoose.model("User", UserSchema);
