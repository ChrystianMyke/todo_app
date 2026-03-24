// Este arquivo simula um banco de dados
// Um array simples para guardar as tarefas

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
}

// Nosso "banco de dados" em memória
export const tarefas: Tarefa[] = [
  {
    id: 1,
    titulo: "Aprender CRUD",
    descricao: "Entender Create, Read, Update, Delete",
    concluida: false,
  },
  {
    id: 2,
    titulo: "Fazer exercícios",
    descricao: "Praticar o que aprendeu",
    concluida: true,
  },
];

// Variável para gerar IDs automaticamente
export let proximoId = 3;

export function gerarId(): number {
  return proximoId++;
}