import { Router } from "express";
import { tarefas, gerarId } from "../database/tarefas";

const router = Router();

// ============================================
// READ - Listar todas as tarefas (GET)
// ============================================
router.get("/", (req, res) => {
  res.json(tarefas);
});

// ============================================
// READ - Buscar uma tarefa pelo ID (GET)
// ============================================
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  res.json(tarefa);
});

// ============================================
// CREATE - Criar nova tarefa (POST)
// ============================================
router.post("/", (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo) {
    return res.status(400).json({ mensagem: "Título é obrigatório" });
  }

  const novaTarefa = {
    id: gerarId(),
    titulo,
    descricao: descricao || "",
    concluida: false,
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// ============================================
// UPDATE - Atualizar tarefa (PUT)
// ============================================
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descricao, concluida } = req.body;

  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  // Atualiza apenas os campos que forem enviados
  if (titulo) tarefa.titulo = titulo;
  if (descricao !== undefined) tarefa.descricao = descricao;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json(tarefa);
});

// ============================================
// DELETE - Excluir tarefa (DELETE)
// ============================================
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tarefas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  // Remove a tarefa do array
  tarefas.splice(indice, 1);

  res.json({ mensagem: "Tarefa excluída com sucesso" });
});

export default router;