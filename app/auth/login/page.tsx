import LoginForm from "@/components/auth/LoginForm"
import Link from 'next/link'



export default function LoginPage() {
    return (
        <div className="px-4 pt-24 flex  flex-col justify-center">
            <LoginForm />

            {/* <p className="text-xs text-gray-500 text-center mt-6">
                ¿No tienes cuenta?{" "}
                <Link href="/auth/register" className="text-red-500 underline cursor-pointer">
                    Regístrate
                </Link>
            </p>

            <p className="text-xs text-gray-500 text-center mt-2">
                <Link href="/auth/forgot-password" className="text-red-500 underline cursor-pointer">
                    ¿Olvidaste tu contraseña?
                </Link>
            </p> */}
        </div>
    );
}