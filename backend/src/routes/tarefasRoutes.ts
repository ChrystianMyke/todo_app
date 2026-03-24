import { Router } from "express";

const db = require("../database/tarefas");

const router = Router();

// ============================================
// READ - Listar todas as tarefas (GET)
// ============================================
router.get("/", (req: any, res: any) => {
  res.json(db.tarefas);
});

// ============================================
// READ - Buscar uma tarefa pelo ID (GET)
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
// CREATE - Criar nova tarefa (POST)
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

  db.adicionarTarefa(novaTarefa); // Adiciona e salva no arquivo
  res.status(201).json(novaTarefa);
});

// ============================================
// UPDATE - Atualizar tarefa (PUT)
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
// DELETE - Excluir tarefa (DELETE)
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