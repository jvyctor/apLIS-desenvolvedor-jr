import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MedicosPage from "./pages/MedicosPage";
import PacientesPage from "./pages/PacientesPage";
import TodosCadastrosPage from "./pages/TodosCadastrosPage";
import "./App.css";

/** 
 Listagem, criação e edição de registros deveriam ficar juntas
 Máscara de cpc faltou
 Campos de nome não podem aceitar números
 Campos de cpf, crm e carteirinha não podem aceitar letras
 Campo de UF deveria ser select de opções: AC, CE, RO, etc...
*/

export default function App() {
  const [telaAtual, setTelaAtual] = useState("medicos");

  return (
    <div className="layout">
      <Sidebar
        telaAtual={telaAtual}
        onSelecionarTela={setTelaAtual}
      />

      <main className="content">
        {telaAtual === "medicos" && <MedicosPage />}
        {telaAtual === "pacientes" && <PacientesPage />}
        {telaAtual === "todos" && <TodosCadastrosPage />}
      </main>
    </div>
  );
}