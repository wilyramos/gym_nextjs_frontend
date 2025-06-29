import React from 'react'
import type { PaymentDto } from '@/src/schemas';
import { FaUser, FaCalendar } from 'react-icons/fa';
import { format } from 'date-fns';
import type { GetPaymentsResponseDto } from "@/src/schemas"



export default function PaymentsTable({ data }: { data: GetPaymentsResponseDto }) {

    console.log(data)

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white mt-4">
            <table className="min-w-full text-sm text-gray-900">
                <thead className="bg-red-600 text-white uppercase text-xs font-semibold">
                    <tr>
                        <th className="px-4 py-3 text-left">Cliente</th>
                        <th className="px-4 py-3 text-left">Membresía</th>
                        <th className="px-4 py-3 text-left">Monto</th>
                        <th className="px-4 py-3 text-left">Método</th>
                        <th className="px-4 py-3 text-left">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-500">
                                No hay pagos registrados.
                            </td>
                        </tr>
                    ) : (
                        data.data.map((payment) => (
                            <tr
                                key={payment.id}
                                className="border-t border-gray-200 hover:bg-red-50 transition"
                            >
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <FaUser className="text-red-600" />
                                    {payment.user?.name || "Desconocido"}
                                </td>
                                <td className="px-4 py-3">
                                    {payment.membership?.name || "Sin membresía"}
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    S/. {Number(payment.amount).toFixed(2)}
                                </td>
                                <td className="px-4 py-3 capitalize">{payment.method}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <FaCalendar className="text-red-600" />
                                        {format(new Date(payment.createdAt), "dd 'de' MMMM yyyy", {
                                            locale: undefined, // o usa `es` si deseas español
                                        })}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
        </div>
    );
}