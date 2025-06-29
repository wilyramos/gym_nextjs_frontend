'use client';

import { FaUserEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import type { GetUsersResponseDto } from '@/src/schemas';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type Props = {
    data: GetUsersResponseDto;
};

export default function UsersTable({ data }: Props) {
    const users = data?.users ?? [];

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleEdit = (userId: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('editUser', userId.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleDelete = (userId: number) => {
        console.log("Eliminando al usuario...", userId)
    }

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100">
            {/* Encabezado */}
            
            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-black">
                    <thead>
                        <tr className="border-b border-black text-left text-xs uppercase font-semibold">
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Correo</th>
                            <th className="px-4 py-2">DNI</th>
                            <th className="px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-black/50">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-red-50 transition border-b border-gray-200">
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.dni}</td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                className="text-black hover:text-red-600 transition"
                                                title="Editar"
                                                onClick={() => handleEdit(user.id)}
                                            >
                                                <FaUserEdit size={16} />
                                            </button>
                                            <button
                                                className="text-black hover:text-red-600 transition"
                                                title="Eliminar"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <FaTrashAlt size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
