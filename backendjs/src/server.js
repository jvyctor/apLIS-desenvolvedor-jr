const express = require("express");
const cors = require("cors");
const pacientesRoutes = require("./routes/pacientesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(pacientesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API de pacientes rodando" });
});

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});