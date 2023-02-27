const mongoose = require("mongoose");

const FolioSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: false,
  },
  email2: {
    type: String,
    unique: false,
  },
  comments: String,
  done: Boolean,
  cDate: Date,
  uDate: Date,
});

module.exports = mongoose.model("Folio", FolioSchema);
