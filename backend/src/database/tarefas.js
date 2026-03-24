// Este arquivo simula um banco de dados
// Usa o módulo 'fs' do Node.js para salvar as tarefas em um arquivo JSON
// Assim as tarefas não somem quando o servidor reinicia!

const fs = require("fs");
const path = require("path");

// Caminho do arquivo onde vamos salvar as tarefas
const ARQUIVO_TAREFAS = path.join(__dirname, "tarefas.json");

// Nosso "banco de dados" em memória
let tarefas = [];

// Variável para gerar IDs automaticamente
let proximoId = 1;

// ============================================
// Funções para salvar e carregar do arquivo
// ============================================

// Salvar as tarefas no arquivo JSON (versão síncrona)
function salvarTarefas() {
  const dados = {
    tarefas,
    proximoId,
  };
  fs.writeFileSync(ARQUIVO_TAREFAS, JSON.stringify(dados, null, 2), "utf-8");
}

// Carregar as tarefas do arquivo JSON (versão síncrona)
// Se o arquivo não existir, usa os dados padrão
function carregarTarefas() {
  try {
    const dados = fs.readFileSync(ARQUIVO_TAREFAS, "utf-8");
    const parsed = JSON.parse(dados);
    tarefas = parsed.tarefas || [];
    proximoId = parsed.proximoId || 1;
    console.log("✅ Tarefas carregadas do arquivo!");
  } catch {
    // Se o arquivo não existe, cria com dados padrão
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

// Função para gerar novo ID
function gerarId() {
  const id = proximoId;
  proximoId++;
  return id;
}

// ============================================
// Funções auxiliares que também salvam no arquivo
// ============================================

// Adicionar uma nova tarefa e salvar
function adicionarTarefa(tarefa) {
  tarefas.push(tarefa);
  salvarTarefas(); // Salva automaticamente após adicionar
}

// Atualizar uma tarefa e salvar
function atualizarTarefaBD(id, dados) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index !== -1) {
    if (dados.titulo !== undefined) tarefas[index].titulo = dados.titulo;
    if (dados.descricao !== undefined) tarefas[index].descricao = dados.descricao;
    if (dados.concluida !== undefined) tarefas[index].concluida = dados.concluida;
    salvarTarefas(); // Salva automaticamente após atualizar
    return tarefas[index];
  }
  return null;
}

// Excluir uma tarefa e salvar
function excluirTarefaBD(id) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index !== -1) {
    tarefas.splice(index, 1);
    salvarTarefas(); // Salva automaticamente após excluir
    return true;
  }
  return false;
}

// Função para obter todas as tarefas
function getTarefas() {
  return tarefas;
}

// Exportar tudo diretamente
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