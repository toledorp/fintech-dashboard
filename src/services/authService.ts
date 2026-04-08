import type { LoginCredentials, RegisterPayload } from "../types/Auth";

const MOCK_USER = {
  name: "Usuário Fintech",
  username: "admin",
  password: "123456",
};

export async function loginRequest({ username, password }: LoginCredentials) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
    throw new Error("Usuário ou senha inválidos");
  }

  return {
    token: `token-${Date.now()}`,
    user: {
      name: MOCK_USER.name,
      username: MOCK_USER.username,
    },
  };
}

export async function registerRequest(data: RegisterPayload) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    message: `Cadastro mock realizado para ${data.name}. Use admin / 123456 para entrar.`,
  };
}
