import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema, type LoginSchemaData } from "../schemas/authSchema";
import { loginRequest } from "../services/authService";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "admin",
      password: "123456",
    },
  });

  async function onSubmit(data: LoginSchemaData) {
    try {
      const response = await loginRequest(data);
      dispatch(setCredentials(response));
      toast.success("Login realizado com sucesso.");
      const redirectTo = location.state?.from?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha no login";
      toast.error(message);
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-card">
        <p className="auth-kicker">FINTECH DASHBOARD</p>
        <h1>Acesse sua conta</h1>
        <p className="auth-description">Use o usuário mock abaixo para testar o fluxo protegido do dashboard.</p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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

          <button className="primary-button" type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="auth-helper">
          <span>Usuário: admin</span>
          <span>Senha: 123456</span>
        </div>

        <p className="auth-link-text">
          Ainda não tem cadastro? <Link to="/register">Criar conta mock</Link>
        </p>
      </section>
    </main>
  );
}
