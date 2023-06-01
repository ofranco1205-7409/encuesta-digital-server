const bcrypt = require("bcryptjs");
const Question = require("../models/question");
const Folio = require("../models/folio");
const image = require("../utils/image");
const { isObjectIdOrHexString } = require("mongoose");
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

  "C1_1_exportaciones",
  "C1_1_exportaciones",
  "C1_1_distribucion_nacional",
  "C1_1_servicio_centro_acopio",
  "C1_1_distribucion_urbana",
  "C1_1_otros",
  "C1_1_otro_detalle",

  "C1_2_1",
  "C1_2_2",
  "C1_2_3",
  "C1_2_4",

  "C1.3_1",
  "C1.3_2",
  "C1.3_3",
  "C1.3_4",
  "C1.3_5",
  "C1_3_otro",

  "C1_4_combustible",
  "C1_4_personal_conduccion",
  "C1_4_administrativos_y_servicio_cliente",
  "C1_4_comerciales",
  "C1_4_financieros_pago_deuda",
  "C1_4_seguros",
  "C1_4_impuestos",
  "C1_4_depreciacion_flota_y_otros_activos",
  "C1_4_costos_ambientales",
  "C1_4_capacitacion",
  "C1_4_alquileres_hipotecas",
  "C1_4_vigilancia_seguridad",
  "C1_4_tiempos_muertos",
  "C1_4_viaticos_estancias",
  "C1_4_otros",
  "C1_4_otros_costos",

  "C1_5",

  "C1_6_no_se_cobra",
  "C1_6_horas_exentas",
  "C1_6_tarifa_hora",

  "C1_7",
  "C1_7_otro",

  "C1_8",

  "C1_9",

  "C2_1_conductores_con_contrato",
  "C2_1_conductores_que_cobran_por_servicio",
  "C2_1_conductores_por_unidad_de_transporte",
  "C2_1_dificultades_para_encontrar_conductores",

  "C2_2_P1",
  "C2_2_P2",
  "C2_2_P3",
  "C2_2_P4",
  "C2_2_P5",

  "C3_1",

  "C3_2",

  "C4_1_A1",
  "C4_1_B1",
  "C4_1_A2",
  "C4_1_B2",
  "C4_1_A3",
  "C4_1_B3",
  "C4_1_A4",
  "C4_1_B4",
  "C4_1_A5",
  "C4_1_B5",
  "C4_1_A6",
  "C4_1_B6",
  "C4_1_A7",
  "C4_1_B7",
  "C4_1_A8",
  "C4_1_B8",
  "C4_1_A9",
  "C4_1_B9",

  "C4_2_km_recorridos",
  "C4_2_no_disponible",

  "C4.3_1",
  "C4.3_2",
  "C4.3_3",
  "C4.3_4",
  "C4.3_5",

  "C4.4_1",
  "C4.4_2",
  "C4.4_3",
  "C4.4_4",
  "C4.4_5",
  "C4.4_6",

  "C5.1_1",
  "C5.1_2",
  "C5.1_3",
  "C5.1_4",
  "C5.1_5",
  "C5_1_otro",

  "C5.2_1",
  "C5.2_2",
  "C5.2_3",
  "C5.2_4",
  "C5.2_5",
  "C5.2_6",
  "C5.2_7",
  "C5.2_8",
  "C5.2_9",
  "C5.2_10",

  "C6_P1",
  "C6_P2",
  "C6_P3",
  "C6_P4",
  "C6_P5",
  "C6_P6",
  "C6_P7",
  "C6_P8",
  "C6_P9",

  "C7.1_1",
  "C7.1_2",
  "C7.1_3",
  "C7.1_4",
  "C7_1_otro",

  "C7.2_1",
  "C7.2_2",
  "C7.2_3",
  "C7.2_4",
  "C7.2_5",
  "C7.2_6",
  "C7.2_7",
  "C7.2_8",

  "C7.3_1",
  "C7.3_2",
  "C7.3_3",
  "C7.3_4",
  "C7.3_5",

  "C8_1",
  "C8_2",
  "C8_3",
  "C8_4",
  "C8_5",
  "C8_6",

  "C9.1_1",
  "C9.1_2",
  "C9.1_3",
  "C9.1_4",
  "C9.1_5",

  "C9_2",

  "C10_P1",
  "C10_P2",
  "C10_P3",
  "C10_P4",
  "C10_P5",
  "C10_P6",
  "C10_P7",

  "C11_1",

  "C11_2",
  "C11_2_otro",

  "C12_P1",
  "C12_P2",
  "C12_P3",
  "C12_P4",
  "C12_P5",
  "C12_P6",
  "C12_P7",

  "D_P1",
  "D_P2",
  "D_P3",
  "D_P4",
  "D_P5",
  "D_P6",
  "D_P7",
  "D_P8",
  "D_P9",
  "D_P10",
  "D_R1_0",
  "D_R1_1",
  "D_R1_2",
  "D_R1_3",
  "D_R1_4",
  "D_R1_5",
  "D_R2_0",
  "D_R2_1",
  "D_R2_2",
  "D_R2_3",
  "D_R2_4",
  "D_R3_0",
  "D_R3_1",
  "D_R3_2",
  "D_R3_3",
  "D_R3_4",
  "D_R3_5",
  "D_R4_0",
  "D_R4_1",
  "D_R4_2",
  "D_R4_3",
  "D_R4_4",
  "D_R5_0",
  "D_R5_1",
  "D_R5_2",
  "D_R5_3",
  "D_R6_0",
  "D_R6_1",
  "D_R7_0",
  "D_R7_1",
  "D_R7_2",
  "D_R7_3",
  "D_R7_4",
];

