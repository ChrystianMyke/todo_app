/**
 * Aplicação Principal - Todo App
 *
 * Este componente React é o ponto de entrada principal da aplicação de tarefas.
 * Gerencia o estado global das tarefas, formulário de criação, busca e tema.
 *
 * @component
 * @author Projeto Todo App
 * @version 1.0.0
 */

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

/**
 * Componente Principal da Aplicação
 *
 * Gerencia o estado das tarefas e rendering da interface do usuário.
 * Inclui funcionalidades de CRUD, busca e alternância de tema.
 */
function App() {
  /** Lista de tarefas carregadas do backend */
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  /** Título da nova tarefa (formulário) */
  const [novoTitulo, setNovoTitulo] = useState("");

  /** Descrição da nova tarefa (formulário) */
  const [novaDescricao, setNovaDescricao] = useState("");

  /** Status de carregamento dos dados */
  const [carregando, setCarregando] = useState(true);

  /** Termo de busca para filtrar tarefas */
  const [busca, setBusca] = useState("");

  /** Tema atual da aplicação (claro/escuro) */
  const [tema, setTema] = useState<"light" | "dark">("light");

  /**
   * Alterna entre os temas claro e escuro
   * Salva a preferência no localStorage para persistência
   */
  function alternarTema() {
    const novoTema = tema === "light" ? "dark" : "light";
    setTema(novoTema);
    document.documentElement.setAttribute("data-theme", novoTema);
    localStorage.setItem("tema", novoTema);
  }

  /**
   * Effect hook para carregar o tema salvo ao iniciar a aplicação
   * Recupera a preferência do usuário do localStorage
   */
  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema") as "light" | "dark" | null;
    if (temaSalvo) {
      setTema(temaSalvo);
      document.documentElement.setAttribute("data-theme", temaSalvo);
    }
  }, []);

  /**
   * Effect hook para carregar tarefas ao iniciar a aplicação
   * Executa uma única vez quando o componente é montado
   */
  useEffect(() => {
    carregarTarefas();
  }, []);

  /**
   * Carrega todas as tarefas do backend
   * Atualiza o estado local com os dados recebidos
   */
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

  /**
   * Filtra as tarefas pelo termo de busca
   * Pesquisa tanto no título quanto na descrição
   */
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const termoBusca = busca.toLowerCase();
    return (
      tarefa.titulo.toLowerCase().includes(termoBusca) ||
      tarefa.descricao.toLowerCase().includes(termoBusca)
    );
  });

  /**
   * Cria uma nova tarefa no backend
   * Adiciona a tarefa retornada à lista local
   *
   * @param e - Evento do formulário
   */
  async function handleAdicionarTarefa(e: React.FormEvent) {
    e.preventDefault();

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

      setTarefas([...tarefas, novaTarefa]);

      setNovoTitulo("");
      setNovaDescricao("");
    } catch (erro: any) {
      console.error("Erro ao criar tarefa:", erro);
      alert("Erro ao criar tarefa: " + erro.message);
    }
  }

  /**
   * Atualiza o status de conclusão de uma tarefa
   * Envia a atualização para o backend e atualiza o estado local
   *
   * @param id - ID da tarefa a ser atualizada
   * @param concluida - Novo status de conclusão
   */
  async function handleAtualizarTarefa(id: number, concluida: boolean) {
    try {
      const tarefaAtualizada = await atualizarTarefa(id, { concluida });

      setTarefas(
        tarefas.map((t) =>
          t.id === id ? tarefaAtualizada : t
        )
      );
    } catch (erro: any) {
      console.error("Erro ao atualizar tarefa:", erro);
      alert("Erro ao atualizar tarefa: " + erro.message);
    }
  }

  /**
   * Exclui uma tarefa do sistema
   * Requer confirmação do usuário antes da exclusão
   *
   * @param id - ID da tarefa a ser excluída
   */
  async function handleExcluirTarefa(id: number) {
    if (!confirm("Tem certeza que quer excluir esta tarefa?")) {
      return;
    }

    try {
      await excluirTarefa(id);

      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (erro: any) {
      console.error("Erro ao excluir tarefa:", erro);
      alert("Erro ao excluir tarefa: " + erro.message);
    }
  }

  /**
   * Renderização do componente principal
   * Exibe o header estilo Evernote, duas colunas e footer
   */
  return (
    <>
      {/* Header Estilo Evernote */}
      <header className="app-header-evernote">
        <div className="logo">
          <div className="logo-icon">📝</div>
          <span className="logo-text">Tarefas</span>
        </div>

        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar tarefas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="user-menu">
          <button
            className="theme-toggle"
            onClick={alternarTema}
            title={tema === "light" ? "Modo escuro" : "Modo claro"}
          >
            {tema === "light" ? "🌙" : "☀️"}
          </button>
          <div className="user-avatar">U</div>
        </div>
      </header>

      {/* Conteúdo Principal com duas colunas */}
      <main className="main-content">
        {/* Coluna da esquerda - Lista de tarefas */}
        <div className="tarefas-column">
          {/* Título */}
          <header className="app-header">
            <h1 className="app-title">Minhas Tarefas</h1>
            <p className="app-subtitle">
              {tarefas.length} tarefa{tarefas.length !== 1 ? 's' : ''} no total
            </p>
          </header>

          {/* Se estiver carregando, mostra uma mensagem */}
          {carregando ? (
            <p className="loading">Carregando tarefas...</p>
          ) : (
            <>
              {/* Lista de tarefas */}
              {tarefasFiltradas.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📋</div>
                  <p className="empty-state-text">
                    {busca
                      ? "Nenhuma tarefa encontrada para sua busca."
                      : "Nenhuma tarefa ainda. Adicione uma abaixo!"}
                  </p>
                </div>
              ) : (
                <div className="tarefas-list">
                  {tarefasFiltradas.map((tarefa) => (
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
        </div>

        {/* Coluna da direita - Formulário */}
        <div className="formulario-column">
          {/* Formulário para adicionar nova tarefa */}
          <div className="formulario-container">
            <h2 className="formulario-titulo">
              ➕ Nova Tarefa
            </h2>
            <form onSubmit={handleAdicionarTarefa}>
              <div className="formulario-grupo">
                <label className="formulario-label">
                  Título:
                </label>
                <input
                  type="text"
                  value={novoTitulo}
                  onChange={(e) => setNovoTitulo(e.target.value)}
                  placeholder="O que você precisa fazer?"
                  className="formulario-input"
                />
              </div>

              <div className="formulario-grupo">
                <label className="formulario-label">
                  Descrição:
                </label>
                <textarea
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  placeholder="Mais detalhes (opcional)"
                  rows={3}
                  className="formulario-textarea"
                />
              </div>

              <button
                type="submit"
                className="formulario-botao"
              >
                Adicionar Tarefa
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="app-footer">
        <p>App de Tarefas - Chrystian Myke</p>
      </footer>
    </>
  );
}

export default App;