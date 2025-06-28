"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="w-full bg-black text-white border-b border-red-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={38}
                        height={38}
                        className="rounded-full object-cover"
                        priority
                    />
                    <span className="text-2xl font-bold tracking-wide text-white">
                        Stranger <span className="text-red-600">Gym</span>
                    </span>
                </Link>

                {/* Navegación */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="hover:text-red-500 transition-colors">Inicio</Link>
                    <Link href="/membresias" className="hover:text-red-500 transition-colors">Membresías</Link>
                    <Link href="/rutinas" className="hover:text-red-500 transition-colors">Rutinas</Link>
                    <Link href="/contacto" className="hover:text-red-500 transition-colors">Contacto</Link>
                </nav>

                {/* Botón de acción */}
                <div className="hidden md:block">
                    <Link href="/auth/login">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors">
                            Iniciar sesión
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
