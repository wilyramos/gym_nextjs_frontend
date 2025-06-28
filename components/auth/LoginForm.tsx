"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { authenticateUserAction } from "@/actions/auth/authenticate-user-action";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function LoginForm() {
    const [isPending, startTransition] = useTransition();

    const [state, dispatch] = useActionState(authenticateUserAction, {
        errors: [],
        success: "",
    });

    useEffect(() => {
        if (state.errors.length > 0) {
            state.errors.forEach((error) => toast.error(error));
        }
        if (state.success) {
            toast.success(state.success);
        }
    }, [state]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (formData: FormData) => {
        startTransition(() => {
            dispatch(formData);
        });
    };

    return (
        <form
            className="w-full max-w-sm mx-auto px-4 border"
            noValidate
            action={handleSubmit}
        >
            <h1 className="text-xl font-light text-white mb-8 text-center tracking-wide">
                Inicia sesión
            </h1>

            <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 py-2 transition px-2"
            />

            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-6 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 py-2 transition px-2"
            />

            <button
                type="submit"
                disabled={isPending}
                className={`w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded transition ${isPending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {isPending ? (
                    <>
                        <LoadingSpinner size={16} color="#ffffff" />
                        Cargando...
                    </>
                ) : (
                    "Iniciar sesión"
                )}
            </button>

            
        </form>
    );
}
