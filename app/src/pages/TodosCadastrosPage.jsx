import { useEffect, useState } from "react";
import medicosApi from "../api/medicosApi";
import pacientesApi from "../api/pacientesApi";

export default function TodosCadastrosPage() {
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const [editandoMedico, setEditandoMedico] = useState(null);
  const [editandoPaciente, setEditandoPaciente] = useState(null);

  const [formMedico, setFormMedico] = useState({
    nome: "",
    CRM: "",
    UFCRM: "",
  });

  const [formPaciente, setFormPaciente] = useState({
    nome: "",
    dataNascimento: "",
    carteirinha: "",
    cpf: "",
  });

  async function carregarDados() {
    try {
      setLoading(true);
      setErro("");

      const [medicosResponse, pacientesResponse] = await Promise.all([
        medicosApi.get("/medicos"),
        pacientesApi.get("/pacientes"),
      ]);

      setMedicos(medicosResponse.data);
      setPacientes(pacientesResponse.data);
    } catch (error) {
      setErro("Erro ao carregar cadastros.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function abrirEdicaoMedico(medico) {
    setEditandoMedico(medico.id);
    setFormMedico({
      nome: medico.nome,
      CRM: medico.CRM,
      UFCRM: medico.UFCRM,
    });
  }

  function abrirEdicaoPaciente(paciente) {
    setEditandoPaciente(paciente.id);
    setFormPaciente({
      nome: paciente.nome,
      dataNascimento: paciente.dataNascimento
        ? paciente.dataNascimento.slice(0, 10)
        : "",
      carteirinha: paciente.carteirinha,
      cpf: paciente.cpf,
    });
  }

  async function salvarEdicaoMedico(id) {
    try {
      await medicosApi.put(`/medicos/${id}`, formMedico);
      setEditandoMedico(null);
      carregarDados();
    } catch {
      setErro("Erro ao atualizar médico.");
    }
  }

  async function salvarEdicaoPaciente(id) {
    try {
      await pacientesApi.put(`/pacientes/${id}`, {
        nome: formPaciente.nome,
        dataNascimento: formPaciente.dataNascimento,
        carteirinha: formPaciente.carteirinha,
      });

      setEditandoPaciente(null);
      carregarDados();
    } catch {
      setErro("Erro ao atualizar paciente.");
    }
  }

  async function excluirMedico(id) {
    const confirmar = window.confirm("Deseja excluir este médico?");
    if (!confirmar) return;

    try {
      await medicosApi.delete(`/medicos/${id}`);
      carregarDados();
    } catch {
      setErro("Erro ao excluir médico.");
    }
  }

  async function excluirPaciente(id) {
    const confirmar = window.confirm("Deseja excluir este paciente?");
    if (!confirmar) return;

    try {
      await pacientesApi.delete(`/pacientes/${id}`);
      carregarDados();
    } catch {
      setErro("Erro ao excluir paciente.");
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <span className="page-badge">Visão Geral</span>
          <h1>Todos os Cadastros</h1>
          <p className="page-subtitle">
            Consulte, altere e exclua médicos e pacientes cadastrados.
          </p>
        </div>
      </div>

      {erro && <p className="error-message">{erro}</p>}

      {loading ? (
        <div className="list-card">
          <p>Carregando dados...</p>
        </div>
      ) : (
        <>
          <div className="list-card">
            <div className="card-header">
              <h3>Médicos Cadastrados</h3>
            </div>

            {medicos.length === 0 ? (
              <p>Nenhum médico cadastrado.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CRM</th>
                    <th>UFCRM</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {medicos.map((medico) => (
                    <tr key={medico.id}>
                      <td>{medico.id}</td>
                      <td>
                        {editandoMedico === medico.id ? (
                          <input
                            value={formMedico.nome}
                            onChange={(e) =>
                              setFormMedico({ ...formMedico, nome: e.target.value })
                            }
                          />
                        ) : (
                          medico.nome
                        )}
                      </td>
                      <td>
                        {editandoMedico === medico.id ? (
                          <input
                            value={formMedico.CRM}
                            onChange={(e) =>
                              setFormMedico({ ...formMedico, CRM: e.target.value })
                            }
                          />
                        ) : (
                          medico.CRM
                        )}
                      </td>
                      <td>
                        {editandoMedico === medico.id ? (
                          <input
                            value={formMedico.UFCRM}
                            onChange={(e) =>
                              setFormMedico({ ...formMedico, UFCRM: e.target.value })
                            }
                          />
                        ) : (
                          medico.UFCRM
                        )}
                      </td>
                      <td className="actions-cell">
                        {editandoMedico === medico.id ? (
                          <>
                            <button
                              className="table-action save"
                              onClick={() => salvarEdicaoMedico(medico.id)}
                            >
                              Salvar
                            </button>
                            <button
                              className="table-action cancel"
                              onClick={() => setEditandoMedico(null)}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="table-action edit"
                              onClick={() => abrirEdicaoMedico(medico)}
                            >
                              Alterar
                            </button>
                            <button
                              className="table-action delete"
                              onClick={() => excluirMedico(medico.id)}
                            >
                              Excluir
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="list-card">
            <div className="card-header">
              <h3>Pacientes Cadastrados</h3>
            </div>

            {pacientes.length === 0 ? (
              <p>Nenhum paciente cadastrado.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Data Nascimento</th>
                    <th>Carteirinha</th>
                    <th>CPF</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.map((paciente) => (
                    <tr key={paciente.id}>
                      <td>{paciente.id}</td>
                      <td>
                        {editandoPaciente === paciente.id ? (
                          <input
                            value={formPaciente.nome}
                            onChange={(e) =>
                              setFormPaciente({ ...formPaciente, nome: e.target.value })
                            }
                          />
                        ) : (
                          paciente.nome
                        )}
                      </td>
                      <td>
                        {editandoPaciente === paciente.id ? (
                          <input
                            type="date"
                            value={formPaciente.dataNascimento}
                            onChange={(e) =>
                              setFormPaciente({
                                ...formPaciente,
                                dataNascimento: e.target.value,
                              })
                            }
                          />
                        ) : paciente.dataNascimento ? (
                          new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {editandoPaciente === paciente.id ? (
                          <input
                            value={formPaciente.carteirinha}
                            onChange={(e) =>
                              setFormPaciente({
                                ...formPaciente,
                                carteirinha: e.target.value,
                              })
                            }
                          />
                        ) : (
                          paciente.carteirinha
                        )}
                      </td>
                      <td>
                        {editandoPaciente === paciente.id ? (
                          <input value={formPaciente.cpf} disabled />
                        ) : (
                          paciente.cpf
                        )}
                      </td>
                      <td className="actions-cell">
                        {editandoPaciente === paciente.id ? (
                          <>
                            <button
                              className="table-action save"
                              onClick={() => salvarEdicaoPaciente(paciente.id)}
                            >
                              Salvar
                            </button>
                            <button
                              className="table-action cancel"
                              onClick={() => setEditandoPaciente(null)}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="table-action edit"
                              onClick={() => abrirEdicaoPaciente(paciente)}
                            >
                              Alterar
                            </button>
                            <button
                              className="table-action delete"
                              onClick={() => excluirPaciente(paciente.id)}
                            >
                              Excluir
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </section>
  );
}