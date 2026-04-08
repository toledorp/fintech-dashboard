# 💰 Fintech Dashboard

Dashboard financeiro moderno para controle de receitas e despesas, com visual analítico, filtros inteligentes e integração com API simulada.

---

## 🚀 Funcionalidades

### 🔐 Autenticação

* Tela de login
* Controle de usuário via estado global
* Proteção de rotas

### 📊 Dashboard Financeiro

* Resumo financeiro:

  * Entradas
  * Saídas
  * Saldo atual
* Gráfico comparativo (Entradas vs Saídas)
* Análise de movimentações

### 💸 Transações

* Listagem de transações
* Criação de nova transação
* Edição de transações
* Exclusão de transações
* Badge visual (Entrada / Saída)

### 🔎 Filtros inteligentes

* Busca por descrição
* Filtro por tipo (Entrada / Saída)
* Filtro por mês

### 🎨 Interface (UI/UX)

* Layout moderno estilo dashboard
* Sidebar simplificada
* Botão de nova transação reposicionado (melhor UX)
* Histórico com scroll interno
* Melhor aproveitamento de espaço

### 🌙 Tema Dark Mode

* Alternância entre tema claro e escuro
* Persistência de tema

---

## 🛠️ Tecnologias utilizadas

* React + TypeScript
* Vite
* Context API / Hooks
* JSON Server (API fake)
* CSS customizado (design system próprio)

---

## 📡 API (Mock)

Utilizando JSON Server:

```bash
npx json-server --watch db.json --port 3001
```

Endpoint principal:

```
http://localhost:3001/transactions
```

---

## ▶️ Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar a aplicação

```bash
npm run dev
```

### 3. Rodar a API

```bash
npx json-server --watch db.json --port 3001
```

---

## 📁 Estrutura do projeto

```
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── store/
 ├── hooks/
 ├── types/
 └── utils/
```

---

## 🧠 Decisões técnicas

* Uso de `useMemo` para otimização de filtros
* Separação de responsabilidades (pages, services, hooks)
* API simulada para facilitar testes sem backend real
* Layout responsivo com foco em dashboard profissional
* Scroll interno no histórico para melhor UX

---

## ⚠️ Desafios encontrados

* Conflitos de merge ao integrar mudanças locais e remotas
* Ajustes no `useMemo` para evitar warnings do React Hooks
* Organização do layout (filtros vs histórico)
* Sincronização com JSON Server

---

## 📸 Preview

👉 (adicione aqui um print ou GIF da aplicação)

---

## 📌 Melhorias futuras

* Integração com backend real
* Autenticação com JWT
* Dashboard com múltiplos gráficos
* Paginação no histórico
* Upload de comprovantes

---

## 👨‍💻 Autor

Desenvolvido por **Rogerio Pupo**

---
