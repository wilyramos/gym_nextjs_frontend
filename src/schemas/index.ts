import { z } from "zod";


// Login Schemas

export const loginSchema = z.object({
    email: z.string().email("El correo electrónico no es válido").min(1, "El correo electrónico es obligatorio"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").min(1, "La contraseña es obligatoria")
});

export const SuccessSchemaLogin = z.object({
    access_token: z.string(),
    user: z.object({
        id: z.number(),
        email: z.string().email(),
        role: z.string(),
        // Add other user properties as needed
    })
});