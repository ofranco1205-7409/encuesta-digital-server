const jwt = require("../utils/jwt");

function asureFolio(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "La peticion no tiene la cabecera de autenticación" });
  }

  const fToken = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.decodeFolio(fToken);
    console.log("payload", payload);

    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      return res.status(400).send({ msg: "El fToken ha expirado" });
    }

    req.folio = payload.folio;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "fToken invalido" });
  }
}

module.exports = {
  asureFolio,
};
