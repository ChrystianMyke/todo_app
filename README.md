# To-do App

Aplicação de gerenciamento de tarefas estilo Evernote, desenvolvida com React, TypeScript e Node.js.

## 🚀 Funcionalidades

- **CRUD Completo** - Criar, listar, atualizar e excluir tarefas
- **Persistência de Dados** - Tarefas salvas em arquivo JSON
- **Tema Claro/Escuro** - Alternância entre modos com persistência
- **Design Estilo Evernote** - Interface limpa e intuitiva
- **Layout Responsivo** - Funciona em desktop, tablet e celular
- **Buscar Tarefas** - Filtrar tarefas por título ou descrição

## 🛠️ Tecnologias

### Frontend
- React
- TypeScript
- Vite
- CSS Variables

### Backend
- Node.js
- Express
- CORS
- File System (fs)

## 📦 Instalação

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estará em execução em `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará em execução em `http://localhost:5173`

## 📡 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tarefas` | Listar todas as tarefas |
| GET | `/api/tarefas/:id` | Buscar tarefa por ID |
| POST | `/api/tarefas` | Criar nova tarefa |
| PUT | `/api/tarefas/:id` | Atualizar tarefa |
| DELETE | `/api/tarefas/:id` | Excluir tarefa |
| GET | `/api/health` | Verificar status do servidor |

## 📁 Estrutura do Projeto

```
todo_app/
├── backend/
│   └── src/
│       ├── database/
│       │   ├── tarefas.js    # Persistência JSON
│       │   └── tarefas.json  # Arquivo de dados
│       ├── routes/
│       │   └── tarefasRoutes.ts
│       └── index.ts          # Servidor Express
│
└── frontend/
    └── src/
        ├── api/
        │   └── tarefas.ts    # Comunicação com API
        ├── components/
        │   └── TarefaCard.tsx
        ├── types/
        │   └── tarefa.ts
        ├── App.tsx
        ├── App.css
        ├── index.css
        └── main.tsx
```

## 👤 Autor

Chrystian Myke

## 📝 Licença

MIT