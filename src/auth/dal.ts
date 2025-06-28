import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";




export const verifySession = cache(async () => {


    const token = (await cookies()).get("token_gym")?.value;
    if(!token) {
        redirect("/auth/login");
    }

    console.log("Token:", token);

    const url = `${process.env.API_URL}/auth/profile`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        console.error("Error fetching user profile:", response.statusText);
        redirect("/auth/login");
    }

    const user = await response.json();

    return {
        user,
        isAuthenticated: true,
    }
})