/**
 * Componente TarefaCard - Card de Visualização de Tarefa
 *
 * Este componente React renders um card individual de tarefa.
 * Exibe o checkbox de conclusão, título, descrição e botão de exclusão.
 *
 * @component
 * @prop {Tarefa} tarefa - Objeto contendo os dados da tarefa
 * @prop {Function} onAtualizar - Callback para atualizar o status de conclusão
 * @prop {Function} onExcluir - Callback para excluir a tarefa
 *
 * @author Projeto Todo App
 * @version 1.0.0
 */

import type { Tarefa } from "../types/tarefa";

/**
 * Props do componente TarefaCard
 */
interface TarefaCardProps {
  /**
   * Dados da tarefa a ser exibida
   */
  tarefa: Tarefa;

  /**
   * Função chamada ao marcar/desmarcar a tarefa
   * @param id - ID da tarefa
   * @param concluida - Novo status de conclusão
   */
  onAtualizar: (id: number, concluida: boolean) => void;

  /**
   * Função chamada ao clicar no botão de excluir
   * @param id - ID da tarefa a ser excluída
   */
  onExcluir: (id: number) => void;
}

/**
 * Componente funcional TarefaCard
 * Renderiza um card de tarefa com checkbox, título, descrição e botão de exclusão
 */
export function TarefaCard({ tarefa, onAtualizar, onExcluir }: TarefaCardProps) {
  return (
    <div className={`tarefa-card ${tarefa.concluida ? 'concluida' : ''}`}>
      {/* Checkbox para marcar como concluída */}
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={(e) => onAtualizar(tarefa.id, e.target.checked)}
        className="tarefa-checkbox"
        title={tarefa.concluida ? "Marcar como não concluída" : "Marcar como concluída"}
      />

      {/* Conteúdo da tarefa (título e descrição) */}
      <div className="tarefa-conteudo">
        <h3 className="tarefa-titulo">
          {tarefa.titulo}
        </h3>

        {/* Descrição - apenas exibida se existir */}
        {tarefa.descricao && (
          <p className="tarefa-descricao">
            {tarefa.descricao}
          </p>
        )}
      </div>

      {/* Botão de ações (excluir) */}
      <div className="tarefa-acoes">
        <button
          onClick={() => onExcluir(tarefa.id)}
          className="btn-excluir"
          title="Excluir tarefa"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}