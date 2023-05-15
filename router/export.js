const express = require("express");

const ExportController = require("../controllers/export");

const api = express.Router();

api.get("/export", ExportController.getData);

module.exports = api;
