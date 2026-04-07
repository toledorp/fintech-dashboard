import { useState } from "react";
import { useCreateTransaction } from "../hooks/useTransactions";

export function NewTransaction() {
  const createTransaction = useCreateTransaction();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"income" | "expense">("income");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description.trim() || amount <= 0) return;

    createTransaction.mutate({
      description,
      amount,
      type,
      date: new Date().toISOString(),
    });

    setDescription("");
    setAmount(0);
    setType("income");
  }

  return (
    <section className="form-card">
      <h2>Nova Transação</h2>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            className="form-input"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="form-input"
            type="number"
            placeholder="Valor"
            value={amount === 0 ? "" : amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <select
            className="form-input"
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
          >
            <option value="income">Entrada</option>
            <option value="expense">Saída</option>
          </select>

          <button className="primary-button" type="submit">
            Adicionar
          </button>
        </div>
      </form>
    </section>
  );
}