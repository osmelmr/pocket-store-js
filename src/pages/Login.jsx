import { useAuthContext } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react"
import { Toast } from "../components/Toast";

export const Login = () => {
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onChange = (e) => {
    console.log(e.target.name, e.target.value)
    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    if (e.target.name == "password") {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(email, password)
      await login({ email, password })
      navigate("/")
    } catch (error) {
      setShowToast(true)
      console.log(error)
    }

  }

  return (
    <>
      <Toast message={"usuario o contraseña invalidos"} show={showToast} onClose={() => setShowToast(false)} type={"success"} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Mi Tienda</h2>
            <p className="mt-2 text-sm text-gray-600">Panel de Administración</p>
          </div>

          {/* Card del login */}
          <div onSubmit={handleSubmit} className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange}
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Recordarme y enlaces */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Recordar sesión
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              {/* Botón de login */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>

            {/* Demo Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Acceso rápido
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Usar credenciales de demostración
                </button>
              </div>
            </div>

            {/* Info adicional */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Demo:</strong> Usa cualquier email y contraseña, o haz
                    clic en "Usar credenciales de demostración".
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    En una aplicación real, aquí se conectaría a tu backend Django
                    con autenticación real.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces adicionales */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <button
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Regístrate aquí
              </button>
            </p>
            <div className="mt-4">
              <button
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center mx-auto"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Ver tienda pública
              </button>
            </div>
          </div>

          {/* Footer informativo */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Mi Tienda. Panel de administración.
              <br />
              Esta es una aplicación demo. Los datos son temporales.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};