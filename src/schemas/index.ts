import { PassThrough } from "stream";
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


// User Schemas

export const UserBaseSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El correo electrónico no es válido").min(1, "El correo electrónico es obligatorio"),
    dni: z.string().optional().nullable(),
    role: z.string().optional(),
    phone: z.string().optional().nullable(),
    membershipId: z.number().optional().nullable(),
    membershipStartDate: z.string().optional().nullable(),
    membershipEndDate: z.string().optional().nullable()
});

export const CreateUserSchema = UserBaseSchema.extend({
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional()
});

export const UpdateUserSchema = UserBaseSchema

export const UserShema = UserBaseSchema.extend({
    id: z.number()
})

export const GetUsersResponseSchema = z.object({
    users: z.array(UserShema),
    total: z.number(),
    page: z.number(),
    totalPages: z.number()
})


export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type UserDto = z.infer<typeof UserShema>;
export type GetUsersResponseDto = z.infer<typeof GetUsersResponseSchema>;