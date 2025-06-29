'use client';

import React from 'react';
import Link from 'next/link';
import {
    FaUser,
    FaHome,
    FaCalendarAlt,
    FaDumbbell,
    FaChartBar,
    FaCreditCard,
    FaCog,
    FaChalkboardTeacher,
} from 'react-icons/fa';
import { cn } from '@/src/lib/utils';
import MenuOptions from './MenuOptions';

const navItems = [
    // Sección: Core principal
    {
        section: 'Gestión principal',
        items: [
            { href: '/dashboard/users', label: 'Usuarios', icon: FaUser },
            { href: '/dashboard/memberships', label: 'Membresías', icon: FaCreditCard },
            { href: '/dashboard/payments', label: 'Pagos', icon: FaCreditCard },
        ],
    },

    // Sección: Operaciones diarias
    {
        section: 'Operaciones',
        items: [
            { href: '/dashboard/trainers', label: 'Entrenadores', icon: FaChalkboardTeacher },
            { href: '/dashboard/workouts', label: 'Rutinas', icon: FaDumbbell },
            { href: '/dashboard/schedule', label: 'Horarios', icon: FaCalendarAlt },
        ],
    },

    // Sección: Análisis y configuración
    {
        section: 'Sistema',
        items: [
            { href: '/dashboard/reports', label: 'Reportes', icon: FaChartBar },
            { href: '/dashboard/settings', label: 'Configuración', icon: FaCog },
        ],
    },
];

type SidebarProps = {
    currentPath: string;
    user: {
        name: string;
        email: string;
        role: string;
    };
};

export default function Sidebar({ currentPath, user }: SidebarProps) {
    return (
        <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col shadow-lg">
            {/* Logo */}
            <div className="flex items-center justify-center mb-12 mt-4">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    GYM<span className="text-red-600">FLOW</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-6 text-sm flex-grow">
                {navItems.map(({ section, items }) => (
                    <div key={section}>
                        <h4 className="text-xs uppercase text-gray-400 font-semibold mb-2 px-4 tracking-widest">
                            {section}
                        </h4>
                        <div className="flex flex-col gap-1">
                            {items.map(({ href, label, icon: Icon }) => {
                                const isActive = currentPath === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-2 rounded-lg transition',
                                            isActive
                                                ? 'bg-red-600 text-white shadow-md font-medium'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
                                        )}
                                    >
                                        <Icon
                                            size={20}
                                            className={cn(
                                                'transition-all',
                                                isActive ? 'text-white' : 'text-red-500'
                                            )}
                                        />
                                        <span>{label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Opciones de usuario */}
            <div className="mt-auto pt-6 border-t border-gray-200">
                <MenuOptions user={user} />
            </div>
        </aside>
    );
}
