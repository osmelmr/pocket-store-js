import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../zustand/useToast";
import { EnvelopeIcon, LockClosedIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../hooks/useAuth";

// 1. ESQUEMA DE VALIDACIÓN
const registerSchema = z.object({
    username: z.string().min(3, "Mínimo 3 caracteres"),
    email: z.string().email("Email no válido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

// 2. COMPONENTE REUTILIZABLE (DECLARADO AFUERA)
const InputField = ({ label, name, type, icon: Icon, placeholder, register, errors }) => (
    <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700 ml-1 italic">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className={`h-5 w-5 transition-colors ${errors[name] ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-600'}`} />
            </div>
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className={`block w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-xl transition-all outline-none sm:text-sm
          ${errors[name]
                        ? 'border-red-300 focus:ring-2 focus:ring-red-100 focus:border-red-400'
                        : 'border-gray-200 focus:bg-white focus:ring-4 focus:ring-blue-50/50 focus:border-blue-600'}`}
            />
        </div>
        <div className="h-5 ml-1">
            {errors[name] && <span className="text-xs text-red-500 font-medium">{errors[name].message}</span>}
        </div>
    </div>
);

// 3. COMPONENTE PRINCIPAL
export const Register = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { register: signUp } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (values) => {
        try {
            await signUp({
                email: values.email, password: values.password, options: {
                    data: { username: values.username }
                }
            });
            showToast("¡Registro exitoso!.", "success");
            navigate("/");
        } catch (error) {
            showToast(error.message || "Error al registrarse", "error");
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl shadow-blue-200/50 mb-4 transform -rotate-6 transition-transform hover:rotate-0">
                        <UserPlusIcon className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight italic">Únete</h2>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

                        <InputField
                            label="Usuario"
                            name="username"
                            type="text"
                            icon={UserIcon}
                            placeholder="Ej: admin_tienda"
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            icon={EnvelopeIcon}
                            placeholder="admin@tienda.com"
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="Contraseña"
                            name="password"
                            type="password"
                            icon={LockClosedIcon}
                            placeholder="Mínimo 8 caracteres"
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="Confirmar"
                            name="confirmPassword"
                            type="password"
                            icon={LockClosedIcon}
                            placeholder="Repite tu contraseña"
                            register={register}
                            errors={errors}
                        />

                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2 mt-4"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Crear mi cuenta</span>
                                    <UserPlusIcon className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 font-medium mt-8 italic">
                        ¿Ya tienes acceso?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-600 hover:text-blue-700 font-bold underline decoration-2 underline-offset-4"
                        >
                            Inicia sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};