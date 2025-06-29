'use client';

import { Fragment } from 'react';
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from '@headlessui/react';
import Link from 'next/link';
import { logoutUserAction } from '@/actions/auth/logout-user-action';
import { FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { FiChevronUp } from 'react-icons/fi';

interface MenuOptionsProps {
    user: {
        name: string;
        email: string;
        role: string;
    };
}

export default function MenuOptions({ user }: MenuOptionsProps) {
    return (
        <Popover className="relative w-full">
            <PopoverButton className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-gray-800 hover:bg-gray-100 transition">
                <div className="flex flex-col text-left">
                    <span className="font-semibold text-sm leading-tight truncate">{user.name}</span>
                    <span className="text-xs text-gray-500 leading-tight">{user.role}</span>
                </div>
                <FiChevronUp className="w-4 h-4 ml-2 text-gray-400" />
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-1 scale-95"
            >
                <PopoverPanel
                    className="absolute bottom-full mb-3 left-0 w-full bg-white rounded-xl shadow-md ring-1 ring-black/10 p-2 z-20"
                >
                    <ul className="text-sm text-gray-800 space-y-1">
                        <li>
                            <Link
                                href="/dashboard/profile/settings"
                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                            >
                                <FaUserCog size={16} className="text-gray-600" />
                                Configuración
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={async () => await logoutUserAction()}
                                className="flex items-center gap-2 px-3 py-2 w-full rounded-md hover:bg-gray-100 transition text-left"
                            >
                                <FaSignOutAlt size={16} className="text-red-500" />
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </PopoverPanel>
            </Transition>
        </Popover>
    );
}
