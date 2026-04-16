const pacienteModel = require("../models/pacienteModel");

async function listarPacientes(req, res) {
  try {
    const pacientes = await pacienteModel.listarTodos();
    return res.status(200).json(pacientes);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar pacientes",
      error: error.message,
    });
  }
}

async function buscarPacientePorId(req, res) {
  try {
    const { id } = req.params;
    const paciente = await pacienteModel.buscarPorId(id);

    if (!paciente) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }

    return res.status(200).json(paciente);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar paciente",
      error: error.message,
    });
  }
}

async function criarPaciente(req, res) {
  try {
    const { nome, dataNascimento, carteirinha, cpf } = req.body;

    if (!nome || !carteirinha || !cpf) {
      return res.status(400).json({
        message: "Nome, carteirinha e cpf são obrigatórios",
      });
    }

    await pacienteModel.criar({
      nome,
      dataNascimento,
      carteirinha,
      cpf,
    });

    return res.status(201).json({
      message: "Paciente criado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar paciente",
      error: error.message,
    });
  }
}

async function atualizarPaciente(req, res) {
  try {
    const { id } = req.params;
    const { nome, dataNascimento, carteirinha } = req.body;

    if (!nome || !carteirinha) {
      return res.status(400).json({
        message: "Nome e carteirinha são obrigatórios",
      });
    }

    const pacienteExistente = await pacienteModel.buscarPorId(id);

    if (!pacienteExistente) {
      return res.status(404).json({
        message: "Paciente não encontrado",
      });
    }

    await pacienteModel.atualizar(id, {
      nome,
      dataNascimento,
      carteirinha,
    });

    return res.status(200).json({
      message: "Paciente atualizado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar paciente",
      error: error.message,
    });
  }
}

async function deletarPaciente(req, res) {
  try {
    const { id } = req.params;

    const pacienteExistente = await pacienteModel.buscarPorId(id);

    if (!pacienteExistente) {
      return res.status(404).json({
        message: "Paciente não encontrado",
      });
    }

    await pacienteModel.remover(id);

    return res.status(200).json({
      message: "Paciente removido com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao remover paciente",
      error: error.message,
    });
  }
}

module.exports = {
  listarPacientes,
  buscarPacientePorId,
  criarPaciente,
  atualizarPaciente,
  deletarPaciente,
};