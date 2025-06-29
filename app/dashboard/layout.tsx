import React from 'react';
import { verifySession } from '@/src/auth/dal';
import Sidebar from '@/components/dashboard/Sidebar';

type DashboardLayoutProps = {
    children: React.ReactNode;
    currentPath: string;
};

export default async function DashboardLayout({
    children,
    currentPath,
}: DashboardLayoutProps) {
    const { user } = await verifySession();

    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                    <p className="mt-4 text-gray-600">
                        No tienes permiso para acceder a esta página.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
            <Sidebar currentPath={currentPath} user={user} />
            <main className="flex-1 px-8 py-8 overflow-y-auto">
                {children}
            </main>


        </div>
    );
}
