import { getTrainers } from "@/src/services/users";
import Image from "next/image";
import { FaEnvelope, FaIdCard, FaPhone, FaUserEdit, FaTrashAlt } from "react-icons/fa";
import PageHeader from "@/components/dashboard/PageHeader";

export default async function TrainersPage() {
    const data = await getTrainers();
    const trainers = data.users;


    return (
        <section className="space-y-6">
            <PageHeader title="Nuestros Entrenadores" subtitle="Profesionales dedicados al bienestar y rendimiento físico." />

            {trainers.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No hay entrenadores registrados.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {trainers.map((trainer) => (
                        <div
                            key={trainer.id}
                            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-red-600">
                                    <div className="w-28 h-28 mb-4 rounded-full bg-red-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-red-600">
                                        {trainer.name
                                            .split(" ")
                                            .map((word) => word[0])
                                            .join("")
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </div>

                                </div>

                                <h2 className="text-xl font-semibold text-gray-900">{trainer.name}</h2>
                                <p className="text-sm text-gray-500 mb-4">Entrenador Personal</p>
                            </div>

                            <div className="space-y-2 text-sm text-gray-700 mt-4">
                                <p className="flex items-center gap-2">
                                    <FaEnvelope className="text-red-600" /> {trainer.email}
                                </p>
                                {trainer.dni && (
                                    <p className="flex items-center gap-2">
                                        <FaIdCard className="text-red-600" /> DNI: {trainer.dni}
                                    </p>
                                )}
                                {trainer.phone && (
                                    <p className="flex items-center gap-2">
                                        <FaPhone className="text-red-600" /> Teléfono: {trainer.phone}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button className="text-gray-500 hover:text-red-600" title="Editar">
                                    <FaUserEdit size={18} />
                                </button>
                                <button className="text-gray-500 hover:text-red-600" title="Eliminar">
                                    <FaTrashAlt size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}