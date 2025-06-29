'use client';

import { useState } from "react";
// import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import UserSearchInput from "./UserSearchInput";
import PaymentForm from "./PaymentForm";

export default function AddPaymentForm() {
    const router = useRouter();

    const onSubmit = async (data: any) => {
        console.log("Datos del formulario:", data);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <PaymentForm />
        </form>
    );
}
