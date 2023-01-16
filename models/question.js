const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  folio: {
    type: String,
    //unique: true,
  },
  qID: String,
  qRes: Object,
  cDate: Date,
  aDate: Date,
});

module.exports = mongoose.model("Question", QuestionSchema);
