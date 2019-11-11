const mongoose = require("mongoose");

mongoose.Promise = global.Promise();

module.exports = mongoose.connect(
  "mongodb+srv://boticario:coticario@omnistack9-b4ne1.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
