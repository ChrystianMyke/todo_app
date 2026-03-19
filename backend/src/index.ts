import express from 'express';
import cors from 'cors';
import tarefasRoutes from './routes/tarefasRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/tarefas', tarefasRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});