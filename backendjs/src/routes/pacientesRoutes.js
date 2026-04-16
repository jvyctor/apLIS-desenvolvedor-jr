const express = require("express");
const router = express.Router();
const pacientesController = require("../controllers/pacientesController");

router.get("/api/v1/pacientes", pacientesController.listarPacientes);
router.get("/api/v1/pacientes/:id", pacientesController.buscarPacientePorId);
router.post("/api/v1/pacientes", pacientesController.criarPaciente);
router.put("/api/v1/pacientes/:id", pacientesController.atualizarPaciente);
router.delete("/api/v1/pacientes/:id", pacientesController.deletarPaciente);

module.exports = router;