const prisma = require("../lib/prisma");

async function listarTodos() {
  return await prisma.paciente.findMany({
    orderBy: { id: "desc" },
  });
}

async function buscarPorId(id) {
  return await prisma.paciente.findUnique({
    where: { id: Number(id) },
  });
}

async function criar(dados) {
  return await prisma.paciente.create({
    data: {
      nome: dados.nome,
      dataNascimento: dados.dataNascimento
        ? new Date(dados.dataNascimento)
        : null,
      carteirinha: dados.carteirinha,
      cpf: dados.cpf,
    },
  });
}

async function atualizar(id, dados) {
  return await prisma.paciente.update({
    where: { id: Number(id) },
    data: {
      nome: dados.nome,
      dataNascimento: dados.dataNascimento
        ? new Date(dados.dataNascimento)
        : null,
      carteirinha: dados.carteirinha,
    },
  });
}

async function remover(id) {
  return await prisma.paciente.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover,
};