const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    codigo: { type: String },
    valor: { type: String },
    status:  { type: String , default: 'VALIDAÇÃO'},
    cashback: { type: String, default: '0,00' },
    date: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model("Compra", UserSchema);
