// Este arquivo define o que é uma "Tarefa"
// É como uma ficha de cadastro que mostra todos os campos que uma tarefa deve ter

export interface Tarefa {
  // Cada tarefa precisa ter esses 4 campos:
  id: number;           // Um número único para identificar (como um RG)
  titulo: string;      // O nome da tarefa
  descricao: string;   // Descrição do que precisa fazer
  concluida: boolean;  // Se já foi feita (true) ou não (false)
}