const Folio = require("../models/folio");
const jwt = require("../utils/jwt");

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function getFolios(req, res) {
  const { folio } = req.body;

  let response = null;

  if (folio === undefined) {
    response = await Folio.find();
  } else {
    response = await Folio.find({ _id: folio });
  }

  res.status(201).send(response);
}

async function createFolio(req, res) {
  const { email } = req.body;

  const folio = new Folio({
    email: email ? email.toLowerCase() : "",
    cDate: new Date(),
  });

  folio.save((error, fStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear folio", error });
    } else {
      res.status(201).send(fStored);
    }
  });
}

async function updateFolio(req, res) {
  const { folio } = req.body;

  let msg = "";
  if (!folio) {
    msg = msg + "Folio es requerido, ";
  }

  if (msg.length > 0) {
    res.status(400).send({ msg });
  } else {
    const qData = {
      //cDate: new Date(),
      eDate: new Date(),
    };
    Folio.findOneAndUpdate(
      { _id: folio },
      qData,
      { new: true },
      (error, fStored) => {
        if (error) {
          console.log(error);
          res.status(400).send({
            msg: "Error al actualizar folio [" + folio + "]",
          });
        } else {
          console.log(fStored);
          res.status(201).send({ msg: "Actualizacion correcta" });
        }
      }
    );
  }
}

async function deleteFolio(req, res) {
  const { folio } = req.body;

  let msg = "";
  if (!folio) {
    msg = msg + "Folio es requerido, ";
  }

  if (msg.length > 0) {
    res.status(400).send({ msg });
  } else {
    Folio.findOneAndDelete({ _id: folio }, (error) => {
      if (error) {
        console.log(error);
        res.status(400).send({
          msg: "Error al eliminar folio [" + folio + "]",
        });
      } else {
        res.status(201).send({ msg: "Delete correcto" });
      }
    });
  }
}

//Equivalente a getMe
async function decodeFolio(req, res) {
  const { _id } = req.folio;

  const response = await Folio.findById(_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado folio" });
  } else {
    res.status(201).send(response);
  }
}
/**
 * Equivalente a login
 * Busca que exista el folio en DB
 * @param {*} req
 * @param {*} res
 */
//Equivalente a login
async function encodeFolio(req, res) {
  const { _id } = req.body;

  console.log("encodeFolio:", _id);

  if (!_id) res.status(400).send({ msg: "El id es obligatorio" });

  response = await Folio.findById({ _id });

  console.log("response:", response);
  res.status(201).send({
    fToken: jwt.encodeFolio(response),
  });
}

module.exports = {
  getFolios,
  createFolio,
  updateFolio,
  deleteFolio,
  encodeFolio,
  decodeFolio,
};
