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

// eslint-disable-next-line no-unused-vars
const InputField = ({ label, name, type, icon: Icon, placeholder, register, errors }) => (
    <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 italic">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className={`h-5 w-5 transition-colors ${errors[name] ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400'}`} />
            </div>
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className={`block w-full pl-10 pr-3 py-2.5 rounded-xl transition-all outline-none sm:text-sm
                    bg-gray-50 dark:bg-slate-900 
                    border dark:border-slate-700
                    text-gray-900 dark:text-white
                    ${errors[name]
                        ? 'border-red-300 focus:ring-2 focus:ring-red-100 focus:border-red-400 dark:focus:ring-red-900/20'
                        : 'border-gray-200 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-50/50 dark:focus:ring-blue-900/20 focus:border-blue-600 dark:focus:border-blue-500'}`}
            />
        </div>
        <div className="h-5 ml-1">
            {errors[name] && <span className="text-xs text-red-500 dark:text-red-400 font-medium">{errors[name].message}</span>}
        </div>
    </div>
);

// 3. Component principal
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
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-gray-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-blue-200/50 dark:shadow-none mb-4 transform -rotate-6 transition-transform hover:rotate-0 border border-transparent dark:border-slate-700">
                        <UserPlusIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight italic">Únete</h2>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-4xl shadow-2xl border border-white dark:border-slate-800 transition-colors">
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
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2 mt-4"
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

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 font-medium mt-8 italic">
                        ¿Ya tienes acceso?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold underline decoration-2 underline-offset-4 transition-colors"
                        >
                            Inicia sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};