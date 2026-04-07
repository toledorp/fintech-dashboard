import { useDeleteTransaction, useTransactions } from "../hooks/useTransactions";
import { NewTransaction } from "../components/NewTransaction";

export function Transactions() {
  const { data, isLoading, error } = useTransactions();
  const deleteTransaction = useDeleteTransaction();

  if (isLoading) return <p className="status-message">Carregando...</p>;
  if (error) return <p className="status-message">Erro ao carregar transações.</p>;

  const transactions = data ?? [];

  const incomeTotal = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenseTotal = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balanceTotal = incomeTotal - expenseTotal;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

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

        <NewTransaction />

        <section className="transactions-section">
          <h2>Histórico</h2>

          {transactions.length === 0 && (
            <div className="empty-state">
              <p>Nenhuma transação cadastrada.</p>
            </div>
          )}

          <div className="transactions-list">
            {transactions.map((transaction) => (
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