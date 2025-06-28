"use server"


import { cookies } from "next/headers"
import { redirect } from "next/navigation";


export async function logoutUserAction() {
    // Clear the cookie
    
    (await cookies()).delete("token_gym");
    redirect("/auth/login");
}