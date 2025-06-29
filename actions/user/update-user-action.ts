"use server"

import getToken from "@/src/auth/token";
import { CreateUserSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
};

export async function updateUserAction(prevState: ActionStateType, formData: FormData) {
    const token = await getToken();

    const rawData = {
        id: formData.get("id"),
        name: formData.get("name"),
        email: formData.get("email"),
        dni: formData.get("dni"),
        phone: formData.get("phone"),
        membershipId: formData.get("membershipId"),
        membershipStartDate: formData.get("membershipStartDate"),
    };

    const parsedData = {
        ...rawData,
        id: rawData.id ? Number(rawData.id) : undefined,
        membershipId: rawData.membershipId ? Number(rawData.membershipId) : undefined,
        membershipStartDate: rawData.membershipStartDate || undefined,
    };

    const validation = CreateUserSchema.safeParse(parsedData);

    if (!validation.success) {
        const errors = validation.error.errors.map(err => err.message);
        return {
            errors,
            success: "",
        };
    }

    const url = `${process.env.API_URL}/users/${parsedData.id}`;

    const req = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(validation.data),
    });

    if (!req.ok) {
        return {
            errors: ["Error al actualizar el usuario"],
            success: "",
        };
    }

    return {
        errors: [],
        success: "Usuario actualizado correctamente",
    };

}