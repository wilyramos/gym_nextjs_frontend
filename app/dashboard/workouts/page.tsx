import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/dashboard/PageHeader';

export default function WorkoutsPage() {
    return (
        <section className="space-y-6">
            <PageHeader title="Rutinas de Entrenamiento" subtitle="Gestiona las rutinas de tus clientes." />

            <div className="text-center">
                <Link
                    href="/admin/workouts/create"
                    className="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
                >
                    Crear nueva rutina
                </Link>
            </div>

            <div className="text-center text-gray-500 mt-10">
                <p className="text-lg">Aún no hay rutinas registradas.</p>
            </div>
        </section>
    );
}
