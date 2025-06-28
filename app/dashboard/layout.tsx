import React from "react";
import Link from "next/link";
import {
    FaUser,
    FaHome, 
    FaCalendarAlt, 
    FaDumbbell,   
    FaSignOutAlt,  // For Sign Out
} from "react-icons/fa"; 

import { cn } from "@/src/lib/utils";
import { verifySession } from "@/src/auth/dal";
import { logoutUserAction } from "@/actions/auth/logout-user-action";
import MenuOptions from "@/components/dashboard/MenuOptions";

const navItems = [
    { href: "/dashboard", label: "Inicio", icon: FaHome },
    { href: "/dashboard/profile", label: "Mi Perfil", icon: FaUser },
    { href: "/dashboard/schedule", label: "Horarios", icon: FaCalendarAlt },
    { href: "/dashboard/workouts", label: "Rutinas", icon: FaDumbbell },
    // { href: "/dashboard/settings", label: FaCog, label: "Configuración" },
];

type DashboardLayoutProps = {
    children: React.ReactNode;
    currentPath: string; // Add currentPath as a prop
};

export default async function DashboardLayout({
    children,
    currentPath, // Destructure currentPath prop
}: DashboardLayoutProps) {


    const { user } = await verifySession();

    // Redirect if user is not admin
    if (!user.role || user.role !== "ADMIN") {
        console.error("Unauthorized access attempt by user:", user);
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                    <p className="mt-4 text-gray-600">No tienes permiso para acceder a esta página.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
            {/* Sidebar - Clean, elevated, and interactive */}
            <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col shadow-lg transition-all duration-300 ease-in-out">
                {/* Logo/Brand Section */}
                <div className="flex items-center justify-center mb-12 mt-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-none">
                        GYM<span className="text-red-600">FLOW</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col flex-grow gap-2 text-sm">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const isActive = currentPath === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out",
                                    isActive
                                        ? "bg-red-600 text-white shadow-md font-medium"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                                )}
                            >
                                <Icon
                                    size={20}
                                    className={cn(
                                        "transition-all duration-200",
                                        isActive ? "text-white" : "text-red-500" // Consistent accent color for icons
                                    )}
                                />
                                <span>{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button - Distinct and clear */}
                <div className="mt-8 pt-6 border-t border-gray-200">

                    <MenuOptions 
                        user={user}
                    />
                   
                </div>
            </aside>

            {/* Main Content Area - Expansive and clean */}
            <main className="flex-1 px-8 py-8 overflow-y-auto">
                {/* Page Header (Optional, could be its own component) */}
                <header className="mb-8 pb-4 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {/* Dynamically set based on current route or pass as prop */}
                        Dashboard General
                    </h2>
                    <p className="text-gray-500 text-lg mt-1">
                        Bienvenido de nuevo. Aquí está un resumen de tu progreso.
                    </p>
                </header>

                {children}
            </main>
        </div>
    );
}