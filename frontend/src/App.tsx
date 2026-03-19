// Este é o arquivo principal da nossa aplicação de tarefas!
// É aqui que tudo se conecta: as tarefas, os botões, o formulário...

import { useState, useEffect } from "react";
import type { Tarefa } from "./types/tarefa";
import { TarefaCard } from "./components/TarefaCard";
import {
  buscarTarefas,
  criarTarefa,
  atualizarTarefa,
  excluirTarefa,
} from "./api/tarefas";
import "./App.css";

function App() {
  // Estado para guardar a lista de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Estado para o formulário de nova tarefa
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  // Estado de carregamento
  const [carregando, setCarregando] = useState(true);

  // ============================================
  // useEffect: roda quando a página abre
  // Busca as tarefas do backend
  // ============================================
  useEffect(() => {
    carregarTarefas();
  }, []);

  // Função para buscar todas as tarefas
  async function carregarTarefas() {
    try {
      const dados = await buscarTarefas();
      setTarefas(dados);
    } catch (erro) {
      console.error("Erro ao carregar tarefas:", erro);
    } finally {
      setCarregando(false);
    }
  }

  // ============================================
  // CREATE: Adicionar nova tarefa
  // ============================================
  async function handleAdicionarTarefa(e: React.FormEvent) {
    e.preventDefault(); // Evita recarregar a página

    if (!novoTitulo.trim()) {
      alert("O título é obrigatório!");
      return;
    }

    try {
      const novaTarefa = await criarTarefa({
        titulo: novoTitulo,
        descricao: novaDescricao,
        concluida: false,
      });

      // Adiciona a nova tarefa na lista (sem precisar recarregar)
      setTarefas([...tarefas, novaTarefa]);

      // Limpa o formulário
      setNovoTitulo("");
      setNovaDescricao("");
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);
    }
  }

  // ============================================
  // UPDATE: Marcar tarefa como concluída (ou não)
  // ============================================
  async function handleAtualizarTarefa(id: number, concluida: boolean) {
    try {
      const tarefaAtualizada = await atualizarTarefa(id, { concluida });

      // Atualiza só a tarefa específica na lista
      setTarefas(
        tarefas.map((t) =>
          t.id === id ? tarefaAtualizada : t
        )
      );
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
    }
  }

  // ============================================
  // DELETE: Excluir tarefa
  // ============================================
  async function handleExcluirTarefa(id: number) {
    if (!confirm("Tem certeza que quer excluir esta tarefa?")) {
      return;
    }

    try {
      await excluirTarefa(id);

      // Remove a tarefa da lista (sem precisar recarregar)
      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro);
    }
  }

  // ============================================
  // Renderização da página
  // ============================================
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🎯 Minhas Tarefas</h1>

      {/* Se estiver carregando, mostra uma mensagem */}
      {carregando ? (
        <p style={{ textAlign: "center" }}>Carregando tarefas...</p>
      ) : (
        <>
          {/* Lista de tarefas */}
          {tarefas.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>
              Nenhuma tarefa ainda. Adicione uma abaixo! 👇
            </p>
          ) : (
            <div>
              {tarefas.map((tarefa) => (
                <TarefaCard
                  key={tarefa.id}
                  tarefa={tarefa}
                  onAtualizar={handleAtualizarTarefa}
                  onExcluir={handleExcluirTarefa}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Formulário para adicionar nova tarefa */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#333" }}>➕ Adicionar Nova Tarefa</h2>
        <form onSubmit={handleAdicionarTarefa}>
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}
            >
              Título:
            </label>
            <input
              type="text"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              placeholder="O que você precisa fazer?"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}
            >
              Descrição:
            </label>
            <textarea
              value={novaDescricao}
              onChange={(e) => setNovaDescricao(e.target.value)}
              placeholder="Mais detalhes (opcional)"
              rows={3}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Adicionar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;