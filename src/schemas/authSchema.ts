import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Informe seu nome completo"),
    username: z.string().min(3, "Usuário deve ter ao menos 3 caracteres"),
    password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

export type LoginSchemaData = z.infer<typeof loginSchema>;
export type RegisterSchemaData = z.infer<typeof registerSchema>;
