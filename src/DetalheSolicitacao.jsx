import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Car,
  CheckCircle,
  XCircle,
  FileText,
  User,
  Folder,
  MapPin,
  ClipboardList,
  BookOpen,
  ArrowLeft,
  UserCircle,
} from 'lucide-react';
import './DetalheSolicitacao.css';

function ProgressoAtendimento({ onFinalizado, onStatusChange }) {
  const steps = ['Iniciado', 'Em atendimento', 'Concluído'];
  const [currentStep, setCurrentStep] = useState(0);

  const avancarStep = () => {
    if (currentStep < steps.length - 1) {
      const novoStep = currentStep + 1;
      setCurrentStep(novoStep);
      onStatusChange(steps[novoStep]);
    } else {
      onFinalizado && onFinalizado();
    }
  };

  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="progresso-container">
      <div className="progress-line">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>

        <div className="progress-car" style={{ left: `${progressPercent}%` }}>
          <Car size={28} className="icon carro" />
        </div>
      </div>

      {currentStep < steps.length - 1 ? (
        <button className="btn avancar" onClick={avancarStep}>
          Avançar ➝ {steps[currentStep + 1]}
        </button>
      ) : (
        <div className="finalizado-msg">✅ Atendimento concluído!</div>
      )}
    </div>
  );
}

function DetalheSolicitacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const solicitacoes = [
       { id: 1, nome: "Marcos", tipo: "Suporte Técnico", status: "Pendente", protocolo: "PRT-001", endereco: "Costa Azul" },
          { id: 2, nome: "Kevin", tipo: "Financeiro", status: "Pendente", protocolo: "PRT-002", endereco: "Comercio" },
          { id: 3, nome: "João", tipo: "Comercial", status: "Pendente", protocolo: "PRT-003", endereco: "Brotas" },
          { id: 4, nome: "Rafael", tipo: "Suporte", status: "Pendente", protocolo: "PRT-004", endereco: "ACM" },
          { id: 5, nome: "Carlos", tipo: "Suporte", status: "Pendente", protocolo: "PRT-005", endereco: "Bairro da Paz" },
          { id: 6, nome: "Victor", tipo: "Suporte", status: "Pendente", protocolo: "PRT-006", endereco: "Engomadeira" },
          { id: 7, nome: "Miguel", tipo: "Suporte Técnico", status: "Pendente", protocolo: "PRT-007", endereco: "Graça" },
          { id: 8, nome: "Helena", tipo: "Financeiro", status: "Pendente", protocolo: "PRT-008", endereco: "Barra" },
          { id: 9, nome: "Gael", tipo: "Comercial", status: "Pendente", protocolo: "PRT-009", endereco: "Pituba" },
          { id: 10, nome: "Theo", tipo: "Suporte Técnico", status: "Pendente", protocolo: "PRT-010", endereco: "Ondina" },
          { id: 11, nome: "Laura", tipo: "Financeiro", status: "Pendente", protocolo: "PRT-011", endereco: "Cabula" },
          { id: 12, nome: "Arthur", tipo: "Comercial", status: "Pendente", protocolo: "PRT-012", endereco: "Liberdade" },
          { id: 13, nome: "Ravi", tipo: "Suporte Técnico", status: "Pendente", protocolo: "PRT-013", endereco: "Pirajá" },
          { id: 14, nome: "Davi", tipo: "Financeiro", status: "Pendente", protocolo: "PRT-014", endereco: "Federação" },
          { id: 15, nome: "Isaac", tipo: "Comercial", status: "Pendente", protocolo: "PRT-015", endereco: "Amaralina" },
          { id: 16, nome: "Benjamin", tipo: "Suporte Técnico", status: "Pendente", protocolo: "PRT-016", endereco: "Lobato" },
          { id: 17, nome: "Enzo", tipo: "Financeiro", status: "Pendente", protocolo: "PRT-017", endereco: "Arenoso" },
          { id: 18, nome: "Lucas", tipo: "Comercial", status: "Pendente", protocolo: "PRT-018", endereco: "Graça" },
          { id: 19, nome: "Heitor", tipo: "Suporte Técnico", status: "Pendente", protocolo: "PRT-019", endereco: "Barra" },
          { id: 20, nome: "Bento", tipo: "Financeiro", status: "Pendente", protocolo: "PRT-020", endereco: "Pituba" },
          { id: 21, nome: "Pietro", tipo: "Comercial", status: "Pendente", protocolo: "PRT-021", endereco: "Ondina" },
          { id: 22, nome: "Luan", tipo: "Suporte Técnico", status: "Pendente", protocolo: "PRT-022", endereco: "Cabula" },
          { id: 23, nome: "Tomás", tipo: "Financeiro", status: "Pendente", protocolo: "PRT-023", endereco: "Liberdade" },
          { id: 24, nome: "Levi", tipo: "Comercial", status: "Pendente", protocolo: "PRT-024", endereco: "Graça" },
          { id: 25, nome: "Sergio", tipo: "Job", status: "Pendente", protocolo: "PRT-024", endereco: "Ondina" },
      // ... continue sua lista
    ];

    const item = solicitacoes.find((s) => s.id === parseInt(id));
    setDados(item);
  }, [id]);

  const registrarHistorico = (novoStatus) => {
    const dataHora = new Date().toLocaleString("pt-BR");
    setDados((prev) => ({
      ...prev,
      status: novoStatus,
      historico: [
        ...(prev.historico || []),
        `${dataHora} - Status alterado para "${novoStatus}"`,
      ],
    }));
  };

  const iniciarTratamento = () => registrarHistorico("Iniciado");

  const finalizarTratamento = () => {
    registrarHistorico("Concluído");
    alert("Solicitação concluída!");
    navigate(-1);
  };

  if (!dados) return <p>Carregando detalhes...</p>;

  const statusClass =
    dados.status === "Pendente" || dados.status === "Iniciado"
      ? "status-pendente"
      : dados.status === "Concluído"
      ? "status-concluido"
      : dados.status === "Rejeitado"
      ? "status-rejeitado"
      : "";

  return (
    <div className="detalhe-card">
      <h2>
        <FileText size={24} className="icon" /> Detalhes da Ocorrência
      </h2>

      <button onClick={() => navigate(-1)} className="btn voltar">
        <ArrowLeft size={22} className="icon" /> Voltar
      </button>

      <div className="info-section">
        <p>
          <ClipboardList size={22} className="icon" /> <b>Fluxo:</b> FLUXO-
          {dados.id.toString().padStart(4, "0")}
        </p>
        <p>
          <UserCircle size={22} className="icon" /> <b>Atendente:</b> João Silva
        </p>
        <hr />
        <p>
          <User size={22} className="icon" /> <b>Nome:</b> {dados.nome}
        </p>
        <p>
          <Folder size={22} className="icon" /> <b>Tipo:</b> {dados.tipo}
        </p>
        <p>
          <FileText size={22} className="icon" /> <b>Status:</b>{" "}
          <span className={statusClass}>{dados.status}</span>
        </p>
        <p>
          <ClipboardList size={22} className="icon" /> <b>Protocolo:</b>{" "}
          {dados.protocolo}
        </p>
        <p>
          <MapPin size={22} className="icon" /> <b>Endereço:</b> {dados.endereco}
        </p>
      </div>

      {/* 🔹 Histórico usando a nova estilização */}
      <div className="historico-section">
        <h3>
          <BookOpen size={22} className="icon" /> Histórico
        </h3>
        <ul className="historico-lista">
          {dados.historico && dados.historico.length > 0 ? (
            dados.historico.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <p className="sem-historico">Nenhum histórico registrado.</p>
          )}
        </ul>
      </div>

      {dados.status === "Pendente" ? (
        <div className="botoes">
          <button className="btn aceitar" onClick={iniciarTratamento}>
            <CheckCircle size={22} className="icon" /> Aceitar e Iniciar
            Tratamento
          </button>
          <button
            className="btn rejeitar"
            onClick={() => registrarHistorico("Rejeitado")}
          >
            <XCircle size={22} className="icon" /> Fechar
          </button>
        </div>
      ) : dados.status !== "Concluído" && dados.status !== "Rejeitado" ? (
        <ProgressoAtendimento
          onFinalizado={finalizarTratamento}
          onStatusChange={registrarHistorico}
        />
      ) : dados.status === "Concluído" ? (
        <div className="finalizado-msg">✅ Atendimento concluído!</div>
      ) : null}
    </div>
  );
}

export default DetalheSolicitacao;
