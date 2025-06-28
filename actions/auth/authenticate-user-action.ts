"use server";

import { loginSchema, SuccessSchemaLogin } from "@/src/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionStateType = {
    errors: string[];
    success: string;
};

export async function authenticateUserAction(
    prevState: ActionStateType,
    formData: FormData
) {
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = loginSchema.safeParse(rawData);

    if (!result.success) {
        return {
            errors: result.error.errors.map((err) => err.message),
            success: "",
        };
    }

    const { email, password } = result.data;

    const url = `${process.env.API_URL}/auth/login`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ email, password }),
    });

    if (!req.ok) {
        const errorData = await req.json();
        return {
            errors: [errorData.message || "Error al autenticar al usuario"],
            success: "",
        };
    }

    const data = await req.json();

    const parsedData = SuccessSchemaLogin.safeParse(data);
    if (!parsedData.success) {
        return {
            errors: parsedData.error.errors.map((err) => err.message),
            success: "",
        };
    }

    const { user, access_token } = parsedData.data;

    // Guardar token en cookies
    (await cookies()).set("token_gym", parsedData.data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    switch (user.role) {
        case "ADMIN":
            redirect("/dashboard");
        case "TRAINER":
            redirect("/trainer/dashboard");
        case "CLIENT":
            redirect("/client/dashboard");
        default:
            return {
                errors: ["Rol de usuario no reconocido"],
                success: "",
            };
    }
}
