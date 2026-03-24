// Este arquivo é como um "garçom" que leva pedidos entre o frontend e o backend
// Ele faz a conexão (pedidos HTTP) com as rotas que criamos no backend

import type { Tarefa } from "../types/tarefa";

// O endereço do nosso backend (onde ele está rodando)
const API_URL = "http://localhost:3000/api/tarefas";

// ============================================
// READ - Pegar todas as tarefas (GET)
// É como pedir ao garçom: "Me mostra todas as tarefas do cardápio"
// ============================================
export async function buscarTarefas(): Promise<Tarefa[]> {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar tarefas: ${resposta.status}`);
  }
  return resposta.json();
}

// ============================================
// READ - Pegar uma tarefa pelo ID (GET)
// É como pedir: "Me mostra só essa tarefa específica"
// ============================================
export async function buscarTarefaPorId(id: number): Promise<Tarefa> {
  const resposta = await fetch(`${API_URL}/${id}`);
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar tarefa: ${resposta.status}`);
  }
  return resposta.json();
}

// ============================================
// CREATE - Criar nova tarefa (POST)
// É como fazer um novo pedido: "Quero adicionar isso ao cardápio"
// ============================================
export async function criarTarefa(tarefa: Omit<Tarefa, "id">): Promise<Tarefa> {
  const resposta = await fetch(API_URL, {
    method: "POST", // Diz que queremos CRIAR algo novo
    headers: {
      "Content-Type": "application/json", // Diz que estamos enviando JSON
    },
    body: JSON.stringify(tarefa), // Transforma os dados em texto para enviar
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || `Erro ao criar tarefa: ${resposta.status}`);
  }

  return resposta.json();
}

// ============================================
// UPDATE - Atualizar tarefa (PUT)
// É como pedir para o garçom: "Muda isso no pedido"
// ============================================
export async function atualizarTarefa(
  id: number,
  dados: Partial<Tarefa>
): Promise<Tarefa> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PUT", // Diz que queremos ATUALIZAR algo
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || `Erro ao atualizar tarefa: ${resposta.status}`);
  }

  return resposta.json();
}

// ============================================
// DELETE - Excluir tarefa (DELETE)
// É como pedir para o garçom: "Tira isso do cardápio"
// ============================================
export async function excluirTarefa(id: number): Promise<void> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE", // Diz que queremos DELETAR algo
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || `Erro ao excluir tarefa: ${resposta.status}`);
  }
}