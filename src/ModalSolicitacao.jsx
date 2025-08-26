// ModalSolicitacao.jsx
import './ModalSolicitacao.css';

export default function ModalSolicitacao({ solicitacao, onClose, onAceitar, onFechar }) {
  if (!solicitacao) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>📄 Detalhes da Ocorrência</h2>
        <p><b>🆔 Fluxo:</b> FLUXO-{solicitacao.id.toString().padStart(4, '0')}</p>
        <p><b>👨‍💼 Atendente:</b> João Silva</p>
        <hr />
        <p><b>👤 Nome:</b> {solicitacao.nome}</p>
        <p><b>📂 Tipo:</b> {solicitacao.tipo}</p>
        <p><b>📌 Status:</b> {solicitacao.status}</p>
        <p><b>🧾 Protocolo:</b> {solicitacao.protocolo}</p>
        <p><b>📍 Endereço:</b> {solicitacao.endereco}</p>

        <div className="modal-buttons">
          <button className="btn aceitar" onClick={onAceitar}>🟢 Aceitar</button>
          <button className="btn rejeitar" onClick={onFechar}>🔴 Fechar</button>
        </div>
        <button className="btn fechar-modal" onClick={onClose}>❌ Sair</button>
      </div>
    </div>
  );
}
