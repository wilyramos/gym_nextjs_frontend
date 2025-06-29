"use server"

import getToken from "@/src/auth/token";
import { CreateUserSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
};

export async function createUserAction(prevState: ActionStateType, formData: FormData) {

    const token = getToken();

    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        dni: formData.get("dni"),
        phone: formData.get("phone"),
        membershipId: formData.get("membershipId"),
        membershipStartDate: formData.get("membershipStartDate"),
    }

    const parsedData = {
        ...rawData,
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

    console.log("rawData", rawData);

    const url = `${process.env.API_URL}/users/admin`;

    console.log("URL de la API:", url);

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(validation.data),
    });



    console.log("Respuesta de la API:", req);

    if (!req.ok) {
        const errorData = await req.json();
        return {
            errors: [errorData.message || "Error al crear el usuario"],
            success: "",
        };
    }

    return {
        errors: [],
        success: "Usuario creado correctamente",
    };
}