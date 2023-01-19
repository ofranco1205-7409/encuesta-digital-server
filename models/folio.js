const mongoose = require("mongoose");

const FolioSchema = mongoose.Schema({
  email: {
    type: String,
    unique: false,
  },
  cDate: Date,
  eDate: Date,
});

module.exports = mongoose.model("Folio", FolioSchema);
