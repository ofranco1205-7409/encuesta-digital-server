const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  folio: {
    type: String,
    required: true,
    index: true,
    //unique: true,
  },
  qID: {
    type: String,
    required: true,
    index: true,
    //unique: true,
  },
  qRes: Object,
  cDate: Date,
  uDate: Date,
});

module.exports = mongoose.model("Question", QuestionSchema);
