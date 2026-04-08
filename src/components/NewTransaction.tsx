import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateTransaction } from "../hooks/useTransactions";
import { TransactionModal } from "./TransactionModal";
import type { TransactionSchemaData } from "../schemas/transactionSchema";

export function NewTransaction() {
  const [isOpen, setIsOpen] = useState(false);
  const createTransaction = useCreateTransaction();

  async function handleCreate(data: TransactionSchemaData) {
    try {
      await createTransaction.mutateAsync({
        ...data,
        date: new Date(data.date).toISOString(),
      });
      toast.success("Transação criada com sucesso.");
      setIsOpen(false);
    } catch {
      toast.error("Não foi possível criar a transação.");
    }
  }

  return (
    <>
      <div className="quick-action-card">
        <button className="primary-button" type="button" onClick={() => setIsOpen(true)}>
          Nova transação
        </button>
      </div>

      <TransactionModal
        title="Nova transação"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreate}
        isSubmitting={createTransaction.isPending}
      />
    </>
  );
}
