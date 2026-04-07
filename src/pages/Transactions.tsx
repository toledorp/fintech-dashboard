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
    <main className="app-container">
      <section className="dashboard-card">
        <header className="page-header">
          <div>
            <p className="eyebrow">AIRBANK</p>
            <h1>Transações</h1>
            <p className="subtitle">Gerencie suas entradas e saídas em um só lugar.</p>
          </div>
        </header>

        <section className="summary-grid">
          <article className="summary-card">
            <span className="summary-label">Entradas</span>
            <strong className="summary-value income-text">
              {formatCurrency(incomeTotal)}
            </strong>
          </article>

          <article className="summary-card">
            <span className="summary-label">Saídas</span>
            <strong className="summary-value expense-text">
              {formatCurrency(expenseTotal)}
            </strong>
          </article>

          <article className="summary-card highlight">
            <span className="summary-label">Saldo</span>
            <strong
              className={`summary-value ${
                balanceTotal >= 0 ? "income-text" : "expense-text"
              }`}
            >
              {formatCurrency(balanceTotal)}
            </strong>
          </article>
        </section>

        <Chart incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

        <NewTransaction />

        <section className="transactions-section">
          <div className="section-header">
            <h2>Histórico</h2>
          </div>

          <div className="filters-bar">
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
        </section>
      </section>
    </main>
  );
}