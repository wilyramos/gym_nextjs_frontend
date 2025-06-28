"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  User,
  Calendar
  ,
  Gear,
  SignOut,
} from "@phosphor-icons/react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Inicio", icon: House },
  { href: "/dashboard/profile", label: "Mi Perfil", icon: User },
  { href: "/dashboard/schedule", label: "Horarios", icon: Calendar },
  { href: "/dashboard/settings", label: "Configuración", icon: Gear },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-white text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r border-gray-200 px-6 py-8 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-center text-red-600 tracking-widest mb-10">
            GYM<br />POWER
          </h1>

          <nav className="flex flex-col gap-3 text-sm">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
                    isActive
                      ? "bg-red-600 text-white font-semibold"
                      : "hover:text-red-600 text-gray-800"
                  )}
                >
                  <Icon
                    size={20}
                    weight="duotone"
                    className={isActive ? "text-white" : "text-red-600"}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button className="flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition">
          <SignOut size={20} weight="duotone" className="text-red-600" />
          Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white px-10 py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
