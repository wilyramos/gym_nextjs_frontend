import { getUserById, getUsers } from '@/src/services/users';
import UsersTable from '@/components/dashboard/users/UsersTable';
import AddUserModal from '@/components/dashboard/users/AddUserModal';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import EditUserModal from '@/components/dashboard/users/EditUserModal';

type Props = {
    searchParams: {
        search?: string;
        modal?: string;
        newUser?: string;
        editUser?: string;
    };
};

export default async function UsersPage({ searchParams }: Props) {


    const data = await getUsers(); // puedes pasarle `searchParams.search` si implementas búsqueda


    let userToEdit;
    if(searchParams.editUser) {
        try {
            userToEdit = await getUserById(Number(searchParams.editUser));
            // console.log("Usuario a editar:", userToEdit);
        } catch (error) {

            console.error("Error al obtener el usuario para editar:", error);
        }
    }

    // console.log("Datos de usuarios:", data);

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Usuarios registrados</h1>
                <p className="text-sm text-gray-500">Gestión de clientes del gimnasio.</p>
            </header>

            {/* Buscador + botón */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="px-4 py-2 w-full sm:w-1/3 text-sm text-black border border-black rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
                <Link href="?newUser=true" scroll={false}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition">
                        <FaPlus size={14} />
                        Nuevo usuario
                    </button>
                </Link>
            </div>

            {/* Tabla de usuarios */}
            <UsersTable data={data} />
            {/* Modal para agregar usuario */}
            <AddUserModal />
            {userToEdit && <EditUserModal user={userToEdit} />}

        </section>
    );
}