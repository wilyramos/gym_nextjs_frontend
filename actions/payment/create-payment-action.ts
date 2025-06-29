"use server"

import getToken from "@/src/auth/token";
import { CreateUserSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
};

export async function createPaymentAction(prevState: ActionStateType, formData: FormData) {

    

    return {
        errors: [],
        success: "Payment created successfully",
    };
}