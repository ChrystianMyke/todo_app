import express from 'express';
import cors from 'cors';
import tarefasRoutes from './routes/tarefasRoutes';

const carregarTarefas = require('./database/tarefas').carregarTarefas;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/tarefas', tarefasRoutes);

app.get('/api/health', (req: any, res: any) => {
  res.status(200).json({ status: 'OK' });
});

// Carregar as tarefas ao iniciar
carregarTarefas();

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});