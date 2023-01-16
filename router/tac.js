const express = require("express");
const QuestionController = require("../controllers/question");

const api = express.Router();

api.get("/questions", QuestionController.getQuestions);
api.post("/question", QuestionController.createQuestion);
api.patch("/question/:qID", QuestionController.updateQuestion);
api.delete("/question/:qID", QuestionController.deleteQuestion);

module.exports = api;
