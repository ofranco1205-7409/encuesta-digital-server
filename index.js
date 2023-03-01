const mongoose = require("mongoose");
const app = require("./app");
//const PORT = process.env.PORT || 3977
const PORT = process.env.PORT || 3977;
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  IP_SERVER,
  API_VERSION,
} = require("./constants");

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/encuesta-digital?retryWrites=true&w=majority`;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexion a la base de datos es correcta.");

      app.listen(PORT, () => {
        console.log("######################");
        console.log("###### API REST ######");
        console.log("######################");
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
      });
    }
  }
);
