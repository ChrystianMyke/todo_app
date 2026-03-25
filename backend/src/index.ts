/**
 * Servidor Principal - Todo App Backend
 *
 * Este é o ponto de entrada da aplicação backend.
 * Configura o Express, CORS, JSON parsing e inicia o servidor.
 *
 * Endpoints disponíveis:
 * - GET  /api/tarefas     - Listar todas as tarefas
 * - GET  /api/tarefas/:id - Buscar tarefa por ID
 * - POST /api/tarefas     - Criar nova tarefa
 * - PUT  /api/tarefas/:id - Atualizar tarefa
 * - DELETE /api/tarefas/:id - Excluir tarefa
 * - GET  /api/health      - Verificar status do servidor
 *
 * @author Projeto Todo App
 * @version 1.0.0
 */

import express from 'express';
import cors from 'cors';
import tarefasRoutes from './routes/tarefasRoutes';

// Importa a função de carregar tarefas do banco de dados
const carregarTarefas = require('./database/tarefas').carregarTarefas;

// Inicializa o aplicativo Express
const app = express();
const PORT = 3000;

// Middleware: Permite requisições de qualquer origem (CORS)
app.use(cors());

// Middleware: Parser JSON para requisições com corpo
app.use(express.json());

// ===== ROTAS DA API =====

// Rotas de tarefas (CRUD completo)
app.use('/api/tarefas', tarefasRoutes);

// Rota de health check - verifica se o servidor está online
app.get('/api/health', (req: any, res: any) => {
  res.status(200).json({ status: 'OK' });
});

// ===== INICIALIZAÇÃO =====

// Carrega as tarefas salvas ao iniciar o servidor
carregarTarefas();

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});