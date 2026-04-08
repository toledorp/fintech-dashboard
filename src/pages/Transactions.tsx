import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteTransaction,
  useTransactions,
  useUpdateTransaction,
} from "../hooks/useTransactions";
import { NewTransaction } from "../components/NewTransaction";
import { Chart } from "../components/Chart";
import { TransactionModal } from "../components/TransactionModal";
import { formatCurrency, formatDate } from "../utils/format";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { toggleTheme } from "../store/slices/themeSlice";
import type { Transaction } from "../types/Transaction";
import type { TransactionSchemaData } from "../schemas/transactionSchema";

type FilterType = "all" | "income" | "expense";

export function Transactions() {
  const { data, isLoading, isError } = useTransactions();
  const deleteTransaction = useDeleteTransaction();
  const updateTransaction = useUpdateTransaction();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const themeMode = useAppSelector((state) => state.theme.mode);

  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return [...(data ?? [])]
      .filter((transaction) => {
        const matchesType =
          typeFilter === "all" || transaction.type === typeFilter;

        const matchesSearch = transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const transactionMonth = transaction.date.slice(0, 7);
        const matchesMonth = monthFilter
          ? transactionMonth === monthFilter
          : true;

        return matchesType && matchesSearch && matchesMonth;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data, typeFilter, searchTerm, monthFilter]);

  const { incomeTotal, expenseTotal } = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.incomeTotal += transaction.amount;
        } else {
          acc.expenseTotal += transaction.amount;
        }
        return acc;
      },
      { incomeTotal: 0, expenseTotal: 0 },
    );
  }, [filteredTransactions]);

  const balanceTotal = incomeTotal - expenseTotal;

  async function handleDelete(id: string) {
    try {
      await deleteTransaction.mutateAsync(id);
      toast.success("Transação removida com sucesso.");
    } catch {
      toast.error("Não foi possível remover a transação.");
    }
  }

  async function handleEdit(formData: TransactionSchemaData) {
    if (!selectedTransaction) return;

    try {
      await updateTransaction.mutateAsync({
        id: selectedTransaction.id,
        data: {
          ...formData,
          date: new Date(formData.date).toISOString(),
        },
      });

      toast.success("Transação atualizada com sucesso.");
      setSelectedTransaction(null);
    } catch {
      toast.error("Não foi possível atualizar a transação.");
    }
  }

  if (isLoading) {
    return (
      <main className="status-screen">
        <div className="loading-card">Carregando dados do dashboard...</div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="status-screen">
        <div className="error-card">
          Erro ao carregar transações. Verifique se o JSON Server está rodando.
        </div>
      </main>
    );
  }

  return (
    <main className={`bi-layout theme-${themeMode}`}>
      <aside className="bi-sidebar">
        <div className="bi-logo">AB</div>
        <nav className="bi-nav">
          <div className="sidebar-new-transaction">
            <NewTransaction />
          </div>
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

          <div className="header-actions">
            <span className="welcome-chip">
              Olá, {user?.name ?? "Usuário Fintech"}
            </span>

            <button
              className="ghost-button"
              type="button"
              onClick={() => dispatch(toggleTheme())}
            >
              {themeMode === "light" ? "Dark mode" : "Light mode"}
            </button>

            <button
              className="ghost-button"
              type="button"
              onClick={() => dispatch(logout())}
            >
              Sair
            </button>
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
                <span>Total filtrado</span>
                <strong>{filteredTransactions.length}</strong>
              </div>

              <div className="bi-analysis-row">
                <span>Entradas</span>
                <strong>
                  {
                    filteredTransactions.filter(
                      (transaction) => transaction.type === "income",
                    ).length
                  }
                </strong>
              </div>

              <div className="bi-analysis-row">
                <span>Saídas</span>
                <strong>
                  {
                    filteredTransactions.filter(
                      (transaction) => transaction.type === "expense",
                    ).length
                  }
                </strong>
              </div>

              <div className="bi-analysis-row">
                <span>Saldo atual</span>
                <strong>{formatCurrency(balanceTotal)}</strong>
              </div>
            </div>
          </div>

          <div className="bi-transactions-layout">
            <div className="bi-panel bi-filters-panel">
              <div className="bi-panel-header">
                <h2>Filtros e ações</h2>
              </div>

              <div className="filters-bar filters-stack">
                <label className="field-group compact-field">
                  <span>Buscar por descrição</span>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ex.: depósito"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>

                <label className="field-group compact-field">
                  <span>Tipo</span>
                  <select
                    className="form-input"
                    value={typeFilter}
                    onChange={(e) =>
                      setTypeFilter(e.target.value as FilterType)
                    }
                  >
                    <option value="all">Todos</option>
                    <option value="income">Entradas</option>
                    <option value="expense">Saídas</option>
                  </select>
                </label>

                <label className="field-group compact-field">
                  <span>Mês</span>
                  <input
                    className="form-input"
                    type="month"
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="bi-panel bi-history-panel">
              <div className="bi-panel-header">
                <h2>Histórico das Transações</h2>
              </div>

              <div className="bi-history-scroll">
                {filteredTransactions.length === 0 ? (
                  <p className="empty-state">Nenhuma transação encontrada.</p>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <article className="transaction-card" key={transaction.id}>
                      <div>
                        <h3 className="text-base font-semibold">
                          {transaction.description}
                        </h3>
                        <p className="text-sm">
                          {formatDate(transaction.date)}
                        </p>
                        <p className="mt-2 text-xl font-bold">
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>

                      <div className="transaction-card-actions">
                        <span
                          className={
                            transaction.type === "income"
                              ? "transaction-badge income"
                              : "transaction-badge expense"
                          }
                        >
                          {transaction.type === "income" ? "Entrada" : "Saída"}
                        </span>

                        <div className="transaction-buttons">
                          <button
                            type="button"
                            className="secondary-button"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="danger-button"
                            onClick={() => handleDelete(transaction.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <TransactionModal
          title="Editar transação"
          isOpen={Boolean(selectedTransaction)}
          initialData={selectedTransaction}
          isSubmitting={updateTransaction.isPending}
          onClose={() => setSelectedTransaction(null)}
          onSubmit={handleEdit}
        />
      </section>
    </main>
  );
}
