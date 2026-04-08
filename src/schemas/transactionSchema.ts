import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.number({ error: "Valor é obrigatório" }).positive("Valor deve ser maior que zero"),
  type: z.enum(["income", "expense"], {
    error: "Tipo é obrigatório",
  }),
  date: z.string().min(1, "Data é obrigatória"),
});

export type TransactionSchemaData = z.infer<typeof transactionSchema>;
