import { differenceInDays, isBefore, differenceInCalendarDays } from 'date-fns';

type UserWithMembership = {
    id: number;
    name: string;
    membership: {
        name: string;
        startDate: string;
        endDate: string;
    };
};

const allUsers: UserWithMembership[] = [
    { id: 1, name: 'Juan Pérez', membership: { name: 'Mensual', startDate: '2025-06-01', endDate: '2025-07-01' } },
    { id: 2, name: 'Luisa Ramos', membership: { name: 'Mensual', startDate: '2025-05-01', endDate: '2025-06-01' } },
    { id: 3, name: 'Carlos Díaz', membership: { name: 'Anual', startDate: '2025-01-01', endDate: '2026-01-01' } },
    { id: 4, name: 'Ana Torres', membership: { name: 'Trimestral', startDate: '2025-05-01', endDate: '2025-08-01' } },
    { id: 5, name: 'Diego Sánchez', membership: { name: 'Mensual', startDate: '2025-06-10', endDate: '2025-07-10' } },
    { id: 6, name: 'María Gómez', membership: { name: 'Anual', startDate: '2024-07-01', endDate: '2025-07-01' } },
    { id: 7, name: 'José Vargas', membership: { name: 'Mensual', startDate: '2025-06-15', endDate: '2025-07-15' } },
    { id: 8, name: 'Elena Ríos', membership: { name: 'Trimestral', startDate: '2025-04-01', endDate: '2025-07-01' } },
    { id: 9, name: 'Renzo Milla', membership: { name: 'Mensual', startDate: '2025-05-20', endDate: '2025-06-20' } },
    { id: 10, name: 'Karla López', membership: { name: 'Mensual', startDate: '2025-06-25', endDate: '2025-07-25' } },
];

const ITEMS_PER_PAGE = 5;

export default function ReportUsersPage({ searchParams }: { searchParams?: { page?: string } }) {
    const currentPage = Number(searchParams?.page || 1);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = allUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);

    const today = new Date();

    return (
        <section className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Reporte de Usuarios</h1>

            {/* Tabla */}
            <div className="overflow-x-auto bg-white border rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-2 text-left">Usuario</th>
                            <th className="px-4 py-2 text-left">Membresía</th>
                            <th className="px-4 py-2 text-left">Estado</th>
                            <th className="px-4 py-2 text-left">Días restantes</th>
                            <th className="px-4 py-2 text-left">Progreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user) => {
                            const start = new Date(user.membership.startDate);
                            const end = new Date(user.membership.endDate);
                            const totalDays = differenceInCalendarDays(end, start);
                            const daysLeft = Math.max(differenceInDays(end, today), 0);
                            const progress = Math.min((daysLeft / totalDays) * 100, 100);
                            const isActive = isBefore(today, end);

                            return (
                                <tr key={user.id} className="border-t">
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.membership.name}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {isActive ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {isActive ? `${daysLeft} días` : '0 días'}
                                    </td>
                                    <td className="px-4 py-3 w-56">
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${progress <= 20 ? 'bg-red-500' : progress <= 50 ? 'bg-yellow-400' : 'bg-green-500'}`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {Math.round(progress)}% restante
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <a
                        key={i}
                        href={`?page=${i + 1}`}
                        className={`px-3 py-1 rounded border text-sm ${currentPage === i + 1
                                ? 'bg-red-500 text-white'
                                : 'bg-white text-gray-700 border-gray-300'
                            }`}
                    >
                        {i + 1}
                    </a>
                ))}
            </div>
        </section>
    );
}
