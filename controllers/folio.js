const Folio = require("../models/folio");
const jwt = require("../utils/jwt");

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function getFolios(req, res) {
  console.log("getFolios", req.params, req.body);

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
  console.log("createFolio", req.params, req.body);

  const { email, name, email2, comments, done } = req.body;

  const folio = new Folio({
    email: email ? email.toLowerCase() : "",
    name: name ? name : "",
    email2: email2 ? email2.toLowerCase() : "",
    comments: comments ? comments : "",
    done: done ? true : false,
    cDate: new Date(),
    uDate: new Date(),
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
  console.log("updateFolio", req.params, req.body);

  const { folio, name, email, email2, comments, done } = req.body;

  let msg = "";
  if (!folio) {
    msg = msg + "Folio es requerido, ";
  }

  if (msg.length > 0) {
    res.status(400).send({ msg });
  } else {
    const qData = {
      //cDate: new Date(),
      name,
      email: email ? email.toLowerCase() : "",
      email2: email2 ? email2.toLowerCase() : "",
      comments,
      done,
      uDate: new Date(),
    };
    Folio.findOneAndUpdate(
      { _id: folio },
      qData,
      {
        //new: true
        upsert: true,
        returnDocument: "after",
      },
      (error, fStored) => {
        if (error) {
          res.status(400).send({
            msg: "Error al actualizar folio [" + folio + "]",
            error,
          });
        } else {
          res.status(201).send(fStored);
        }
      }
    );
  }
}

async function deleteFolio(req, res) {
  console.log("deleteFolio", req.params, req.body);

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
  console.log("decodeFolio", req.params, req.body);

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
  console.log("encodeFolio", req.params, req.body);

  const { _id } = req.body;

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
