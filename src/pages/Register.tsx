import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerRequest } from "../services/authService";
import { registerSchema, type RegisterSchemaData } from "../schemas/authSchema";

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterSchemaData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterSchemaData) {
    try {
      const response = await registerRequest(data);
      toast.success(response.message);
      navigate("/login");
    } catch {
      toast.error("Não foi possível concluir o cadastro mock.");
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-card">
        <p className="auth-kicker">FINTECH DASHBOARD</p>
        <h1>Criar conta mock</h1>
        <p className="auth-description">Tela adicional implementada como funcionalidade extra solicitada no desafio.</p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="field-group">
            <span>Nome</span>
            <input className="form-input" type="text" {...register("name")} />
            {errors.name && <small className="field-error">{errors.name.message}</small>}
          </label>

          <label className="field-group">
            <span>Usuário</span>
            <input className="form-input" type="text" {...register("username")} />
            {errors.username && <small className="field-error">{errors.username.message}</small>}
          </label>

          <label className="field-group">
            <span>Senha</span>
            <input className="form-input" type="password" {...register("password")} />
            {errors.password && <small className="field-error">{errors.password.message}</small>}
          </label>

          <label className="field-group">
            <span>Confirmar senha</span>
            <input className="form-input" type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && <small className="field-error">{errors.confirmPassword.message}</small>}
          </label>

          <button className="primary-button" type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Salvando..." : "Cadastrar"}
          </button>
        </form>

        <p className="auth-link-text">
          Já possui acesso? <Link to="/login">Voltar para login</Link>
        </p>
      </section>
    </main>
  );
}
