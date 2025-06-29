import { getPayments } from "@/src/services/payments";
import { FaPlus } from "react-icons/fa";
import PaymentsTable from "@/components/dashboard/payments/PaymentsTable";
import AddPaymentForm from "@/components/dashboard/payments/AddPaymentForm";
import Link from "next/link";

type Props = {
    searchParams: {
        newPayment?: string;
    };
};

export default async function PaymentsPage({ searchParams }: Props) {
    const data = await getPayments();

    return (
        <section className="space-y-8">
            {/* Encabezado */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Pagos</h1>
                <p className="text-sm text-gray-500">Revisa el historial y registra nuevos pagos realizados por los clientes.</p>
            </div>

            {/* Acciones */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="text-sm text-gray-600">
                    Total de pagos: <strong>{data.total}</strong>
                </div>

                <Link href="?newPayment=true" scroll={false}>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition">
                        <FaPlus size={14} />
                        Registrar nuevo pago
                    </button>
                </Link>
            </div>

            <div className="flex gap-6">

                 {/* Tabla de pagos */}
                <div className="mt-4">
                    <PaymentsTable data={data} />
                </div>

                {/* Formulario de nuevo pago */}
                {searchParams.newPayment === "true" && (
                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Nuevo pago</h2>
                        <AddPaymentForm />
                    </div>
                )}

               
            </div>
        </section>
    );
}