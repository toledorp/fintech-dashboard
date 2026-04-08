# AIRBank - Fintech Dashboard

Projeto desenvolvido em React + TypeScript para o desafio Front-end 2 - Fintech.

## Stack

- React + TypeScript + Vite
- TanStack Query
- Redux Toolkit
- React Router
- Axios
- React Hook Form + Zod
- React Toastify
- Recharts
- JSON Server

## Funcionalidades implementadas

- Login mock com token salvo no Redux e persistência em localStorage
- Rotas protegidas para o dashboard
- Logout com limpeza do estado
- Dashboard com cards de entradas, saídas e saldo
- Gráfico financeiro com Recharts
- Listagem de transações
- Criar, editar e excluir transações com invalidação de cache no React Query
- Busca por descrição
- Filtro por tipo
- Filtro por mês
- Dark mode via Redux
- Tela mock de cadastro de usuários
- Feedback visual com loading, erro e toast
- Validação em tempo real com botão de salvar desabilitado quando o formulário está inválido

## Usuário mock

- Usuário: `admin`
- Senha: `123456`

## Como executar

```bash
npm install
npm run dev
```

Em outro terminal, suba a API mock:

```bash
npx json-server --watch db.json --port 3001
```

## Estrutura principal

```bash
src/
  components/
  hooks/
  pages/
  routes/
  schemas/
  services/
  store/
  types/
  utils/
```

## Observações

- O login foi implementado como mock no front-end, conforme permitido no desafio.
- As transações usam JSON Server como API fake.
