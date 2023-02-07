const Question = require("../models/question");

async function getQuestions(req, res) {
  const { folio } = req.query;
  const { qID } = req.query;

  let response = null;

  if (folio === undefined) {
    response = await Question.find();
  } else {
    if (qID === undefined) {
      response = await Question.find({ folio });
    } else {
      const { qID } = req.query;
      response = await Question.find({ folio, qID });
    }
  }

  res.status(201).send(response);
}

async function createQuestion(req, res) {
  const { folio, qID, qRes } = req.body;
  let msg = "";
  if (!folio) {
    msg = msg + "Folio es requerido, ";
  }
  if (!qID) {
    msg = msg + "qID es requerido, ";
  }
  if (!qRes) {
    msg = msg + "qRes es requerido, ";
  }

  if (msg.length > 0) {
    res.status(400).send({ msg });
  } else {
    const q = new Question({
      folio,
      qID,
      qRes,
      cDate: new Date(),
      aDate: new Date(),
    });

    q.save((error, qStored) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear question", error });
      } else {
        res.status(201).send(qStored);
      }
    });
  }
}

async function updateQuestion(req, res) {
  console.log(req.params);

  const { qID } = req.params;
  const { folio, qRes } = req.body;

  let msg = "";
  if (!folio) {
    msg = msg + "Folio es requerido, ";
  }
  if (!qID) {
    msg = msg + "qID es requerido, ";
  }
  if (!qRes) {
    msg = msg + "qRes es requerido, ";
  }

  if (msg.length > 0) {
    res.status(400).send({ msg });
  } else {
    const qData = {
      qRes,
      //cDate: new Date(),
      aDate: new Date(),
    };
    Question.findOneAndUpdate(
      { folio, qID },
      qData,
      {
        //new: true,
        upsert: true,
        returnDocument: "after",
      },
      (error, qStored) => {
        if (error) {
          res.status(400).send({
            msg: "Error al actualizar folio [" + folio + "] qID [" + qID + "]",
            error,
          });
        } else {
          res.status(201).send(qStored);
        }
      }
    );
  }
}

async function deleteQuestion(req, res) {
  const { qID } = req.params;
  const { folio, qRes } = req.body;

  let msg = "";
  if (!folio) {
    msg = msg + "Folio es requerido, ";
  }
  if (!qID) {
    msg = msg + "qID es requerido, ";
  }

  if (msg.length > 0) {
    res.status(400).send({ msg });
  } else {
    const qData = {
      qRes,
      cDate: new Date(),
      aDate: new Date(),
    };
    Question.findOneAndDelete({ folio, qID }, (error) => {
      if (error) {
        res.status(400).send({
          msg: "Error al eliminar folio [" + folio + "] qID [" + qID + "]",
          err: error,
        });
      } else {
        res.status(201).send({ msg: "Delete correcto" });
      }
    });
  }
}

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
