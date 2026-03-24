// Este componente mostra uma única tarefa na tela
// É como um "card" ou "cartão" de tarefa

import type { Tarefa } from "../types/tarefa";

interface TarefaCardProps {
  tarefa: Tarefa; // A tarefa que vai ser mostrada
  onAtualizar: (id: number, concluida: boolean) => void; // Função para atualizar
  onExcluir: (id: number) => void; // Função para excluir
}

export function TarefaCard({ tarefa, onAtualizar, onExcluir }: TarefaCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: tarefa.concluida ? "#f0f0f0" : "white",
      }}
      >
      {/* Checkbox para marcar como concluída */}
      <input 
        type="checkbox"
        checked={tarefa.concluida}
        onChange={(e) => onAtualizar(tarefa.id, e.target.checked)}
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      />

      {/* Informações da tarefa */}
      <div style={{ flex: 1 }}>
        {/* Título da tarefa */}
        <h3
          style={{
            margin: "0 0 4px 0",
            textDecoration: tarefa.concluida ? "line-through" : "none",
            color: tarefa.concluida ? "#888" : "#333",
          }}
        >
          {tarefa.titulo}
        </h3>

        {/* Descrição da tarefa */}
        {tarefa.descricao && (
          <p
            style={{
              margin: 0,
              color: "#666",
              fontSize: "14px",
            }}
          >
            {tarefa.descricao}
          </p>
        )}
      </div>

      {/* Botão para excluir */}
      <button
        onClick={() => onExcluir(tarefa.id)}
        style={{
          backgroundColor: "#ff4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        🗑️
      </button>
    </div>
  );
}