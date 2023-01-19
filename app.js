const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

// Import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const tacRoutes = require("./router/tac");
const folioRoutes = require("./router/folio");
const menuRoutes = require("./router/menu");

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, tacRoutes);
app.use(`/api/${API_VERSION}`, folioRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);

module.exports = app;
