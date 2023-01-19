const express = require("express");
const FolioController = require("../controllers/folio");
const md_folioActivo = require("../middlewares/folioActivo");

const api = express.Router();

api.post("/folio/encode", FolioController.encodeFolio);
api.post(
  "/folio/decode",
  [md_folioActivo.asureFolio],
  FolioController.decodeFolio
);

api.get("/folios", FolioController.getFolios);
api.post("/folio", FolioController.createFolio);
api.patch("/folio", FolioController.updateFolio);
api.delete("/folio", FolioController.deleteFolio);

module.exports = api;
