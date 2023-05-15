const bcrypt = require("bcryptjs");
const Question = require("../models/question");
const Folio = require("../models/folio");
const image = require("../utils/image");
const json2csv = require("json2csv").parse;

const fields = [
  "i",
  "folio",
  "_id",
  "name",
  "email",
  "email2",
  "comments",
  "done",
  "cDate",
  "uDate",

  "A1_P1",
  "A1_P2",
  "A1_P3",
  "A1_P4",
  "A1_P5",
  "A1_P6",
  "A1_P7",
  "A1_P8",
  "A1_P9",
  "A1_P10",
  "A1_P11",
  "A1_P12",

  "A2",

  "B1_101",
  "B1_102",
  "B1_103",
  "B1_104",
  "B1_105",
  "B1_106",
  "B1_107",
  "B1_108",
  "B1_109",
  "B1_110",
  "B1_111",
  "B1_112",
  "B1_113",
  "B1_114",
  "B1_201",
  "B1_202",
  "B1_203",
  "B1_204",
  "B1_205",
  "B1_206",
  "B1_301",
  "B1_302",
  "B1_303",
  "B1_304",
  "B1_305",
  "B1_401",
  "B1_402",

  "B2",

  "B3_1",
  "B3_2",
  "B3_3",
  "B3_4",

  "B4",

  "B5",

  "B4",

  "B5",

  "B6",

  "B7_pais",
  "B7_estado",
  "B7_ciudad",

  "B8_otras_ciudades",
];

async function getData(req, res) {
  const fileName = "digitacHub.csv";

  //let response = null;
  const folios = await Folio.find(
    {},
    {
      _id: true,
      name: 1,
      email: 1,
      email2: 1,
      comments: 1,
      done: 1,
      cDate: 1,
      uDate: 1,
    }
  );

  const arr = await Promise.all(
    folios.map(async (e, i) => {
      return await getDataRecord(e, i);
    })
  );

  console.log("arr", arr);
  const csv = json2csv(arr, { fields });

  console.log("csv", csv);
  res.header("Content-Type", "text/csv");
  res.attachment(fileName);
  res.status(200).send(csv);
}

async function getDataRecord(folioRec, i) {
  console.log("folioRec", folioRec);
  const folio = folioRec._id.toString();

  const questions = await Question.find(
    {
      folio: folio,
      //qID: { $in: ["A1", "A2", "B1"] },
    },
    { _id: false, folio: 1, qID: 1, qRes: 1 }
  );

  const dataRecord = {
    i,
    folio,
    ...folioRec._doc,
    ...getExportData(questions),
  };
  console.log("dataRecord", dataRecord);

  return dataRecord;
}

function getExportData(questions, f) {
  //console.log("questions", questions);
  const iniValue = {};

  const exportData = questions.reduce((a, q, i) => {
    console.log("q", i, q.qID);

    let values = {};

    /*
    if (q.qID === "A1") {
      values = getA1(q.qRes);
    }
    if (q.qID === "A2") {
      values = getA2(q.qRes);
    }
    */

    switch (q.qID) {
      case "A1":
        values = getA1(q.qRes);
        break;
      case "A2":
        values = getA2(q.qRes);
        break;
      case "B1":
        values = getB1(q.qRes);
        break;

      case "B2":
        values = getB2(q.qRes);
        break;
      case "B3":
        values = getB3(q.qRes);
        break;
      case "B4":
        values = getB4(q.qRes);
        break;
      case "B5":
        values = getB5(q.qRes);
        break;
      case "B6":
        values = getB6(q.qRes);
        break;
      case "B7":
        values = getB7(q.qRes);
        break;
      case "B8":
        values = getB8(q.qRes);
        break;

      default:
        break;
    }

    return { ...a, ...values };
  }, iniValue);

  return exportData;
}

function getA1(qRes) {
  const retosRank = qRes.map((e, i) => {
    return "R_" + e.title.substring(1, e.title.indexOf("]"));
  });
  const data = retosRank.reduce(
    (a, v, i) => ({ ...a, [`A1_P${i + 1}`]: v }),
    {}
  );

  console.log("A1 data", data);
  return data;
}

function getA2(qRes) {
  const retosRank = qRes.map((e, i) => {
    return e.title;
  });
  const data = { A2: retosRank };

  console.log("A2 data", data);
  return data;
}

function getB1(qRes) {
  const data = qRes.reduce((a, v, i) => ({ ...a, [`B1_${v}`]: 1 }), {});

  console.log("B1 data", data);
  return data;
}

function getB2(qRes) {
  const data = { B2: qRes };

  console.log("B2 data", data);
  return data;
}

function getB3(qRes) {
  const data = qRes.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  console.log("B3 data", data);
  return data;
}

function getB4(qRes) {
  const data = { B4: qRes.replace("B4_", "") };

  console.log("B4 data", data);
  return data;
}

function getB5(qRes) {
  const data = { B5: qRes.replace("B5_", "") };

  console.log("B5 data", data);
  return data;
}

function getB6(qRes) {
  const data = { B6: qRes.replace("B6_", "") };

  console.log("B6 data", data);
  return data;
}

function getB7(qRes) {
  const data = {
    B7_pais: qRes.pais,
    B7_estado: qRes.estado,
    B7_ciudad: qRes.ciudad,
  };

  console.log("B7 data", data);
  return data;
}

function getB8(qRes) {
  const data = { B8_otras_ciudades: qRes };

  console.log("B8 data", data);
  return data;
}

module.exports = {
  getData,
};
