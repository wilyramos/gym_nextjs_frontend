'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import UserForm from '@/components/dashboard/users/UserForm';
import { createUserAction } from '@/actions/user/create-user-action';
import { useActionState, useEffect } from "react"
import { toast } from "sonner"


export default function AddUserModal() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [state, dispatch] = useActionState(createUserAction, {
        errors: [],
        success: ""
    })

    useEffect(() => {
        if (state.success) {
            // Aquí puedes manejar el éxito, como mostrar un mensaje o redirigir
            console.log("Usuario creado exitosamente:", state.success);
            toast.success(state.success);
            closeModal();
        }
        if (state.errors.length > 0) {
            // Aquí puedes manejar los errores, como mostrar un mensaje de error
            console.error("Errores al crear el usuario:", state.errors);
            toast.error(state.errors.join(", "));
        }
    }, [state]);

    const show = searchParams.get('newUser') === 'true';

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('newUser');
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes agregar tu lógica para enviar los datos al backend
        closeModal();
    };

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-red-600"
                                    >
                                        Nuevo Usuario
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
                                    >
                                        ×
                                    </button>
                                </div>

                                <form
                                    action={dispatch}
                                    noValidate

                                    className="mt-4 space-y-4"
                                >
                                    <UserForm />

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-md text-sm text-white bg-red-600 hover:bg-red-700"
                                        >
                                            Crear usuario
                                        </button>
                                    </div>

                                </form>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}