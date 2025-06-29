

import type { UserDto } from "@/src/schemas"



type Props = {
    defaultValues?: UserDto;

}

export default function UserForm({ defaultValues }: Props) {


    console.log("Valores por defecto del formulario:", defaultValues);







    return (
        <div


        >
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
                name="name"
                type="text"
                placeholder="Nombre"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
                defaultValue={defaultValues?.name ?? ""}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
                name="email"
                type="email"
                placeholder="Correo"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
                defaultValue={defaultValues?.email ?? ""}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
            <input
                name="dni"
                type="text"
                placeholder="DNI (8 dígitos)"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
                pattern="\d{8}"
                maxLength={8}
                defaultValue={defaultValues?.dni ?? ""}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Rol (opcional)</label>
            <select
                name="role"
                defaultValue={defaultValues?.role ?? ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
            >
                <option value="">Seleccionar rol</option>
                <option value="CLIENT">CLIENT</option>
                <option value="TRAINER">TRAINER</option>
                <option value="ADMIN">ADMIN</option>
            </select>

            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (opcional)</label>
            <input
                name="phone"
                type="text"
                placeholder="Teléfono"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
                defaultValue={defaultValues?.phone ?? ""}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">ID Membresía (opcional)</label>
            <input
                name="membershipId"
                type="number"
                placeholder="ID Membresía"
                defaultValue={defaultValues?.membershipId ?? ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio de membresía (opcional)
            </label>
            <input
                name="membershipStartDate"
                type="date"
                defaultValue={defaultValues?.membershipId ?? ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-6"
            />


        </div>
    )
}