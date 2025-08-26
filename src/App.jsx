import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  UserCircle, Search, FileText, MapPin, User, Hash, Briefcase, Workflow, CheckCircle2, XCircle
} from "lucide-react";
import DetalheSolicitacao from './DetalheSolicitacao';
import './App.css';

function Home() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('solicitacao');
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
  const navigate = useNavigate();

  const itensPorPagina = 10;

  const fetchSolicitacoes = () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
          
        ]);
      }, 1500);
    }).then(data => {
      setSolicitacoes(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchSolicitacoes();
    const interval = setInterval(fetchSolicitacoes, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBuscar = () => {
    alert(`Buscando por "${busca}" em "${filtro}"`);
  };

  const totalPaginas = Math.ceil(solicitacoes.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const itensVisiveis = solicitacoes.slice(indiceInicial, indiceInicial + itensPorPagina);

  const abrirModal = (solicitacao) => {
    setSolicitacaoSelecionada(solicitacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setSolicitacaoSelecionada(null);
  };

  const tratarSolicitacao = () => {
    if (solicitacaoSelecionada) {
      fecharModal();
      navigate(`/solicitacao/${solicitacaoSelecionada.id}`);
    }
  };

  return (
    <div className="page">
      {loading ? (
        <div className="loading-overlay">
          <img src="src/assets/salvador_logo.png" alt="Carregando..." className="loading-image" />
        </div>
      ) : (
        <>
          <header className="top-header">
            <h1 className="header-title">Ocorrências</h1>
            <button className="profile-button" aria-label="Perfil">
              <UserCircle size={28} />
            </button>
          </header>

          <div className="filtro-container">
            <label>
              <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                <option value="solicitacao">Solicitação</option>
                <option value="cpf">CPF</option>
                <option value="nome">Nome</option>
              </select>
            </label>
            <input
              type="text"
              placeholder="Digite sua busca..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button onClick={handleBuscar}>
              <Search size={18} /> Buscar
            </button>
          </div>

          <div className="container">
            <ul className="lista">
              {itensVisiveis.map((s) => (
                <li key={s.id} className="item" onClick={() => abrirModal(s)}>
                  <strong><User size={14} /> Nome: </strong>{s.nome}<br /> 
                  <span><Briefcase size={14} /> <strong>Tipo:</strong> </span>{s.tipo}<br />
                  <em className={`status ${s.status.toLowerCase()}`}>Status: {s.status}</em><br />
                  <em><Hash size={14} /> <strong>Protocolo: </strong>{s.protocolo}</em><br />
                  <em><MapPin size={14} /> <strong>Endereço: </strong> {s.endereco}</em>
                </li>
              ))}
            </ul>

            {totalPaginas > 1 && (
              <div className="paginacao">
                <button onClick={() => setPaginaAtual(1)} disabled={paginaAtual === 1}>Primeira</button>
                <button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>Anterior</button>
                <span>Página {paginaAtual} de {totalPaginas}</span>
                <button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>Próxima</button>
                <button onClick={() => setPaginaAtual(totalPaginas)} disabled={paginaAtual === totalPaginas}>Última</button>
              </div>
            )}
          </div>
        </>
      )}

      {modalAberto && solicitacaoSelecionada && (
        <div className="modal-overlay">
          <div className="modal">
            <h2><FileText size={20} /> Detalhes da Ocorrência</h2>
            <p><strong><User size={16} /> Nome:</strong> {solicitacaoSelecionada.nome}</p>
            <p><strong><Hash size={16} /> Protocolo:</strong> {solicitacaoSelecionada.protocolo}</p>
            <p><strong><Briefcase size={16} /> Tipo:</strong> {solicitacaoSelecionada.tipo}</p>
            <p><strong><MapPin size={16} /> Endereço:</strong> {solicitacaoSelecionada.endereco}</p>
            <p><strong><UserCircle size={16} /> Atendente:</strong> Rafael</p>
            <p><strong><Workflow size={16} /> Fluxo:</strong> #{solicitacaoSelecionada.id}2932873568235659</p>

            <div className="modal-buttons">
              <button className="btn-verde" onClick={tratarSolicitacao}>
                <CheckCircle2 size={16} /> Aceitar
              </button>
              <button className="btn-vermelho" onClick={fecharModal}>
                <XCircle size={16} /> Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solicitacao/:id" element={<DetalheSolicitacao />} />
      </Routes>
    </Router>
  );
}
