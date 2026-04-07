import { useDeleteTransaction, useTransactions } from "../hooks/useTransactions";
import { NewTransaction } from "../components/NewTransaction";

export function Transactions() {
  const { data, isLoading, error } = useTransactions();
  const deleteTransaction = useDeleteTransaction();

  if (isLoading) return <p className="status-message">Carregando...</p>;
  if (error) return <p className="status-message">Erro ao carregar transações.</p>;

  return (
    <main className="app-container">
      <section className="dashboard-card">
        <header className="page-header">
          <div>
            <p className="eyebrow">AIRBank</p>
            <h1>Transações</h1>
            <p className="subtitle">Gerencie suas entradas e saídas em um só lugar.</p>
          </div>
        </header>

        <NewTransaction />

        <section className="transactions-section">
          <h2>Histórico</h2>

          {data && data.length === 0 && (
            <div className="empty-state">
              <p>Nenhuma transação cadastrada.</p>
            </div>
          )}

          <div className="transactions-list">
            {data?.map((transaction) => (
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
                  R$ {transaction.amount.toFixed(2)}
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