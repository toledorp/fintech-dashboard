import { useDeleteTransaction, useTransactions } from "../hooks/useTransactions";

export function Transactions() {
  const { data, isLoading, error } = useTransactions();
  const deleteTransaction = useDeleteTransaction();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar transações.</p>;

  return (
    <div>
      <h1>Transações</h1>

      {data && data.length === 0 && <p>Nenhuma transação cadastrada.</p>}

      {data?.map((transaction) => (
        <div key={transaction.id}>
          <p>{transaction.description}</p>
          <p>R$ {transaction.amount}</p>
          <p>{transaction.type}</p>
          <p>{transaction.date}</p>

          <button onClick={() => deleteTransaction.mutate(transaction.id)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}