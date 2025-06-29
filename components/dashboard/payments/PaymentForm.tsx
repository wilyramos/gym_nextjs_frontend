

import { useState } from 'react';
import type { CreatePaymentDto } from '@/src/schemas';
import { PaymentMethodEnum } from '@/src/schemas';

export default function PaymentFormClient() {
    

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
           
        } catch (err: any) {
            setMessage(err.message || 'Error al enviar el formulario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID de Usuario</label>
                <input
                    name="userId"
                    type="number"
                    placeholder="ID del usuario"
                    
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membresía</label>
                <select
                    name="membershipId"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Selecciona una membresía</option>
                    <option value="1">Membresía Básica</option>
                    <option value="2">Membresía Premium</option>

                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                <input
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="S/ 0.00"
                    // value={form.amount}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
                <select
                    name="method"
                    // value={form.method}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
                >
                    {PaymentMethodEnum.options.map((method) => (
                        <option key={method} value={method}>
                            {method}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                    name="notes"
                    placeholder="Observaciones adicionales..."
                    // value={form.notes || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
                />
            </div>

            {message && <p className="text-sm text-gray-600">{message}</p>}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : 'Registrar pago'}
                </button>
            </div>
        </form>
    );
}