async function getData(req, res) {
  const fileName = "digitacHub.csv";

  //let response = null;
  const folios = await Folio.find(
    {
      //Para pruebas, filtrar el folio a probar
      //_id: "64778e5bfe354029b32a519e",
    },
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
      //Para pruebas, filtrar sola las questions a probar
      //qID: { $in: ["A1", "B1", "C10", "D"] },
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

      case "C1.1":
        values = getC1_1(q.qRes);
        break;
      case "C1.2":
        values = getC1_2(q.qRes);
        break;
      case "C1.3":
        values = getC1_3(q.qRes);
        break;
      case "C1.4":
        values = getC1_4(q.qRes);
        break;
      case "C1.5":
        values = getC1_5(q.qRes);
        break;
      case "C1.6":
        values = getC1_6(q.qRes);
        break;
      case "C1.7":
        values = getC1_7(q.qRes);
        break;
      case "C1.8":
        values = getC1_8(q.qRes);
        break;
      case "C1.9":
        values = getC1_9(q.qRes);
        break;
      case "C2.1":
        values = getC2_1(q.qRes);
        break;
      case "C2.2":
        values = getC2_2(q.qRes);
        break;
      case "C3.1":
        values = getC3_1(q.qRes);
        break;
      case "C3.2":
        values = getC3_2(q.qRes);
        break;
      case "C4.1":
        values = getC4_1(q.qRes);
        break;
      case "C4.2":
        values = getC4_2(q.qRes);
        break;
      case "C4.3":
        values = getC4_3(q.qRes);
        break;
      case "C4.4":
        values = getC4_4(q.qRes);
        break;
      case "C5.1":
        values = getC5_1(q.qRes);
        break;
      case "C5.2":
        values = getC5_2(q.qRes);
        break;
      case "C6":
        values = getC6(q.qRes);
        break;
      case "C7.1":
        values = getC7_1(q.qRes);
        break;
      case "C7.2":
        values = getC7_2(q.qRes);
        break;
      case "C7.3":
        values = getC7_3(q.qRes);
        break;
      case "C8":
        values = getC8(q.qRes);
        break;
      case "C9.1":
        values = getC9_1(q.qRes);
        break;
      case "C9.2":
        values = getC9_2(q.qRes);
        break;
      case "C10":
        values = getC10(q.qRes);
        break;
      case "C11.1":
        values = getC11_1(q.qRes);
        break;
      case "C11.2":
        values = getC11_2(q.qRes);
        break;
      case "C12":
        values = getC12(q.qRes);
        break;
      case "D":
        values = getD(q.qRes);
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

function getC1_1(qRes) {
  const data = {
    C1_1_exportaciones: qRes.exportaciones,
    C1_1_exportaciones: qRes.exportaciones,
    C1_1_distribucion_nacional: qRes.distribucion_nacional,
    C1_1_servicio_centro_acopio: qRes.servicio_centro_acopio,
    C1_1_distribucion_urbana: qRes.distribucion_urbana,
    C1_1_otros: qRes.otros,
    C1_1_otro_detalle: qRes.otro_detalle,
  };

  console.log("C1.1 data", data);
  return data;
}

function getC1_2(qRes) {
  const qRes2 = qRes.map((v, i) => {
    switch (v) {
      case "A traves de contratos formales":
        return 1;
        break;
      case "Presta servicios sin contrato":
        return 2;
        break;
      case "Acuerdos de servicio por temporada":
        return 3;
        break;
      case "Servicios puntuales, a demanda":
        return 4;
        break;
      default:
        break;
    }
  });

  //console.warn("qRes2", qRes2);
  const data = qRes2.reduce((a, v, i) => ({ ...a, [`C1_2_${v}`]: 1 }), {});

  console.log("C1_2 data", data);
  return data;
}

function getC1_3(qRes) {
  let data = qRes.C1_3.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  data = { ...data, C1_3_otro: qRes.otro };

  console.log("C1_3 data", data);
  return data;
}

function getC1_4(qRes) {
  const data = {
    C1_4_combustible: qRes.combustible,
    C1_4_personal_conduccion: qRes.personal_conduccion,
    C1_4_administrativos_y_servicio_cliente:
      qRes.administrativos_y_servicio_cliente,
    C1_4_comerciales: qRes.comerciales,
    C1_4_financieros_pago_deuda: qRes.financieros_pago_deuda,
    C1_4_seguros: qRes.seguros,
    C1_4_impuestos: qRes.impuestos,
    C1_4_depreciacion_flota_y_otros_activos:
      qRes.depreciacion_flota_y_otros_activos,
    C1_4_costos_ambientales: qRes.costos_ambientales,
    C1_4_capacitacion: qRes.capacitacion,
    C1_4_alquileres_hipotecas: qRes.alquileres_hipotecas,
    C1_4_vigilancia_seguridad: qRes.vigilancia_seguridad,
    C1_4_tiempos_muertos: qRes.tiempos_muertos,
    C1_4_viaticos_estancias: qRes.viaticos_estancias,
    C1_4_otros: qRes.otros,
    C1_4_otros_costos: qRes.otros_costos,
  };

  console.log("C1_4 data", data);
  return data;
}

function getC1_5(qRes) {
  const data = { C1_5: qRes.replace("C1.5_", "") };

  console.log("C1_5 data", data);
  return data;
}

function getC1_6(qRes) {
  const data = {
    C1_6_no_se_cobra: qRes.no_se_cobra,
    C1_6_horas_exentas: qRes.horas_exentas,
    C1_6_tarifa_hora: qRes.tarifa_hora,
  };

  console.log("C1_6 data", data);
  return data;
}

function getC1_7(qRes) {
  const data = {
    C1_7: qRes.C1_7,
    C1_7_otro: qRes.otro,
  };

  console.log("C1_7 data", data);
  return data;
}

function getC1_8(qRes) {
  const data = { C1_8: qRes.replace("C1.8_", "") };

  console.log("C1_8 data", data);
  return data;
}

function getC1_9(qRes) {
  const data = { C1_9: qRes.replace("C1.9_", "") };

  console.log("C1_9 data", data);
  return data;
}

function getC2_1(qRes) {
  const data = {
    C2_1_conductores_con_contrato: qRes.conductores_con_contrato,
    C2_1_conductores_que_cobran_por_servicio:
      qRes.conductores_que_cobran_por_servicio,
    C2_1_conductores_por_unidad_de_transporte:
      qRes.conductores_por_unidad_de_transporte,
    C2_1_dificultades_para_encontrar_conductores:
      qRes.dificultades_para_encontrar_conductores,
  };

  console.log("C2_1 data", data);
  return data;
}

function getC2_2(qRes) {
  const retosRank = qRes.map((e, i) => {
    return "R_" + e.title.substring(1, e.title.indexOf("}"));
  });
  const data = retosRank.reduce(
    (a, v, i) => ({ ...a, [`C2_2_P${i + 1}`]: v }),
    {}
  );

  console.log("C2_2 data", data);
  return data;
}

function getC3_1(qRes) {
  const data = { C3_1: qRes.replace("C3.1_", "") };

  console.log("C3_1 data", data);
  return data;
}

function getC3_2(qRes) {
  const data = { C3_2: qRes.replace("C3.2_", "") };

  console.log("C3_2 data", data);
  return data;
}

function getC4_1(qRes) {
  const data = {
    C4_1_A1: qRes.A1,
    C4_1_B1: qRes.B1,
    C4_1_A2: qRes.A2,
    C4_1_B2: qRes.B2,
    C4_1_A3: qRes.A3,
    C4_1_B3: qRes.B3,
    C4_1_A4: qRes.A4,
    C4_1_B4: qRes.B4,
    C4_1_A5: qRes.A5,
    C4_1_B5: qRes.B5,
    C4_1_A6: qRes.A6,
    C4_1_B6: qRes.B6,
    C4_1_A7: qRes.A7,
    C4_1_B7: qRes.B7,
    C4_1_A8: qRes.A8,
    C4_1_B8: qRes.B8,
    C4_1_A9: qRes.A9,
    C4_1_B9: qRes.B9,
  };

  console.log("C4_1 data", data);
  return data;
}

function getC4_2(qRes) {
  const data = {
    C4_2_km_recorridos: 12,
    C4_2_no_disponible: true,
  };

  console.log("C4_2 data", data);
  return data;
}

function getC4_3(qRes) {
  let data = qRes.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  //data = { ...data, C4_3_otro: qRes.otro };

  console.log("C4_3 data", data);
  return data;
}

function getC4_4(qRes) {
  let data = qRes.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  //data = { ...data, C4_4_otro: qRes.otro };

  console.log("C4_4 data", data);
  return data;
}

function getC5_1(qRes) {
  let data = qRes.C5_1.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  data = { ...data, C5_1_otro: qRes.otro };

  console.log("C5_1 data", data);
  return data;
}

function getC5_2(qRes) {
  let data = qRes.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  //data = { ...data, C5_2_otro: qRes.otro };

  console.log("C5_2 data", data);
  return data;
}

function getC6(qRes) {
  const retosRank = qRes.map((e, i) => {
    return "R_" + e.title.substring(1, e.title.indexOf("}"));
  });
  const data = retosRank.reduce(
    (a, v, i) => ({ ...a, [`C6_P${i + 1}`]: v }),
    {}
  );

  console.log("C6 data", data);
  return data;
}

function getC7_1(qRes) {
  let data = qRes.C7_1.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  data = { ...data, C7_1_otro: qRes.otro };

  console.log("C7_1 data", data);
  return data;
}

function getC7_2(qRes) {
  let data = qRes.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  //data = { ...data, C1_3_otro: qRes.otro };

  console.log("C7_2 data", data);
  return data;
}

function getC7_3(qRes) {
  let data = qRes.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  //data = { ...data, C1_3_otro: qRes.otro };

  console.log("C7_3 data", data);
  return data;
}

function getC8(qRes) {
  let data = {
    C8_1: qRes.C8_1,
    C8_2: qRes.C8_2,
    C8_3: qRes.C8_3,
    C8_4: qRes.C8_4,
    C8_5: qRes.C8_5,
    C8_6: qRes.C8_6,
  };

  console.log("C8 data", data);
  return data;
}

function getC9_1(qRes) {
  let data = qRes.reduce((a, v, i) => ({ ...a, [`${v}`]: 1 }), {});

  //data = { ...data, C1_3_otro: qRes.otro };

  console.log("C9_1 data", data);
  return data;
}

function getC9_2(qRes) {
  const data = { C9_2: qRes.replace("C9.2_", "") };

  console.log("C9_2 data", data);
  return data;
}

function getC10(qRes) {
  const retosRank = qRes.map((e, i) => {
    const rank = e.title.substring(1, e.title.indexOf("}"));
    console.log("C10 data ", e.title, " rank", rank);
    return "R_" + (rank == "O" ? "Otro" : rank);
  });
  const data = retosRank.reduce(
    (a, v, i) => ({ ...a, [`C10_P${i + 1}`]: v }),
    {}
  );

  console.log("C10 data", data);
  return data;
}

function getC11_1(qRes) {
  const data = { C11_1: qRes.replace("C11.1_", "") };

  console.log("C11_1 data", data);
  return data;
}

function getC11_2(qRes) {
  const data = {
    C11_2: qRes.C11_2.replace("C11.2_", ""),
    C11_2_otro: qRes.otro,
  };

  console.log("C11_2 data", data);
  return data;
}

function getC12(qRes) {
  const retosRank = qRes.map((e, i) => {
    return "R_" + e.title.substring(1, e.title.indexOf("}"));
  });
  const data = retosRank.reduce(
    (a, v, i) => ({ ...a, [`C12_P${i + 1}`]: v }),
    {}
  );

  console.log("C12 data", data);
  return data;
}

function getD(qRes) {
  //console.log("D data qRes", qRes);
  const retosRank = qRes.map((e, i) => {
    return "R_" + e.title.substring(1, e.title.indexOf("}"));
  });
  let data = retosRank.reduce((a, v, i) => ({ ...a, [`D_P${i + 1}`]: v }), {});

  const detail_data = qRes.reduce((a, v, i) => {
    const reto = v.title.substring(1, v.title.indexOf("}"));
    console.log("D data reto", reto);
    const d_data = v.detail.reduce(
      (da, dv, di) => ({ ...da, [`D_R${reto}_${dv}`]: 1 }),
      {}
    );
    console.log("D data d_data", d_data);
    return { ...a, ...d_data };
  }, {});

  console.log("D data detail_data", detail_data);

  data = {
    ...data,
    ...detail_data,
  };

  //data = { ...data, C1_3_otro: qRes.otro };

  console.log("D data", data);
  return data;
}

module.exports = {
  getData,
};
