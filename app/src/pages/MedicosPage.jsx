import { useState } from "react";
import medicosApi from "../api/medicosApi";

export default function MedicosPage() {
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [form, setForm] = useState({
    nome: "",
    CRM: "",
    UFCRM: "",
  });

  async function salvarMedico(event) {
    event.preventDefault();

    try {
      setErro("");
      setMensagem("");

      await medicosApi.post("/medicos", form);

      setMensagem("Médico criado com sucesso.");
      setForm({
        nome: "",
        CRM: "",
        UFCRM: "",
      });
    } catch (error) {
      setErro(
        error?.response?.data?.message || "Erro ao cadastrar médico."
      );
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <span className="page-badge">Cadastro</span>
          <h1>Cadastro de Médicos</h1>
          <p className="page-subtitle">
            Registre novos profissionais de forma simples e organizada.
          </p>
        </div>
      </div>

      <form className="form-card" onSubmit={salvarMedico}>
        <div className="card-header">
          <h3>Novo médico</h3>
          <p className="card-subtitle">
            Preencha os dados abaixo para adicionar um novo médico ao sistema.
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
            <label>CRM</label>
            <input
              type="text"
              placeholder="Informe o CRM"
              value={form.CRM}
              onChange={(e) => setForm({ ...form, CRM: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>UF do CRM</label>
            <input
              type="text"
              placeholder="Ex.: CE"
              value={form.UFCRM}
              onChange={(e) => setForm({ ...form, UFCRM: e.target.value })}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Salvar médico</button>
        </div>
      </form>

      {mensagem && <p className="success-message">{mensagem}</p>}
      {erro && <p className="error-message">{erro}</p>}
    </section>
  );
}