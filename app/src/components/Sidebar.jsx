import { useState } from "react";
import { Menu, Stethoscope, Users, ClipboardList } from "lucide-react";

export default function Sidebar({ telaAtual, onSelecionarTela }) {
  const [expandida, setExpandida] = useState(true);

  return (
    <aside className={`sidebar ${expandida ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        {expandida && <h2 className="sidebar-title">Painel</h2>}

        <button
          className="toggle-btn"
          onClick={() => setExpandida(!expandida)}
          type="button"
        >
          <Menu size={18} />
        </button>
      </div>

      <button
        className={`sidebar-nav-button ${telaAtual === "medicos" ? "active" : ""}`}
        onClick={() => onSelecionarTela("medicos")}
        type="button"
      >
        <span className="icon"><Stethoscope size={18} /></span>
        {expandida && <span>Médicos</span>}
      </button>

      <button
        className={`sidebar-nav-button ${telaAtual === "pacientes" ? "active" : ""}`}
        onClick={() => onSelecionarTela("pacientes")}
        type="button"
      >
        <span className="icon"><Users size={18} /></span>
        {expandida && <span>Pacientes</span>}
      </button>

      <button
        className={`sidebar-nav-button ${telaAtual === "todos" ? "active" : ""}`}
        onClick={() => onSelecionarTela("todos")}
        type="button"
      >
        <span className="icon"><ClipboardList size={18} /></span>
        {expandida && <span>Todos os Cadastros</span>}
      </button>
    </aside>
  );
}