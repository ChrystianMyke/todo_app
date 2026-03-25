/**
 * Módulo de Banco de Dados - Persistência de Tarefas
 *
 * Este arquivo implementa o sistema de persistência de dados usando o módulo 'fs' do Node.js.
 * As tarefas são salvas em um arquivo JSON, garantindo que não sejam perdidas ao reiniciar o servidor.
 *
 * @author Projeto Todo App
 * @version 1.0.0
 */

const fs = require("fs");
const path = require("path");

// Caminho do arquivo onde as tarefas são persistidas
const ARQUIVO_TAREFAS = path.join(__dirname, "tarefas.json");

// Armazenamento em memória (cache)
let tarefas = [];

// Contador para gerar IDs únicos
let proximoId = 1;

/**
 * Salva as tarefas e o próximo ID no arquivo JSON
 * Função síncrona que escreve no disco
 */
function salvarTarefas() {
  const dados = {
    tarefas,
    proximoId,
  };
  fs.writeFileSync(ARQUIVO_TAREFAS, JSON.stringify(dados, null, 2), "utf-8");
}

/**
 * Carrega as tarefas do arquivo JSON ao iniciar o servidor
 * Se o arquivo não existir, cria com dados iniciais padrão
 */
function carregarTarefas() {
  try {
    const dados = fs.readFileSync(ARQUIVO_TAREFAS, "utf-8");
    const parsed = JSON.parse(dados);
    tarefas = parsed.tarefas || [];
    proximoId = parsed.proximoId || 1;
    console.log("✅ Tarefas carregadas do arquivo!");
  } catch {
    // Arquivo não existe - criar com dados iniciais
    console.log("📝 Criando arquivo de tarefas...");
    tarefas = [
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
    proximoId = 3;
    salvarTarefas();
    console.log("✅ Arquivo de tarefas criado!");
  }
}

/**
 * Gera um novo ID único para uma tarefa
 * @returns {number} Novo ID sequencial
 */
function gerarId() {
  const id = proximoId;
  proximoId++;
  return id;
}

/**
 * Adiciona uma nova tarefa ao array e salva no arquivo
 * @param {Object} tarefa - Objeto contendo os dados da tarefa
 */
function adicionarTarefa(tarefa) {
  tarefas.push(tarefa);
  salvarTarefas();
}

/**
 * Atualiza uma tarefa existente pelo ID
 * @param {number} id - ID da tarefa a ser atualizada
 * @param {Object} dados - Objeto contendo os campos a serem atualizados
 * @returns {Object|null} Tarefa atualizada ou null se não encontrada
 */
function atualizarTarefaBD(id, dados) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index !== -1) {
    if (dados.titulo !== undefined) tarefas[index].titulo = dados.titulo;
    if (dados.descricao !== undefined) tarefas[index].descricao = dados.descricao;
    if (dados.concluida !== undefined) tarefas[index].concluida = dados.concluida;
    salvarTarefas();
    return tarefas[index];
  }
  return null;
}

/**
 * Exclui uma tarefa pelo ID
 * @param {number} id - ID da tarefa a ser excluída
 * @returns {boolean} True se excluiu, false se não encontrou
 */
function excluirTarefaBD(id) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index !== -1) {
    tarefas.splice(index, 1);
    salvarTarefas();
    return true;
  }
  return false;
}

/**
 * Retorna todas as tarefas
 * @returns {Array} Array de tarefas
 */
function getTarefas() {
  return tarefas;
}

// Exportação das funções e variáveis para uso em outros módulos
module.exports = {
  carregarTarefas,
  gerarId,
  adicionarTarefa,
  atualizarTarefaBD,
  excluirTarefaBD,
  get tarefas() {
    return tarefas;
  },
  set tarefas(val) {
    tarefas = val;
  },
  getTarefas,
  setProximoId: (val) => { proximoId = val; },
  getProximoId: () => proximoId,
};