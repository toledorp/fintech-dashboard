# 💰 Fintech Dashboard

Dashboard financeiro moderno para controle de receitas e despesas, com visual analítico, filtros inteligentes e integração com API mock.

---

## 🚀 Funcionalidades

### 🔐 Autenticação

* Login mock (usuário: **admin | senha: 123456**)
* Geração de token simulado
* Armazenamento no Redux Toolkit
* Proteção de rotas privadas
* Logout com limpeza de estado

---

### 📊 Dashboard Financeiro

* Resumo financeiro:

  * Entradas
  * Saídas
  * Saldo total
* Gráfico comparativo (Recharts)
* Atualização automática dos dados

---

### 💸 Transações

* Listagem de transações
* Criação de nova transação
* Edição de transações
* Exclusão de transações
* Atualização automática com React Query (invalidate cache)

---

### 🔎 Filtros

* Busca por descrição
* Filtro por tipo (entrada/saída)
* Filtro por mês

---

### 🎨 Interface

* Layout estilo dashboard
* Responsivo (mobile e desktop)
* Dark mode com persistência
* Feedback com toast (sucesso e erro)
* Loading visual durante requisições

---

## 🛠️ Tecnologias utilizadas

* React + TypeScript
* Vite
* Redux Toolkit
* TanStack Query (React Query)
* React Router
* Axios
* React Hook Form + Zod
* React Toastify
* Recharts
* JSON Server (API mock)

---

## 📡 API (Mock)

Utilizando JSON Server com `db.json`.

Endpoints:

* `GET /transactions`
* `POST /transactions`
* `PUT /transactions/:id`
* `DELETE /transactions/:id`

---

## ▶️ Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar aplicação + API

```bash
npm run dev
```

---

## 🔑 Login de acesso

```txt
Usuário: admin
Senha: 123456
```

---

## 📁 Estrutura do projeto

```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── services/
 ├── store/
 ├── types/
 └── utils/
```

---

## 🧠 Decisões técnicas

* Uso de React Query para cache e sincronização
* Redux Toolkit para estado global (auth e tema)
* Separação de responsabilidades por camadas
* Hooks customizados para lógica reutilizável
* API mock com JSON Server para simular backend

---

## ⚠️ Limitações

* Autenticação mock (sem backend real)
* Cadastro de usuário não persistido no banco
* Sem testes automatizados

---

## 📸 Preview

👉 (adicione aqui um print da aplicação)

---

## 👨‍💻 Autor

Desenvolvido por **Rogerio Pupo**
