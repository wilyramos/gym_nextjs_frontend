'use client';

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import PageHeader from '@/components/dashboard/PageHeader';
import MonthlyIncomeChart from '@/components/dashboard/reports/MonthlyIncomeChart';
import Indicadores from '@/components/dashboard/reports/Indicadores';
import type { PaymentDto } from '@/src/schemas';
import Link from 'next/link';

export default function ReportsPage() {
    const payments: PaymentDto[] = [
        {
            id: 1,
            userId: 1,
            membershipId: 1,
            amount: '100.00',
            method: 'EFECTIVO',
            notes: 'Pago mensual',
            createdAt: '2025-01-15T10:00:00Z',
        },
        {
            id: 2,
            userId: 2,
            membershipId: 2,
            amount: '150.00',
            method: 'YAPE',
            notes: null,
            createdAt: '2025-02-10T12:30:00Z',
        },
        {
            id: 3,
            userId: 1,
            membershipId: 1,
            amount: '100.00',
            method: 'TARJETA',
            notes: 'Pago trimestral',
            createdAt: '2025-03-05T09:15:00Z',
        },
        {
            id: 4,
            userId: 3,
            membershipId: 3,
            amount: '200.00',
            method: 'TRANSFERENCIA',
            notes: null,
            createdAt: '2025-04-20T14:45:00Z',
        },
    ];

    const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];

    const methodCount = payments.reduce((acc, p) => {
        acc[p.method] = (acc[p.method] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(methodCount).map(([method, count]) => ({
        name: method,
        value: count,
    }));

    const lineData = Array.from({ length: 12 }, (_, month) => {
        const monthlyTotal = payments
            .filter((p) => new Date(p.createdAt).getMonth() === month)
            .reduce((sum, p) => sum + Number(p.amount), 0);

        return {
            name: new Date(2025, month, 1).toLocaleString('es-PE', {
                month: 'short',
            }),
            ingresos: monthlyTotal,
        };
    });

    return (
        <section className="space-y-12">
            <PageHeader
                title="Reportes del Gimnasio"
                subtitle="Visualiza el rendimiento financiero y actividad mensual."
            />
            <Link href="/dashboard/reports/users" className="text-red-600 hover:underline">
                Ver Reportes de Usuarios
            </Link>

            <Indicadores />

            <MonthlyIncomeChart data={lineData} />

            <section className="p-6 border rounded-lg bg-white">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Distribución de Métodos de Pago
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {pieData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </section>
        </section>
    );
}
