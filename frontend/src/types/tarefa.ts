/**
 * Interface Tarefa - Define a estrutura de dados de uma tarefa
 *
 * Esta interface representa o modelo de dados de uma tarefa no sistema.
 * Used throughout the application to ensure type safety.
 *
 * @interface Tarefa
 * @property {number} id - Identificador único da tarefa
 * @property {string} titulo - Título/nome da tarefa
 * @property {string} descricao - Descrição detalhada da tarefa
 * @property {boolean} concluida - Status de conclusão da tarefa
 *
 * @author Projeto Todo App
 * @version 1.0.0
 */

export interface Tarefa {
  /**
   * Identificador único da tarefa
   * Gerado automaticamente pelo servidor
   */
  id: number;

  /**
   * Título da tarefa
   * Campo obrigatório
   */
  titulo: string;

  /**
   * Descrição detalhada da tarefa
   * Campo opcional
   */
  descricao: string;

  /**
   * Status de conclusão
   * true = tarefa concluída, false = tarefa pendente
   */
  concluida: boolean;
}