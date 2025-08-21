import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

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
          <label><b>📝 Relato:</b></label>
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
