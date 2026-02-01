import { useAuthContext } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useToast } from "../zustand/useToast";
import { EnvelopeIcon, LockClosedIcon, ShoppingBagIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export const Login = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
      showToast("Inicio de sesión exitoso", "success");
    } catch (error) {
      showToast("Error al iniciar sesión. Revisa tus credenciales.", error.response?.data?.message || "error");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-gray-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-blue-200/50 dark:shadow-none mb-4 transform rotate-6 transition-transform hover:rotate-0 border border-transparent dark:border-slate-700">
            <ShoppingBagIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight italic">
            Mi Tienda
          </h2>
          <p className="mt-2 text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Panel de Administración
          </p>
        </div>

        {/* Card del login */}
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl py-8 px-4 shadow-2xl border border-white dark:border-slate-800 sm:rounded-[2rem] sm:px-10 transition-colors">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 italic">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl transition-all outline-none sm:text-sm bg-gray-50 dark:bg-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-50/50 dark:focus:ring-blue-900/20 focus:border-blue-600 dark:focus:border-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 italic">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl transition-all outline-none sm:text-sm bg-gray-50 dark:bg-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-50/50 dark:focus:ring-blue-900/20 focus:border-blue-600 dark:focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Botón de login */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          {/* Registro link */}
          <div className="mt-8 text-center border-t border-gray-100 dark:border-slate-800 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium italic">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold underline decoration-2 underline-offset-4"
              >
                Regístrate aquí
              </button>
            </p>

            <div className="mt-4">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center mx-auto transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Ver tienda pública
              </button>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-8 text-center px-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-500 font-bold">
            © {new Date().getFullYear()} Mi Tienda • Sistema de Inventario
            <br />
            <span className="normal-case font-medium opacity-60 italic">Los datos son temporales • Ambiente de desarrollo</span>
          </p>
        </div>
      </div>
    </div>
  );
};