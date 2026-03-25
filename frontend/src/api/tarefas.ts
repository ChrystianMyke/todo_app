/**
 * Módulo de Comunicação com API - Tarefas
 *
 * Este arquivo contém todas as funções para comunicação com o backend.
 * Cada função representa uma operação CRUD e faz uma chamada HTTP para a API.
 *
 * API Base URL: http://localhost:3000/api/tarefas
 *
 * @author Projeto Todo App
 * @version 1.0.0
 */

import type { Tarefa } from "../types/tarefa";

// URL base da API do backend
const API_URL = "http://localhost:3000/api/tarefas";

// ============================================
// GET - Buscar todas as tarefas
// Método HTTP: GET
// Endpoint: /api/tarefas
// Retorna: Array de Tarefa[]
// ============================================
export async function buscarTarefas(): Promise<Tarefa[]> {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar tarefas: ${resposta.status}`);
  }
  return resposta.json();
}

// ============================================
// GET - Buscar tarefa por ID
// Método HTTP: GET
// Endpoint: /api/tarefas/:id
// Parâmetros: id (number)
// Retorna: Objeto Tarefa
// ============================================
export async function buscarTarefaPorId(id: number): Promise<Tarefa> {
  const resposta = await fetch(`${API_URL}/${id}`);
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar tarefa: ${resposta.status}`);
  }
  return resposta.json();
}

// ============================================
// POST - Criar nova tarefa
// Método HTTP: POST
// Endpoint: /api/tarefas
// Corpo: { titulo: string, descricao: string, concluida: boolean }
// Retorna: Objeto Tarefa criada
// ============================================
export async function criarTarefa(tarefa: Omit<Tarefa, "id">): Promise<Tarefa> {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || `Erro ao criar tarefa: ${resposta.status}`);
  }

  return resposta.json();
}

// ============================================
// PUT - Atualizar tarefa
// Método HTTP: PUT
// Endpoint: /api/tarefas/:id
// Parâmetros: id (number)
// Corpo: { titulo?, descricao?, concluida? }
// Retorna: Objeto Tarefa atualizada
// ============================================
export async function atualizarTarefa(
  id: number,
  dados: Partial<Tarefa>
): Promise<Tarefa> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
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
// DELETE - Excluir tarefa
// Método HTTP: DELETE
// Endpoint: /api/tarefas/:id
// Parâmetros: id (number)
// Retorna: void
// ============================================
export async function excluirTarefa(id: number): Promise<void> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || `Erro ao excluir tarefa: ${resposta.status}`);
  }
}