import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, type TransactionSchemaData } from "../schemas/transactionSchema";
import type { Transaction } from "../types/Transaction";

interface TransactionModalProps {
  title: string;
  isOpen: boolean;
  initialData?: Transaction | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionSchemaData) => void;
}

export function TransactionModal({
  title,
  isOpen,
  initialData,
  isSubmitting,
  onClose,
  onSubmit,
}: TransactionModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TransactionSchemaData>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
      amount: undefined,
      type: "income",
      date: new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      reset({
        description: initialData.description,
        amount: initialData.amount,
        type: initialData.type,
        date: initialData.date.slice(0, 10),
      });
      return;
    }

    reset({
      description: "",
      amount: undefined,
      type: "income",
      date: new Date().toISOString().slice(0, 10),
    });
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card">
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="ghost-button" type="button" onClick={onClose}>
            Fechar
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="field-group">
            <span>Descrição</span>
            <input className="form-input" type="text" {...register("description")} />
            {errors.description && <small className="field-error">{errors.description.message}</small>}
          </label>

          <label className="field-group">
            <span>Valor</span>
            <input className="form-input" type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
            {errors.amount && <small className="field-error">{errors.amount.message}</small>}
          </label>

          <label className="field-group">
            <span>Tipo</span>
            <select className="form-input" {...register("type")}>
              <option value="income">Entrada</option>
              <option value="expense">Saída</option>
            </select>
            {errors.type && <small className="field-error">{errors.type.message}</small>}
          </label>

          <label className="field-group">
            <span>Data</span>
            <input className="form-input" type="date" {...register("date")} />
            {errors.date && <small className="field-error">{errors.date.message}</small>}
          </label>

          <div className="modal-actions">
            <button className="ghost-button" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="primary-button" type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
