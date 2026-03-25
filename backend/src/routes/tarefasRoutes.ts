/**
 * Rotas de Tarefas - API REST
 *
 * Este arquivo define todas as rotas da API para operações CRUD de tarefas.
 * Cada rota corresponde a um método HTTP e uma ação específica.
 *
 * Rotas disponíveis:
 * - GET    /api/tarefas     - Lista todas as tarefas
 * - GET    /api/tarefas/:id - Busca uma tarefa específica
 * - POST   /api/tarefas     - Cria uma nova tarefa
 * - PUT    /api/tarefas/:id - Atualiza uma tarefa existente
 * - DELETE /api/tarefas/:id - Exclui uma tarefa
 *
 * @author Projeto Todo App
 * @version 1.0.0
 */

import { Router } from "express";

// Importa as funções do banco de dados
const db = require("../database/tarefas");

const router = Router();

// ============================================
// GET /api/tarefas
// Lista todas as tarefas cadastradas
// Retorna: Array de objetos Tarefa
// ============================================
router.get("/", (req: any, res: any) => {
  res.json(db.tarefas);
});

// ============================================
// GET /api/tarefas/:id
// Busca uma tarefa específica pelo ID
// Parâmetros: id (number) - ID da tarefa
// Retorna: Objeto Tarefa ou 404
// ============================================
router.get("/:id", (req: any, res: any) => {
  const id = parseInt(req.params.id);
  const tarefa = db.tarefas.find((t: any) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  res.json(tarefa);
});

// ============================================
// POST /api/tarefas
// Cria uma nova tarefa
// Corpo da requisição: { titulo: string, descricao: string }
// Retorna: Objeto Tarefa criada (201 Created)
// ============================================
router.post("/", (req: any, res: any) => {
  const { titulo, descricao } = req.body;

  if (!titulo) {
    return res.status(400).json({ mensagem: "Título é obrigatório" });
  }

  const novaTarefa = {
    id: db.gerarId(),
    titulo,
    descricao: descricao || "",
    concluida: false,
  };

  // Adiciona ao array e salva no arquivo JSON
  db.adicionarTarefa(novaTarefa);
  res.status(201).json(novaTarefa);
});

// ============================================
// PUT /api/tarefas/:id
// Atualiza uma tarefa existente
// Parâmetros: id (number) - ID da tarefa
// Corpo da requisição: { titulo?, descricao?, concluida? }
// Retorna: Objeto Tarefa atualizada ou 404
// ============================================
router.put("/:id", (req: any, res: any) => {
  const id = parseInt(req.params.id);
  const { titulo, descricao, concluida } = req.body;

  const tarefaAtualizada = db.atualizarTarefaBD(id, {
    titulo,
    descricao,
    concluida,
  });

  if (!tarefaAtualizada) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  res.json(tarefaAtualizada);
});

// ============================================
// DELETE /api/tarefas/:id
// Exclui uma tarefa pelo ID
// Parâmetros: id (number) - ID da tarefa
// Retorna: Mensagem de sucesso ou 404
// ============================================
router.delete("/:id", (req: any, res: any) => {
  const id = parseInt(req.params.id);

  const sucesso = db.excluirTarefaBD(id);

  if (!sucesso) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  res.json({ mensagem: "Tarefa excluída com sucesso" });
});

export default router;