import { useState } from "react";
import pacientesApi from "../api/pacientesApi";

export default function PacientesPage() {
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [form, setForm] = useState({
    nome: "",
    dataNascimento: "",
    carteirinha: "",
    cpf: "",
  });

  async function salvarPaciente(event) {
    event.preventDefault();

    try {
      setErro("");
      setMensagem("");

      await pacientesApi.post("/pacientes", form);

      setMensagem("Paciente criado com sucesso.");
      setForm({
        nome: "",
        dataNascimento: "",
        carteirinha: "",
        cpf: "",
      });
    } catch (error) {
      setErro(
        error?.response?.data?.message || "Erro ao cadastrar paciente."
      );
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <span className="page-badge">Cadastro</span>
          <h1>Cadastro de Pacientes</h1>
          <p className="page-subtitle">
            Centralize os dados dos pacientes com um fluxo rápido e intuitivo.
          </p>
        </div>
      </div>

      <form className="form-card" onSubmit={salvarPaciente}>
        <div className="card-header">
          <h3>Novo paciente</h3>
          <p className="card-subtitle">
            Informe os dados necessários para registrar um novo paciente.
          </p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite o nome completo"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Data de nascimento</label>
            <input
              type="date"
              value={form.dataNascimento}
              onChange={(e) =>
                setForm({ ...form, dataNascimento: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Carteirinha</label>
            <input
              type="text"
              placeholder="Número da carteirinha"
              value={form.carteirinha}
              onChange={(e) =>
                setForm({ ...form, carteirinha: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input
              type="text"
              placeholder="Informe o CPF"
              value={form.cpf}
              onChange={(e) => setForm({ ...form, cpf: e.target.value })}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Salvar paciente</button>
        </div>
      </form>

      {mensagem && <p className="success-message">{mensagem}</p>}
      {erro && <p className="error-message">{erro}</p>}
    </section>
  );
}