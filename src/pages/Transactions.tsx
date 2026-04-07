import { useMemo, useState } from "react";
import { useDeleteTransaction, useTransactions } from "../hooks/useTransactions";
import { NewTransaction } from "../components/NewTransaction";
import { Chart } from "../components/Chart";

type FilterType = "all" | "income" | "expense";

export function Transactions() {
  const { data, isLoading, error } = useTransactions();
  const deleteTransaction = useDeleteTransaction();

  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = data ?? [];

  const incomeTotal = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenseTotal = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balanceTotal = incomeTotal - expenseTotal;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType =
        typeFilter === "all" ? true : transaction.type === typeFilter;

      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [transactions, typeFilter, searchTerm]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  if (isLoading) return <p className="status-message">Carregando...</p>;
  if (error) return <p className="status-message">Erro ao carregar transações.</p>;

  return (
    <main className="bi-layout">
      <aside className="bi-sidebar">
        <div className="bi-logo">AB</div>

        <nav className="bi-nav">
          <button className="bi-nav-item active">Dashboard</button>
          <button className="bi-nav-item">Fluxo</button>
          <button className="bi-nav-item">Resumo</button>
        </nav>
      </aside>

      <section className="bi-content">
        <header className="bi-header">
          <div>
            <p className="bi-kicker">AIRBANK ANALYTICS</p>
            <h1>Dashboard Financeiro</h1>
            <p className="bi-subtitle">
              Controle de fluxo de caixa com visão analítica das movimentações.
            </p>
          </div>
        </header>

        <section className="bi-summary-row">
          <article className="bi-metric-card income-card">
            <span>Entradas</span>
            <strong>{formatCurrency(incomeTotal)}</strong>
          </article>

          <article className="bi-metric-card expense-card">
            <span>Saídas</span>
            <strong>{formatCurrency(expenseTotal)}</strong>
          </article>

          <article className="bi-metric-card balance-card">
            <span>Saldo</span>
            <strong>{formatCurrency(balanceTotal)}</strong>
          </article>
        </section>

        <section className="bi-grid">
          <div className="bi-panel bi-panel-large">
            <div className="bi-panel-header">
              <h2>Evolução Receitas vs Despesas</h2>
            </div>
            <Chart incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
          </div>

          <div className="bi-panel">
            <div className="bi-panel-header">
              <h2>Análise das Movimentações</h2>
            </div>

            <div className="bi-analysis-list">
              <div className="bi-analysis-row">
                <span>Total de transações</span>
                <strong>{transactions.length}</strong>
              </div>
              <div className="bi-analysis-row">
                <span>Entradas</span>
                <strong>{transactions.filter((t) => t.type === "income").length}</strong>
              </div>
              <div className="bi-analysis-row">
                <span>Saídas</span>
                <strong>{transactions.filter((t) => t.type === "expense").length}</strong>
              </div>
              <div className="bi-analysis-row">
                <span>Saldo atual</span>
                <strong>{formatCurrency(balanceTotal)}</strong>
              </div>
            </div>
          </div>

          <div className="bi-panel">
            <div className="bi-panel-header">
              <h2>Filtros</h2>
            </div>

            <div className="filters-bar powerbi-filters">
              <input
                className="form-input"
                type="text"
                placeholder="Buscar por descrição"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="form-input"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as FilterType)}
              >
                <option value="all">Todos</option>
                <option value="income">Entradas</option>
                <option value="expense">Saídas</option>
              </select>
            </div>

            <NewTransaction />
          </div>

          <div className="bi-panel bi-panel-wide">
            <div className="bi-panel-header">
              <h2>Histórico das Transações</h2>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="empty-state">
                <p>Nenhuma transação encontrada para os filtros aplicados.</p>
              </div>
            )}

            <div className="transactions-list">
              {filteredTransactions.map((transaction) => (
                <article key={transaction.id} className="transaction-card">
                  <div className="transaction-top">
                    <div>
                      <h3>{transaction.description}</h3>
                      <p className="transaction-date">
                        {new Date(transaction.date).toLocaleString("pt-BR")}
                      </p>
                    </div>

                    <span
                      className={
                        transaction.type === "income"
                          ? "transaction-badge income"
                          : "transaction-badge expense"
                      }
                    >
                      {transaction.type === "income" ? "Entrada" : "Saída"}
                    </span>
                  </div>

                  <p className="transaction-amount">
                    {formatCurrency(transaction.amount)}
                  </p>

                  <div className="transaction-actions">
                    <button
                      className="delete-button"
                      onClick={() => deleteTransaction.mutate(transaction.id)}
                    >
                      Deletar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}