'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { toast } from 'sonner';
import UserForm from '@/components/dashboard/users/UserForm';
import { updateUserAction } from '@/actions/user/update-user-action'; // Ajusta ruta
import type { UserDto } from '@/src/schemas';

export default function EditUserModal({ user }: { user?: UserDto }) {


    console.log("Datos del usuario a editarrrr:", user);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const userId = searchParams.get('editUser');
    const show = Boolean(userId);

    const [state, dispatch] = useActionState(updateUserAction, {
        errors: [],
        success: '',
    });

    // Obtener datos del usuario
   

    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            closeModal();
        }
        if (state.errors.length > 0) {
            toast.error(state.errors.join(', '));
        }
    }, [state]);

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('editUser');
        router.push(`${pathname}?${params.toString()}`);
    };

    if (!show) return null;

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
                                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-red-600">
                                        Editar Usuario
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
                                    >
                                        ×
                                    </button>
                                </div>

                                {user ? (
                                    <form action={dispatch} noValidate className="mt-4 space-y-4">
                                        <input type="hidden" name="id" value={user.id} />
                                        <UserForm defaultValues={user} />
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 rounded-md text-sm text-white bg-red-600 hover:bg-red-700"
                                            >
                                                Guardar cambios
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <p className="mt-4 text-sm text-gray-500">Cargando datos del usuario...</p>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
