import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DetalheSolicitacao.css';


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
          
    ];
    const item = solicitacoes.find(s => s.id === parseInt(id));
    setDados(item);
  }, [id]);

  const handleRelatoChange = (e) => {
    setDados(prev => ({ ...prev, relato: e.target.value }));
  };

  const handleFotoUpload = (e) => {
    const arquivos = Array.from(e.target.files);
    setDados(prev => ({
      ...prev,
      fotos: [...(prev.fotos || []), ...arquivos.map(f => URL.createObjectURL(f))]
    }));
  };

  const handleStatusChange = (novoStatus) => {
    setDados(prev => ({ ...prev, status: novoStatus }));
  };

  if (!dados) return <div className="container"><p>Carregando detalhes...</p></div>;

  return (
    <div className="container">
      <div className="detalhe-card">
        <h2>🔍 Tratar Solicitação #{dados.id}</h2>

        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => navigate(-1)} className="btn voltar">⬅️ Voltar</button>
        </div>

        <div className="info-section">
          <p><b>👤 Nome:</b> {dados.nome}</p>
          <p><b>📂 Tipo:</b> {dados.tipo}</p>
          <p><b>📌 Status:</b> {dados.status}</p>
          <p><b>🧾 Protocolo:</b> {dados.protocolo}</p>
          <p><b>📍 Endereço:</b> {dados.endereco}</p>
        </div>

        <div className="botoes">
          <button className="btn aceitar" onClick={() => handleStatusChange('Concluido')}>✔️ Tratar Solicitação</button>
          <button className="btn rejeitar" onClick={() => handleStatusChange('Rejeitado')}>❌ Dispensar</button>
        </div>

        <div className="form-section">
          <label><b>📝 Relato do Serviço:</b></label>
          <textarea
            placeholder="Descreva o atendimento..."
            value={dados.relato || ''}
            onChange={handleRelatoChange}
          ></textarea>
        </div>

        <div className="form-section">
          <label><b>📷 Adicionar Fotos:</b></label>
          <input type="file" multiple accept="image/*" onChange={handleFotoUpload} />
          {dados.fotos?.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '1rem' }}>
              {dados.fotos.map((foto, idx) => (
                <img key={idx} src={foto} alt={`foto-${idx}`} style={{ width: '100px', borderRadius: '8px', objectFit: 'cover' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalheSolicitacao;
